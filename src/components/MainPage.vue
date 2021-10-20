<template>
  <n-space
    id="main"
    vertical
  >
    <n-page-header
      title="真值表生成器"
      subtitle="「是个真值表生成器，但不完全是～」"
    />
    <n-card>
      <n-collapse
        :default-expanded-names="[
          'about',
          'input',
          'simplify',
        ]"
      >
        <n-collapse-item
          title="关于"
          name="about"
        >
          <about-section />
        </n-collapse-item>
        <n-collapse-item
          title="输入"
          name="input"
        >
          <n-p>
            <n-ul>
              <n-li>
                运算符的种类，表示方法，以及优先级顺序：
                <n-ol>
                  <n-li>非: ¬, !, ！, ~</n-li>
                  <n-li>与: ∧, &amp;</n-li>
                  <n-li>与非: ↑, ⊼</n-li>
                  <n-li>异或: ⊕, ^, ⊻</n-li>
                  <n-li>或: ∨, |, ｜, v</n-li>
                  <n-li>或非: ↓, ⊽</n-li>
                  <n-li>蕴含（右结合）: →, &gt;</n-li>
                  <n-li>被蕴含: ←, &lt;</n-li>
                  <n-li>等价: ↔, ⟷, =</n-li>
                </n-ol>
              </n-li>
              <n-li>T/F 表示 true/false</n-li>
              <n-li>命题变项用除了 T/F 的单个大写字母表示</n-li>
            </n-ul>
          </n-p>
          <n-form-item
            label="输入逻辑表达式"
            :validation-status="validationStatus"
            :feedback="feedback"
          >
            <n-input
              v-model:value="input"
              :maxlength="200"
              placeholder="!(P & Q) = !P | !Q"
            />
          </n-form-item>
        </n-collapse-item>
        <n-collapse-item
          v-if="ok && atoms.length"
          title="主范式与最简范式"
          name="nf"
        >
          <n-p v-if="nfLong">
            如果太长了，式子会被省略，点击式子就可以全部显示。
          </n-p>
          <normal-forms
            :atoms="atoms"
            :truths="truths"
          />
        </n-collapse-item>
        <n-collapse-item
          v-if="ok"
          title="王浩算法"
          name="wanghao"
        >
          <wang-hao-proof :root="rawRoot as AstNode" />
        </n-collapse-item>
        <n-collapse-item
          v-if="steps.length > 1"
          title="等值演算"
          name="simplify"
        >
          <n-space justify="space-between">
            <simplification-steps :steps="steps" />
            <n-button
              type="warning"
              @click="popStep"
            >
              撤销
            </n-button>
          </n-space>
        </n-collapse-item>
        <n-collapse-item
          v-if="ok"
          title="真值表"
          name="table"
        >
          <n-p v-if="canReduce">
            可以点击表头中的按钮来进行等值演算。如果没有发现你想要的规则，很可能是要多用几次交换律。
          </n-p>
          <n-data-table
            :key="renderCnt"
            :data="data"
            :columns="columns"
            :single-line="false"
            :single-column="true"
            :pagination="{ pageSize: 20 }"
          />
        </n-collapse-item>
      </n-collapse>
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import {
  ref,
  shallowRef,
  computed,
  watch,
  toRef,
} from 'vue';

import {
  NButton,
  NCard,
  NCollapse,
  NCollapseItem,
  NDataTable,
  NFormItem,
  NInput,
  NLi,
  NOl,
  NP,
  NPageHeader,
  NSpace,
  NUl,
  useThemeVars,
} from 'naive-ui';

import { AstNode } from '~/core/AstNode';
import buildAst from '~/core/buildAst';
import { getTable, Column } from '~/core/getTable';

import Step from '~/types/step';

import AboutSection from './AboutSection.vue';
import NormalForms from './NormalForms.vue';
import SimplificationSteps from './SimplificationSteps.vue';
import WangHaoProof from './WangHaoProof.vue';

const input = ref('');
const steps = ref<Step[]>([]);
const feedback = ref('');
const validationStatus = ref<'success' | 'error' | 'warning' | undefined>(undefined);
const columns = shallowRef<Column[]>([]);
const data = shallowRef<any[]>([]);
const renderCnt = ref(0);
const atoms = shallowRef<string[]>([]);
const truths = shallowRef<boolean[]>([]);
const ok = ref(false);
const rawRoot = shallowRef<AstNode | null>(null);

function addStep(step: Step) {
  steps.value.push(step);
}

function popStep() {
  steps.value.pop();
}

watch(input, (exp) => {
  steps.value = [{ exp, rule: '' }];
});

watch([steps, () => steps.value.length], ([s, len]) => {
  ok.value = false;

  const { exp } = s[len - 1];

  columns.value = [];
  data.value = [];

  if (exp.length === 0) {
    feedback.value = '';
    validationStatus.value = undefined;
    return;
  }

  const result = buildAst(exp);

  if (!result) {
    feedback.value = '表达式好像不合法 😢';
    validationStatus.value = 'error';
    return;
  }

  const { root, atomNodes } = result;

  if (atomNodes.size > 12) {
    feedback.value = '命题变项太多了 😫';
    validationStatus.value = 'error';
    return;
  }
  if (atomNodes.size > 6) {
    feedback.value = '命题变项有点多诶 🤔';
    validationStatus.value = 'warning';
  } else {
    feedback.value = '';
    validationStatus.value = 'success';
  }

  ok.value = true;

  const table = getTable(result.root, atomNodes, addStep);
  columns.value = table.columns;
  data.value = table.data;

  if (len === 1) {
    rawRoot.value = root;
    steps.value[0].exp = root.toString();
    atoms.value = table.atoms;
    truths.value = table.truths;
  }

  renderCnt.value += 1;
});

const nfLong = computed(() => atoms.value.length >= 3);

const canReduce = computed(() => steps.value[steps.value.length - 1].exp.length > 1);

const successColor = toRef(useThemeVars().value, 'successColor');
</script>

<style scoped>
#main {
  max-width: 80%;
  margin: auto;
}
</style>

<style>
.n-data-table .truth-table-result {
  color: v-bind(successColor);
}
</style>

<template>
  <n-space
    id="main"
    vertical
  >
    <n-page-header
      title="真值表生成器"
      subtitle="by. ouuan"
    />
    <n-a href="https://github.com/ouuan/truth-table-generator">
      Source Code @ GitHub
    </n-a>
    <n-card title="输入">
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
          <n-li>可以点击表头中的按钮来进行等值演算；如果没有发现你想要的规则，很可能是要多用几次交换律</n-li>
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
    </n-card>
    <n-card
      v-if="ok && atoms.length"
      title="主范式与最简范式"
    >
      <pcnf-and-pdnf
        :atoms="atoms"
        :truths="truths"
      />
    </n-card>
    <n-card
      v-if="steps.length > 1"
      title="等值演算"
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
    </n-card>
    <n-card
      v-if="ok"
      title="真值表"
    >
      <n-data-table
        :key="renderCnt"
        :data="data"
        :columns="columns"
        :single-line="false"
        :single-column="true"
        :pagination="{ pageSize: 20 }"
      />
    </n-card>
  </n-space>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  toRef,
} from 'vue';

import {
  NA,
  NButton,
  NCard,
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

import buildAst from '~/core/buildAst';
import { getTable, Column } from '~/core/getTable';

import Step from '~/types/step';

import PcnfAndPdnf from '~/components/PcnfAndPdnf.vue';
import SimplificationSteps from '~/components/SimplificationSteps.vue';

const input = ref('');
const steps = ref<Step[]>([]);
const feedback = ref('');
const validationStatus = ref<'success' | 'error' | 'warning' | undefined>(undefined);
const columns = ref<Column[]>([]);
const data = ref<any[]>([]);
const renderCnt = ref(0);
const atoms = ref<string[]>([]);
const truths = ref<boolean[]>([]);
const ok = ref(false);

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

  if (len === 1) steps.value[0].exp = root.toString();

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

  const table = getTable(root, atomNodes, addStep);
  columns.value = table.columns;
  data.value = table.data;
  atoms.value = table.atoms;
  truths.value = table.truths;

  renderCnt.value += 1;
});

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

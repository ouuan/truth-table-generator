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
    <n-card>
      <n-form-item
        label="输入逻辑表达式（逻辑符号：& | ! > = 表示 ∧ ∨ ¬ → ⟷；命题变项用单个大写字母表示）"
        :validation-status="validationStatus"
        :feedback="feedback"
      >
        <n-input
          v-model:value="expression"
          :maxlength="100"
          placeholder="!(P & Q) = !P | !Q"
        />
      </n-form-item>
      <n-data-table
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
} from 'vue';

import {
  NA,
  NCard,
  NDataTable,
  NFormItem,
  NInput,
  NPageHeader,
  NSpace,
} from 'naive-ui';

import buildAst from '~/buildAst';
import getTable, { Column } from '~/getTable';

const expression = ref('');
const feedback = ref('');
const validationStatus = ref<'success' | 'error' | 'warning' | undefined>(undefined);
const columns = ref<Column[]>([]);
const data = ref<any[]>([]);

watch(expression, (exp) => {
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
  if (atomNodes.size > 7) {
    feedback.value = '命题变项有点多诶 🤔';
    validationStatus.value = 'warning';
  } else {
    feedback.value = '';
    validationStatus.value = 'success';
  }

  const table = getTable(root, atomNodes);
  columns.value = table.columns;
  data.value = table.data;
});
</script>

<style scoped>
#main {
  max-width: 80%;
  margin: auto;
}
</style>

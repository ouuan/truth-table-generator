<template>
  <template v-if="proof">
    <n-p>点击左侧三角可以展开定理推演过程，式子的颜色表示是否是重言式（定理），每行最右侧是下一步所使用的规则。</n-p>
    <n-tree
      :data="[proof]"
      :selectable="false"
      :render-label="renderLabel"
      block-node
      virtual-scroll
      class="wanghao"
    />
  </template>
  <n-p v-else>
    式子过长，王浩算法的步骤太多了 😫
  </n-p>
</template>

<script setup lang="ts">
import { computed, h } from 'vue';
import {
  NP,
  NText,
  NTree,
  TreeOption,
} from 'naive-ui';

import { AstNode } from '~/core/AstNode';
import WangHao from '~/core/WangHao';
import WangHaoTooLongError from '~/types/WangHaoTooLongError';

const props = defineProps<{
  root: AstNode;
}>();

const proof = computed(() => {
  try {
    return new WangHao(props.root).solve();
  } catch (e) {
    if (e instanceof WangHaoTooLongError) {
      return null;
    }
    throw e;
  }
});

function renderLabel({ option }: { option: TreeOption }) {
  let type: 'error' | 'success' = 'error';
  const { key } = option;
  if (typeof key === 'string' && key[0] === '1') type = 'success';
  return h(NText, {
    type,
    class: 'wanghao-step',
  }, {
    default: () => option.label,
  });
}
</script>

<style scoped>
.wanghao {
  max-height: 500px;
}

.wanghao:deep(.wanghao-step) {
  min-width: 10em;
  display: inline-block;
}

.wanghao:deep(.wanghao-rule) {
  width: 5em;
  text-align: right;
}
</style>

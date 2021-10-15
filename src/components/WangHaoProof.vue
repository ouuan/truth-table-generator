<template>
  <n-tree
    :data="[proof]"
    :selectable="false"
    :render-label="renderLabel"
    block-node
    virtual-scroll
    style="max-height: 500px;"
  />
</template>

<script setup lang="ts">
import { computed, h } from 'vue';
import {
  NText,
  NTree,
  TreeOption,
} from 'naive-ui';

import { AstNode } from '~/core/AstNode';
import WangHao from '~/core/WangHao';

const props = defineProps<{
  root: AstNode;
}>();

const proof = computed(() => (new WangHao(props.root)).solve());

function renderLabel({ option }: { option: TreeOption }) {
  let type: 'error' | 'success' = 'error';
  const { key } = option;
  if (typeof key === 'string' && key[0] === '1') type = 'success';
  return h(NText, {
    type,
    style: {
      minWidth: '10em',
      display: 'inline-block',
    },
  }, {
    default: () => option.label,
  });
}
</script>

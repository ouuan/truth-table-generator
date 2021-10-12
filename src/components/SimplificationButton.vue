<template>
  <n-button @click="modalClick">
    {{ node }}
  </n-button>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="置换"
  >
    <n-p>你要将 {{ node }} 替换成？</n-p>
    <n-button
      v-for="(option, index) of options"
      :key="index"
      @click="optionClick(option)"
    >
      {{ option.result }} （{{ option.name }}）
    </n-button>
  </n-modal>
</template>

<script setup lang="ts">
import {
  NButton,
  NModal,
  NP,
  useDialog,
} from 'naive-ui';

import { ref } from 'vue';

import { AstNode } from '~/core/AstNode';
import equivalents from '~/core/equivalents';

import Step from '~/types/step';
import type Equivalent from '~/types/equivalent';

const props = defineProps<{
  node: AstNode,
  root: AstNode,
  addStep(step: Step): void,
}>();

const dialog = useDialog();
const showModal = ref(false);

const options: Equivalent[] = [];

function modalClick() {
  options.length = 0;
  options.push(...equivalents(props.node));
  options.forEach(({ result }) => result.updateStr());

  if (options.length === 0) {
    dialog.error({
      title: '错误',
      content: '没有可用的等值公式',
      positiveText: '😢',
    });
  } else {
    showModal.value = true;
  }
}

function replaceNode(u: AstNode, replacement: AstNode) {
  u.children.forEach((v, index) => {
    if (v === props.node) {
      /* eslint-disable no-param-reassign */
      u.children[index] = replacement;
    } else {
      replaceNode(v, replacement);
    }
  });
}

function optionClick(option: Equivalent) {
  if (props.node === props.root) {
    props.addStep({ exp: option.result.toString(), rule: option.name });
  } else {
    replaceNode(props.root, option.result);
    props.root.updateStr();
    props.addStep({ exp: props.root.toString(), rule: option.name });
  }
  showModal.value = false;
}
</script>

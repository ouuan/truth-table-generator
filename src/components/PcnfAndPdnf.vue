<template>
  <n-p>
    <n-text>主合取范式 = </n-text>
    <n-text v-if="pnf.pcnfSub.length">⋀<sub>{{ pnf.pcnfSub }}</sub> = </n-text>
    <n-text>{{ pnf.pcnf }}</n-text>
  </n-p>
  <n-p>
    <n-text>主析取范式 = </n-text>
    <n-text v-if="pnf.pdnfSub.length">⋁<sub>{{ pnf.pdnfSub }}</sub> = </n-text>
    <n-text>{{ pnf.pdnf }}</n-text>
  </n-p>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { NP, NText } from 'naive-ui';

const props = defineProps<{
  atoms: string[],
  truths: boolean[],
}>();

const pnf = computed(() => {
  const pcnfParts: string[] = [];
  const pdnfParts: string[] = [];
  const pcnfNums: number[] = [];
  const pdnfNums: number[] = [];

  props.truths.forEach((truth, i) => {
    const parts: string[] = [];
    props.atoms.forEach((atom, j) => {
      /* eslint-disable no-bitwise */
      if (truth === !!((i >> (props.atoms.length - 1 - j)) & 1)) {
        parts.push(atom);
      } else {
        parts.push(`¬${atom}`);
      }
    });
    if (truth) {
      pdnfNums.push(i);
      pdnfParts.push(`(${parts.join(' ∧ ')})`);
    } else {
      pcnfNums.push(props.truths.length - 1 - i);
      pcnfParts.push(`(${parts.join(' ∨ ')})`);
    }
  });

  return {
    pcnf: pcnfParts.length ? pcnfParts.reverse().join(' ∧ ') : 'T',
    pdnf: pdnfParts.length ? pdnfParts.join(' ∨ ') : 'F',
    pcnfSub: pcnfNums.reverse().join(','),
    pdnfSub: pdnfNums.join(','),
  };
});
</script>

<template>
  <n-p>
    主合取范式 =
    ⋀<sub>{{ pnf.pcnfSub }}</sub> =
    {{ pnf.pcnf }}
  </n-p>
  <n-p>
    主析取范式 =
    ⋁<sub>{{ pnf.pdnfSub }}</sub> =
    {{ pnf.pdnf }}
  </n-p>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { NP } from 'naive-ui';

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
    pcnf: pcnfParts.length ? pcnfParts.join(' ∧ ') : 'T',
    pdnf: pdnfParts.length ? pdnfParts.join(' ∨ ') : 'F',
    pcnfSub: pcnfNums.reverse().join(','),
    pdnfSub: pdnfNums.join(','),
  };
});
</script>

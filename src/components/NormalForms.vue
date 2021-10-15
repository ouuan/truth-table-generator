<template>
  <p>
    <n-ellipsis
      expand-trigger="click"
      :line-clamp="1"
      :tooltip="false"
    >
      主合取范式 =
      <span v-if="pnf.pcnfSub.length">
        ⋀
        <sub>{{ pnf.pcnfSub }}</sub> =
      </span>
      {{ pnf.pcnf }}
    </n-ellipsis>
  </p>
  <p>
    <n-ellipsis
      expand-trigger="click"
      :line-clamp="1"
      :tooltip="false"
    >
      主析取范式 =
      <span v-if="pnf.pdnfSub.length">
        ⋁
        <sub>{{ pnf.pdnfSub }}</sub> =
      </span>
      {{ pnf.pdnf }}
    </n-ellipsis>
  </p>
  <template v-if="mnf">
    <p>
      <n-ellipsis
        expand-trigger="click"
        :line-clamp="1"
        :tooltip="false"
      >
        最简合取范式 =
        {{ mnf.cnf }}
      </n-ellipsis>
    </p>
    <p>
      <n-ellipsis
        expand-trigger="click"
        :line-clamp="1"
        :tooltip="false"
      >
        最简析取范式 =
        {{ mnf.dnf }}
      </n-ellipsis>
    </p>
  </template>
  <p v-else>
    命题变项太多了，最简范式算不过来了 😢
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { NEllipsis } from 'naive-ui';
import QuineMcCluskey from '~/core/QuineMcCluskey';

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
    pcnfSub: pcnfNums.reverse().join(', '),
    pdnfSub: pdnfNums.join(', '),
    pdnfNums,
    pcnfNums,
  };
});

const mnf = computed(() => {
  if (props.atoms.length > 9) return null;

  const cnf = new QuineMcCluskey(
    props.atoms.join(''),
    pnf.value.pcnfNums.map((x) => props.truths.length - 1 - x),
    [],
    true,
  ).getFunction();
  const dnf = new QuineMcCluskey(props.atoms.join(''), pnf.value.pdnfNums, []).getFunction();

  return {
    dnf,
    cnf,
  };
});

</script>

<template>
  <n-space justify="space-between">
    <n-p style="text-indent: 1em;">
      <span
        v-for="(step, index) of steps"
        :key="index"
      >
        {{ index ? '=' : '' }} {{ step.exp }} {{ step.rule ? `（${step.rule}）` : '' }}
        <br>
      </span>
    </n-p>
  </n-space>
</template>

<script setup lang="ts">
import {
  NSpace,
  NP,
} from 'naive-ui';

import Step from '~/types/step';

defineProps<{
  steps: Step[],
}>();
</script>

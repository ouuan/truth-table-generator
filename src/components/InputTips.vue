<template>
  <n-p>
    <n-space justify="space-between">
      <n-ul>
        <n-li>
          运算符的种类，表示方法，以及优先级顺序：
          <n-ol v-if="showAllOperators">
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
          <span v-else>
            非: !，与: &amp;，或: |，蕴含: &gt;，等价: =
          </span>
        </n-li>
        <n-li>T/F 表示 true/false</n-li>
        <n-li>命题变项用除了 T/F 的单个大写字母表示</n-li>
      </n-ul>
      <n-form-item
        label="显示更多"
        label-placement="left"
      >
        <n-switch v-model:value="showAllOperators" />
      </n-form-item>
    </n-space>
  </n-p>
</template>

<script setup lang="ts">
import {
  NFormItem,
  NLi,
  NOl,
  NP,
  NSpace,
  NSwitch,
  NUl,
} from 'naive-ui';

import { ref } from 'vue';

const showAllOperators = ref(false);
</script>

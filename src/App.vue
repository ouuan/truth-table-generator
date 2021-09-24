<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <main-page />
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import {
  NConfigProvider,
  NGlobalStyle,
  useOsTheme,
  darkTheme,
} from 'naive-ui';

import MainPage from '~/MainPage.vue';

const theme = computed(() => (useOsTheme().value === 'dark' ? darkTheme : null));
</script>

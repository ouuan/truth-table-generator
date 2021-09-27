<template>
  <n-config-provider :theme="theme">
    <n-global-style />
    <n-dialog-provider>
      <main-page />
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import {
  NConfigProvider,
  NDialogProvider,
  NGlobalStyle,
  useOsTheme,
  darkTheme,
} from 'naive-ui';

import MainPage from '~/components/MainPage.vue';

const theme = computed(() => (useOsTheme().value === 'dark' ? darkTheme : null));
</script>

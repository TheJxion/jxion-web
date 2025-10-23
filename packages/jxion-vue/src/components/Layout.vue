<template>
  <div class="layout" :data-lang="params.lang" :data-theme="params.theme">
    <slot />
  </div>
</template>

<script setup lang="ts">
import styles from "@jxion/design/src/components/layout.module.scss";

interface LayoutProps {
  params: {
    lang: string;
    theme: string;
  };
}

defineProps<LayoutProps>();
</script>

<style scoped>
@import "@jxion/design/src/components/layout.module.scss";
</style>

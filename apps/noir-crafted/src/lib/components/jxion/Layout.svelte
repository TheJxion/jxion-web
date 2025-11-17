<script lang="ts">
  import styles from "@jxion/design/styles/modules/Layout.module.scss";
  
  export let params: { lang?: string; theme?: string } = { lang: 'tr-TR', theme: 'light' };
</script>

<div class={styles.layout} data-lang={params?.lang || 'tr-TR'} data-theme={params?.theme || 'light'}>
  <slot />
</div>

<style>
  @import "@jxion/design/styles/modules/Layout.module.scss";
</style>

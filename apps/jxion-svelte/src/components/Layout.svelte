<script lang="ts">
  import styles from "@jxion/design/components/layout.module.scss";
  
  export let params: { lang: string; theme: string };
</script>

<div class={styles.layout} data-lang={params.lang} data-theme={params.theme}>
  <slot />
</div>

<style>
  @import "@jxion/design/components/layout.module.scss";
</style>

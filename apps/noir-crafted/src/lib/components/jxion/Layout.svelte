<script lang="ts">
  import styles from "@jxion/design/styles/modules/Layout.module.scss";
  
  // Component props (optional)
  export let lang: string = 'tr-TR';
  export let theme: string = 'light';
</script>

<div class={styles.layout} data-lang={lang} data-theme={theme}>
  <slot />
</div>

<style>
  @import "@jxion/design/styles/modules/Layout.module.scss";
</style>

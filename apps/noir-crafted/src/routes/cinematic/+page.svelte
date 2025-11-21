<script lang="ts">
  import LocalReactWrapper from '$lib/components/jxion/LocalReactWrapper.svelte';
  import * as CinematicModule from '$lib/components/cinematic-hero/CinematicSceneShowcase';
</script>

<svelte:head>
  <title>Cinematic Experience | NOIR Crafted</title>
  <meta name="description" content="Immersive 3D cinematic experience showcasing our luxury jewelry collection." />
</svelte:head>

<div class="cinematic-page min-h-screen w-full bg-[#0a0a0a]">
  <LocalReactWrapper
    componentModule={CinematicModule}
    componentName="default"
    props={{}}
  />
</div>

<style>
  .cinematic-page {
    /* Ensure the page takes full viewport and handles the scroll properly */
    position: relative;
    width: 100%;
    min-height: 100vh;
  }
</style>


<script lang="ts">
  import { onMount } from 'svelte';
  import LocalReactWrapper from '$lib/components/jxion/LocalReactWrapper.svelte';
  import * as CinematicModule from '$lib/components/cinematic-hero/CinematicSceneShowcase';
  import { contentStore, ensureContentStore } from '$lib/stores/contentStore';
  import type { ScenePerspective } from '$lib/components/cinematic-hero/scene-data';

  let scenes: ScenePerspective[] = [];

  onMount(async () => {
    await ensureContentStore();
    // Transform database scenes to ScenePerspective format
    const dbScenes = $contentStore.content?.scenes;
    if (dbScenes && Array.isArray(dbScenes) && dbScenes.length > 0) {
      scenes = dbScenes.map((s: any) => ({
        title: s.title || '',
        subtitle: s.subtitle || '',
        position: s.position || 'center',
        camera: s.camera || { x: 0, y: 0, z: 0 },
        target: s.target || { x: 0, y: 0, z: 0 },
        rotation: s.rotation,
        scrollProgress: s.scrollProgress || { start: 0, end: 100 },
        hideText: s.hideText || false,
      }));
    }
  });

  // Reactive update when contentStore changes
  $: {
    const dbScenes = $contentStore.content?.scenes;
    if (dbScenes && Array.isArray(dbScenes) && dbScenes.length > 0) {
      scenes = dbScenes.map((s: any) => ({
        title: s.title || '',
        subtitle: s.subtitle || '',
        position: s.position || 'center',
        camera: s.camera || { x: 0, y: 0, z: 0 },
        target: s.target || { x: 0, y: 0, z: 0 },
        rotation: s.rotation,
        scrollProgress: s.scrollProgress || { start: 0, end: 100 },
        hideText: s.hideText || false,
      }));
    }
  }
</script>

<svelte:head>
  <title>Cinematic Experience | {$contentStore.content?.site?.name ?? 'NOIR'} Crafted</title>
  <meta
    name="description"
    content="Immersive 3D cinematic experience showcasing our luxury jewelry collection."
  />
</svelte:head>

<div class="cinematic-page min-h-screen w-full bg-[#0a0a0a]">
  <LocalReactWrapper
    componentModule={CinematicModule}
    componentName="default"
    props={{ scenes }}
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


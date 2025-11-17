<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  export let componentModule: Record<string, any> | null = null;
  export let componentName: string;
  export let props: Record<string, any> = {};

  let container: HTMLDivElement | null = null;
  let root: any = null;

  async function renderReactComponent() {
    if (!componentModule || !componentName || !container) return;

    try {
      const React = await import('react');
      const ReactDOM = await import('react-dom/client');
      const Component = componentModule[componentName];

      if (!Component) {
        throw new Error(`Component ${componentName} not found in module.`);
      }

      root = ReactDOM.createRoot(container);
      root.render(React.createElement(Component, props));
    } catch (error) {
      console.error('[LocalReactWrapper] ❌ Failed to render component:', error);
    }
  }

  onMount(renderReactComponent);

  onDestroy(() => {
    if (root) {
      root.unmount();
      root = null;
    }
  });
</script>

<div bind:this={container} class="local-react-wrapper"></div>

<style>
  .local-react-wrapper {
    width: 100%;
    height: 100%;
  }
</style>


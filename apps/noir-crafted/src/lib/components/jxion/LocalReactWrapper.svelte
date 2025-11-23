<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  export let componentModule: Record<string, any> | null = null;
  export let componentName: string;
  export let props: Record<string, any> = {};

  let container: HTMLDivElement | null = null;
  let root: any = null;
  let React: any = null;
  let ReactDOM: any = null;
  let Component: any = null;

  async function initReact() {
    if (React && ReactDOM) return; // Already initialized

    try {
      React = await import('react');
      ReactDOM = await import('react-dom/client');
    } catch (error) {
      console.error('[LocalReactWrapper] ❌ Failed to load React:', error);
    }
  }

  async function renderReactComponent() {
    if (!componentModule || !componentName || !container) return;

    try {
      await initReact();

      if (!React || !ReactDOM) return;

      Component = componentModule[componentName];

      if (!Component) {
        throw new Error(`Component ${componentName} not found in module.`);
      }

      if (!root) {
        root = ReactDOM.createRoot(container);
      }

      root.render(React.createElement(Component, props));
    } catch (error) {
      console.error('[LocalReactWrapper] ❌ Failed to render component:', error);
    }
  }

  // Re-render when props change
  $: if (root && Component && React) {
    root.render(React.createElement(Component, props));
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


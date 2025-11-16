<!--
  Local React Component Wrapper for Svelte
  Allows importing React components from local files
-->

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  export let componentModule: any;
  export let componentName: string = 'default';
  export let props: Record<string, any> = {};
  
  let container: HTMLDivElement | null = null;
  let ReactComponent: any = null;
  let React: any = null;
  let ReactDOM: any = null;
  let root: any = null;
  
  onMount(async () => {
    if (!componentModule) {
      console.warn('[LocalReactWrapper] No component module provided');
      return;
    }
    
    try {
      // Dynamically import React and ReactDOM
      React = await import('react');
      ReactDOM = await import('react-dom/client');
      
      // Get component from module
      ReactComponent = componentModule[componentName] || componentModule.default;
      
      if (!ReactComponent) {
        throw new Error(`Component ${componentName} not found in module`);
      }
      
      // Render React component
      if (container && ReactComponent && React && ReactDOM) {
        root = ReactDOM.createRoot(container);
        root.render(React.createElement(ReactComponent, props));
      }
    } catch (error) {
      console.error('[LocalReactWrapper] Error loading component:', error);
    }
  });
  
  onDestroy(() => {
    if (root) {
      root.unmount();
    }
  });
</script>

<div bind:this={container} class="local-react-wrapper"></div>

<style>
  .local-react-wrapper {
    width: 100%;
  }
</style>


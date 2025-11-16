<!--
  Jxion Stack — Generic React Component Wrapper (Svelte)
  Phase Reference: Phase 2 — Component Registry & Styling Runtime
  Description: Generic wrapper for any React component from @jxion/design
  
  This allows using any React component in Svelte without creating individual wrappers
-->

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  
  export let componentName: string;
  export let props: Record<string, any> = {};
  export let children: any = null;
  
  let container: HTMLDivElement | null = null;
  let ReactComponent: any = null;
  let React: any = null;
  let ReactDOM: any = null;
  
  onMount(async () => {
    console.log(`[Jxion-Svelte] Loading ${componentName} component from @jxion/design...`);
    
    try {
      // Dynamically import React and ReactDOM
      React = await import('react');
      ReactDOM = await import('react-dom/client');
      
      // Dynamically import component from @jxion/design
      const designModule = await import('@jxion/design');
      ReactComponent = designModule[componentName];
      
      if (!ReactComponent) {
        throw new Error(`Component ${componentName} not found in @jxion/design`);
      }
      
      console.log(`[Jxion-Svelte] ✅ ${componentName} component loaded`);
      
      // Render React component
      if (container && ReactComponent && React && ReactDOM) {
        const root = ReactDOM.createRoot(container);
        const reactChildren = children 
          ? (Array.isArray(children) ? children : [children]).map((child: any) => 
              typeof child === 'string' ? child : React.createElement(child)
            )
          : undefined;
        
        root.render(
          React.createElement(ReactComponent, props, reactChildren)
        );
        console.log(`[Jxion-Svelte] ✅ ${componentName} component rendered`);
      }
    } catch (error) {
      console.error(`[Jxion-Svelte] ❌ Error loading ${componentName} component:`, error);
    }
  });
  
  onDestroy(() => {
    if (container) {
      const root = (container as any)._reactRoot;
      if (root) {
        root.unmount();
        console.log(`[Jxion-Svelte] 🧹 ${componentName} component unmounted`);
      }
    }
  });
</script>

<div bind:this={container} class="jxion-react-wrapper"></div>

<style>
  .jxion-react-wrapper {
    width: 100%;
  }
</style>


<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import AppLayout from '$layouts/AppLayout.svelte';
	
	// SvelteKit automatically provides these props, but we don't use them
	// Declaring them to suppress warnings
	export const data: any = undefined;
	export const params: any = undefined;

	// Preload Three.js early to ensure it's available before React Three Fiber loads
	onMount(async () => {
		if (typeof window !== 'undefined') {
			try {
				// Load Three.js and make it globally available
				const threeModule = await import('three');
				const THREE = threeModule as any;
				
				if (THREE && THREE.Color) {
					(window as any).THREE = THREE;
					(globalThis as any).THREE = THREE;
					console.log('[Layout] Three.js preloaded globally');
				}
			} catch (err) {
				console.warn('[Layout] Failed to preload Three.js:', err);
			}
		}
	});
</script>

<AppLayout>
	<slot />
</AppLayout>

<script lang="ts">
	import '../app.css';
	import AppLayout from '$layouts/AppLayout.svelte';
	
	// SvelteKit automatically provides these props, but we don't use them
	// Declaring them to suppress warnings
	export const data: any = undefined;
	export const params: any = undefined;
</script>

<AppLayout>
	<slot />
</AppLayout>

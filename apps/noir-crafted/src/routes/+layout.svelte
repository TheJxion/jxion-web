<script lang="ts">
	import '../app.css';
	import AppLayout from '$layouts/AppLayout.svelte';
	
	// SvelteKit automatically provides these props, but we don't use them
	// Declaring them to suppress warnings
	export let data: any;
	export let params: any;
</script>

<AppLayout>
	<slot />
</AppLayout>

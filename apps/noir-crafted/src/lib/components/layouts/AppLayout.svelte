<script lang="ts">
	import Header from '$organisms/Header.svelte';
	import Footer from '$organisms/Footer.svelte';
	import Toast from '$atoms/Toast.svelte';
	import type { LayoutProps } from '$types';

	export let showHeader: LayoutProps['showHeader'] = true;
	export let showFooter: LayoutProps['showFooter'] = true;
</script>

<div class="min-h-screen flex flex-col">
	{#if showHeader}
		<Header />
	{/if}

	<main class="flex-1">
		<slot />
	</main>

	{#if showFooter}
		<Footer />
	{/if}
	
	<Toast />
</div>

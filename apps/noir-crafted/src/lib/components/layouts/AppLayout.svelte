<script lang="ts">
	import Header from '$organisms/Header.svelte';
	import Footer from '$organisms/Footer.svelte';
	import Toast from '$atoms/Toast.svelte';
	import type { LayoutProps } from '$types';
	import styles from '@jxion/design/styles/modules/AppLayoutNoir.module.scss';

	export let showHeader: LayoutProps['showHeader'] = true;
	export let showFooter: LayoutProps['showFooter'] = true;
</script>

<div class={styles.appLayout}>
	{#if showHeader}
		<Header />
	{/if}

	<main class={styles.appLayout__main}>
		<slot />
	</main>

	{#if showFooter}
		<Footer />
	{/if}
	
	<Toast />
</div>

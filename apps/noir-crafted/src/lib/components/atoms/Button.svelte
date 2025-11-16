<script lang="ts">
	import type { ButtonProps } from '$types';

	export let variant: ButtonProps['variant'] = 'primary';
	export let size: ButtonProps['size'] = 'md';
	export let href: ButtonProps['href'];
	export let onClick: ButtonProps['onClick'];
	export let disabled: ButtonProps['disabled'] = false;
	export let loading: ButtonProps['loading'] = false;
	export let type: ButtonProps['type'] = 'button';
	export let className: ButtonProps['className'] = '';

	$: classes = `
		inline-flex items-center justify-center font-semibold transition-all duration-200
		${variant === 'primary' ? 'bg-noir-black text-white hover:bg-noir-gray-800' : ''}
		${variant === 'secondary' ? 'bg-noir-primary text-noir-black hover:bg-opacity-90' : ''}
		${variant === 'outline' ? 'border border-noir-gray-300 text-noir-black hover:bg-noir-gray-50' : ''}
		${variant === 'ghost' ? 'text-noir-black hover:bg-noir-gray-100' : ''}
		${variant === 'text' ? 'text-noir-black hover:text-noir-gray-700 underline-offset-4 hover:underline' : ''}
		${size === 'sm' ? 'px-4 py-2 text-sm' : ''}
		${size === 'md' ? 'px-6 py-3 text-base' : ''}
		${size === 'lg' ? 'px-8 py-4 text-lg' : ''}
		${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
		rounded-full
		${className}
	`;
</script>

{#if href}
	<a {href} class={classes} class:disabled role="button" aria-disabled={disabled}>
		{#if loading}
			<span class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></span>
		{/if}
		<slot />
	</a>
{:else}
	<button {type} on:click={onClick} {disabled} class={classes}>
		{#if loading}
			<span class="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></span>
		{/if}
		<slot />
	</button>
{/if}

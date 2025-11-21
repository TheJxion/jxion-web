<script lang="ts">
	import type { ButtonProps } from '$types';
	import styles from '@jxion/design/styles/modules/ButtonNoir.module.scss';

	export let variant: ButtonProps['variant'] = 'primary';
	export let size: ButtonProps['size'] = 'md';
export let href: ButtonProps['href'] = undefined;
export let onClick: ButtonProps['onClick'] = undefined;
	export let disabled: ButtonProps['disabled'] = false;
	export let loading: ButtonProps['loading'] = false;
	export let type: ButtonProps['type'] = 'button';
	export let className: ButtonProps['className'] = '';

	$: buttonClasses = `
		${styles.button}
		${styles[`button--${variant}`]}
		${styles[`button--${size}`]}
		${disabled || loading ? styles['button--disabled'] : ''}
		${loading ? styles['button--loading'] : ''}
		${className}
	`.trim();
</script>

{#if href}
	<a 
		{href} 
		class={buttonClasses} 
		role="button" 
		aria-disabled={disabled || loading}
		tabindex={disabled || loading ? -1 : 0}
	>
		<slot />
	</a>
{:else}
	<button 
		{type} 
		on:click={onClick} 
		{disabled} 
		class={buttonClasses}
		aria-busy={loading}
	>
		<slot />
	</button>
{/if}

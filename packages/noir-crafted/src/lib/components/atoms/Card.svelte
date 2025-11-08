<script lang="ts">
	import type { CardProps } from '$types';

	export let variant: CardProps['variant'] = 'default';
	export let padding: CardProps['padding'] = 'md';
	export let className: CardProps['className'] = '';

	$: classes = `
		${variant === 'default' ? 'bg-white' : ''}
		${variant === 'elevated' ? 'bg-white shadow-card-lg' : ''}
		${variant === 'outlined' ? 'bg-white border border-noir-gray-200' : ''}
		${padding === 'none' ? '' : padding === 'sm' ? 'p-4' : padding === 'md' ? 'p-6' : 'p-8'}
		${className}
	`;
</script>

<div class={classes}>
	<slot />
</div>

<script lang="ts">
	import type { CardProps } from '$types';
	import styles from '@jxion/design/styles/modules/CardNoir.module.scss';

	export let variant: CardProps['variant'] = 'default';
	export let padding: CardProps['padding'] = 'md';
	export let className: CardProps['className'] = '';

	$: cardClasses = `
		${styles.card}
		${styles[`card--${variant}`]}
		${styles[`card--padding-${padding}`]}
		${className}
	`.trim();
</script>

<div class={cardClasses}>
	<slot />
</div>

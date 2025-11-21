<script lang="ts">
	import Button from '$atoms/Button.svelte';
	import type { HeroProps } from '$types';
	import styles from '@jxion/design/styles/modules/HeroNoir.module.scss';

	export let title: HeroProps['title'];
	export let subtitle: HeroProps['subtitle'] = '';
	export let description: HeroProps['description'];
	export let primaryCta: HeroProps['primaryCta'];
	export let secondaryCta: HeroProps['secondaryCta'];
	export let imageUrl: HeroProps['imageUrl'] = '';
</script>

<section class={styles.hero}>
	<div class={styles.hero__container}>
		<div class={styles.hero__content}>
			<!-- Content Column -->
			<div class={styles.hero__text}>
				<div class={styles.hero__meta}>
					{#if subtitle}
						<p class={styles.hero__subtitle}>
							{subtitle}
						</p>
					{/if}
					<h1 class={styles.hero__title}>
						{@html title.split('\n').map((line) => `${line}<br />`).join('')}
					</h1>
					{#if description}
						<p class={styles.hero__description}>
							{description}
						</p>
					{/if}
				</div>

				<!-- CTA Buttons -->
				<div class={styles.hero__ctas}>
					{#if primaryCta}
						<Button href={primaryCta.href} variant="primary" size="lg">
							{primaryCta.text}
						</Button>
					{/if}
					{#if secondaryCta}
						<Button href={secondaryCta.href} variant="text" size="lg">
							{secondaryCta.text}
						</Button>
					{/if}
				</div>
			</div>

			<!-- Image Column -->
			{#if imageUrl}
				<div class={styles.hero__imageWrapper}>
					<img
						src={imageUrl}
						alt="Noir Jewelry"
						class={styles.hero__image}
						loading="eager"
					/>
				</div>
			{:else}
				<!-- Placeholder for hero image -->
				<div class={styles.hero__placeholder}>
					<span class={styles.hero__placeholderText}>Hero Image</span>
				</div>
			{/if}
		</div>
	</div>
</section>

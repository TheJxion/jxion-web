<script lang="ts">
	import { computed } from 'svelte';
	import { heroTemplate, TemplateRenderer } from '@jxion/core';
	import styles from '@jxion/design/components/hero.module.scss';
	import type { HeroProps } from '$types';

	export let title: HeroProps['title'];
	export let subtitle: HeroProps['subtitle'] = '';
	export let description: HeroProps['description'];
	export let primaryCta: HeroProps['primaryCta'];
	export let secondaryCta: HeroProps['secondaryCta'];
	export let imageUrl: HeroProps['imageUrl'] = '';
	export let onCtaClick: (() => void) | undefined = undefined;

	// Render template with variables
	const renderedTemplate = computed(() => {
		const variables = {
			title: title.split('\n').join('<br />'),
			subtitle: subtitle || '',
			description: description || '',
			ctaText: primaryCta?.text || 'Keşfet',
			statsValue: '',
			statsLabel: '',
			cardSubtitle: '',
			testId: 'hero',
			onCtaClick: onCtaClick ? 'onCtaClick' : ''
		};

		// Get the base HTML template from @jxion-core
		let rendered = TemplateRenderer.render({
			template: heroTemplate.html,
			variables
		});

		// Map CSS module classes to actual class names
		Object.keys(styles).forEach((className) => {
			const regex = new RegExp(`class="([^"]*\\b${className}\\b[^"]*)"`, 'g');
			rendered = rendered.replace(regex, (match, classList) => {
				const mappedClasses = classList
					.split(' ')
					.map((cls: string) => styles[cls] || cls)
					.join(' ');
				return `class="${mappedClasses}"`;
			});
		});

		return rendered;
	});
</script>

<!-- Template rendered from @jxion-core with @jxion-design styles -->
<div class="hero-container">
	{@html $renderedTemplate}
</div>

<style>
	/* Import styles from @jxion-design */
	@import '@jxion/design/components/hero.module.scss';
	
	.hero-container {
		width: 100%;
	}
</style>


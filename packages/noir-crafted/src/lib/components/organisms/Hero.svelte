<script lang="ts">
	import Button from '$atoms/Button.svelte';
	import type { HeroProps } from '$types';

	export let title: HeroProps['title'];
	export let subtitle: HeroProps['subtitle'] = '';
	export let description: HeroProps['description'];
	export let primaryCta: HeroProps['primaryCta'];
	export let secondaryCta: HeroProps['secondaryCta'];
	export let imageUrl: HeroProps['imageUrl'] = '';
</script>

<section class="min-h-screen flex items-center bg-white">
	<div class="container-custom w-full">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<!-- Content Column -->
			<div class="space-y-8">
				<div class="space-y-4">
					{#if subtitle}
						<p class="text-sm uppercase tracking-wider text-noir-gray-600 font-sans">
							{subtitle}
						</p>
					{/if}
					<h1 class="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight text-noir-black">
						{@html title.split('\n').map((line) => `${line}<br />`).join('')}
					</h1>
					{#if description}
						<p class="text-lg text-noir-gray-700 font-sans max-w-xl leading-relaxed">
							{description}
						</p>
					{/if}
				</div>

				<!-- CTA Buttons -->
				<div class="flex flex-col sm:flex-row gap-4">
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
				<div class="relative h-[600px] lg:h-[800px] w-full">
					<img
						src={imageUrl}
						alt="Noir Jewelry"
						class="w-full h-full object-cover object-center"
						loading="eager"
					/>
				</div>
			{:else}
				<!-- Placeholder for hero image -->
				<div class="relative h-[600px] lg:h-[800px] w-full bg-noir-gray-100 flex items-center justify-center">
					<span class="text-noir-gray-400 text-sm">Hero Image</span>
				</div>
			{/if}
		</div>
	</div>
</section>

<script lang="ts">
	import Hero from '$organisms/Hero.svelte';
	import ProductSection from '$organisms/ProductSection.svelte';
	import { products } from '$stores/products';
	import { content } from '$lib/i18n';

	// Get content from i18n
	const heroContent = content.home.hero;
	const featuredContent = content.home.featured;
	const whyNoirContent = content.home.whyNoir;
	const motifsContent = content.home.motifs;
	const newsletterContent = content.home.newsletter;

	// Get featured products for homepage
	$: featuredProducts = $products.slice(0, 8);
</script>

<svelte:head>
	<title>Noir Crafted - {content.site.tagline}</title>
	<meta name="description" content={content.site.description} />
</svelte:head>

<!-- Hero Section -->
<Hero
	title={heroContent.title}
	subtitle={heroContent.subtitle}
	description={heroContent.description}
	primaryCta={{ text: heroContent.primaryCta, href: '/collections/kolye' }}
	secondaryCta={{ text: heroContent.secondaryCta, href: '/about' }}
	imageUrl="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=1600&fit=crop"
/>

<!-- Featured Products Section -->
<ProductSection
	title={featuredContent.title}
	subtitle={featuredContent.subtitle}
	products={featuredProducts}
	variant="grid"
/>

<!-- Why Noir Section -->
<section class="py-16 md:py-24 bg-noir-deep-purple-50">
	<div class="container-custom">
		<div class="max-w-4xl mx-auto text-center space-y-8">
			<h2 class="text-4xl md:text-5xl font-serif text-noir-black">
				{whyNoirContent.title}
			</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
				{#each whyNoirContent.sections as section}
					<div class="space-y-4">
						<div class="w-16 h-16 mx-auto bg-noir-primary rounded-full flex items-center justify-center text-2xl">
							{section.icon}
						</div>
						<h3 class="text-xl font-serif font-semibold text-noir-black">{section.title}</h3>
						<p class="text-noir-deep-purple-600 font-sans">
							{section.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Motif Showcase Section -->
<section class="py-16 md:py-24 bg-white">
	<div class="container-custom">
		<div class="text-center mb-12 space-y-4">
			<h2 class="text-4xl md:text-5xl font-serif text-noir-black">
				{motifsContent.title}
			</h2>
			<p class="text-lg text-noir-deep-purple-600 font-sans max-w-2xl mx-auto">
				{motifsContent.subtitle}
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each motifsContent.items as motif, index}
				{@const hrefs = ['/collections/kolye', '/collections/yuzuk', '/collections/bilezik', '/collections/sahmeran']}
				{@const images = [
					'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
					'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
					'https://images.unsplash.com/photo-1611591437281-8a0f72382c2d?w=600&h=600&fit=crop',
					'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=600&fit=crop'
				]}
				<a href={hrefs[index]} class="group relative h-64 overflow-hidden rounded-lg bg-noir-deep-purple-100">
					<div class="absolute inset-0 bg-gradient-to-br from-noir-black/60 to-transparent z-10"></div>
					<img
						src={images[index]}
						alt={motif.name}
						class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
						loading="lazy"
					/>
					<div class="absolute bottom-0 left-0 right-0 p-6 z-20">
						<h3 class="text-2xl font-serif font-semibold text-white mb-2">{motif.name}</h3>
						<p class="text-sm text-white/90 font-sans">{motif.description}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Newsletter Section -->
<section class="py-16 md:py-24 bg-noir-black text-white">
	<div class="container-custom">
		<div class="max-w-2xl mx-auto text-center space-y-8">
			<h2 class="text-4xl md:text-5xl font-serif">
				{newsletterContent.title}
			</h2>
			<p class="text-lg text-noir-deep-purple-400 font-sans">
				{newsletterContent.description}
			</p>
			<form class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
				<input
					type="email"
					placeholder={newsletterContent.placeholder}
					class="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-noir-primary focus:border-transparent font-sans"
					required
				/>
				<button
					type="submit"
					class="px-8 py-4 bg-noir-primary text-noir-black font-semibold rounded-full hover:bg-opacity-90 transition-all font-sans"
				>
					{newsletterContent.button}
				</button>
			</form>
		</div>
	</div>
</section>


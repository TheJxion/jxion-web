<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import LocalReactWrapper from '$lib/components/jxion/LocalReactWrapper.svelte';
	import { content as defaultContent } from '$lib/i18n/content';
	import {
		contentStore,
		ensureContentStore,
	} from '$lib/stores/contentStore';

	// SvelteKit automatically provides these props, but we don't use them
	// Declaring them to suppress warnings
	export const data: any = undefined;
	export const params: any = undefined;

	// Dynamically import React components
	let immersiveHeroModule: any = null;
	let productCardModule: any = null;
	let heroLoaded = false;
	let productCardLoaded = false;

	// GSAP and ScrollTrigger references
	let GSAP: any;
	let ScrollTrigger: any;

	// Element references for GSAP animations
	let heroWrapper: HTMLElement;
	let mainContent: HTMLElement;
	let timeline: any = null;

	let contentData = defaultContent;
	let contentLoading = true;
	let contentError: string | null = null;
	let storeUnsubscribe: (() => void) | null = null;

	const fallbackProducts = defaultContent.home.featured.products ?? [];
	const fallbackWhy = defaultContent.home.whyNoir.sections ?? [];
const fallbackMotifs = defaultContent.home.motifs.items ?? [];
const fallbackSite = defaultContent.site ?? { name: 'NOIR' };
	const fallbackNewsletter = defaultContent.home.newsletter;
	const fallbackStats = defaultContent.home.whatsourimpact?.stats ?? [];

	$: heroCopy = contentData?.home?.hero ?? defaultContent.home.hero;
	$: featuredProducts =
		contentData?.home?.featured?.products ?? fallbackProducts;
	$: featuredTitle =
		contentData?.home?.featured?.title ?? defaultContent.home.featured.title;
	$: featuredSubtitle =
		contentData?.home?.featured?.subtitle ??
		defaultContent.home.featured.subtitle;
	$: whyNoirSections =
		contentData?.home?.whyNoir?.sections ?? fallbackWhy;
	$: motifs = (contentData?.home?.motifs?.items ?? fallbackMotifs).filter(
	(motif: any) => motif && motif.name
);
	$: newsletterCopy = contentData?.home?.newsletter ?? fallbackNewsletter;
	$: keyFeatures = contentData?.home?.keyFeatures;
	$: integrationSolutions = contentData?.home?.integrationSolutions;
	$: integrationTitle =
		contentData?.home?.integrationTitle ?? defaultContent.home.integrationTitle;
	$: integrationSubtitle =
		contentData?.home?.integrationSubtitle ??
		defaultContent.home.integrationSubtitle;
	$: nextStepsBlock = contentData?.home?.nextSteps ?? defaultContent.home.nextSteps;
	$: impactStats =
		contentData?.home?.whatsourimpact?.stats ?? fallbackStats;
	$: journeyBlock = contentData?.home?.journey ?? defaultContent.home.journey;
	$: trafficSignBlock =
		contentData?.home?.trafficSign ?? defaultContent.home.trafficSign;
	$: mobileFeaturesBlock =
		contentData?.home?.mobileFeatures ?? defaultContent.home.mobileFeatures;
	$: whatCanWeDoBlock =
		contentData?.home?.whatCanWeDoForYou ??
		defaultContent.home.whatCanWeDoForYou;
	$: nextStepsList = Array.isArray(nextStepsBlock?.list)
		? nextStepsBlock.list
		: Array.isArray(nextStepsBlock)
			? (nextStepsBlock as unknown as any[])
			: [];
	$: nextStepsTitle =
		(nextStepsBlock as any)?.title ?? 'İletişim ve Demo Talebi';
	$: nextStepsSubtitle =
		(nextStepsBlock as any)?.subtitle ?? '';
$: footerCopy = contentData?.footer ?? defaultContent.footer;
$: siteCopy = contentData?.site ?? fallbackSite;

	onMount(async () => {
		// --- 1. Load GSAP and ScrollTrigger ---
		try {
			const [gsapModule, scrollTriggerModule] = await Promise.all([
				import('gsap'),
				import('gsap/ScrollTrigger'),
			]);

			// GSAP exports as named export 'gsap' (lowercase)
			GSAP = gsapModule.gsap || gsapModule.default || gsapModule;
			ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;

			if (GSAP && ScrollTrigger) {
				GSAP.registerPlugin(ScrollTrigger);
			}
		} catch (error) {
			console.error('Error loading GSAP:', error);
		}

		// --- 2. Load React Components ---
		try {
			immersiveHeroModule = await import('$lib/components/organisms/ImmersiveHero');
			heroLoaded = true;
		} catch (error) {
			console.error('Error loading ImmersiveHero:', error);
			heroLoaded = true; // Continue even if component fails
		}

		try {
			productCardModule = await import('$lib/components/molecules/ProductCard');
			productCardLoaded = true;
		} catch (error) {
			console.error('Error loading ProductCard:', error);
			productCardLoaded = true; // Continue even if component fails
		}

		// --- 3. Initialize GSAP ScrollTrigger Animation ---
		// Wait for next tick to ensure DOM is ready
		setTimeout(() => {
			if (heroLoaded && heroWrapper && mainContent && GSAP && ScrollTrigger) {
				// Pin the hero section
				ScrollTrigger.create({
					trigger: heroWrapper,
					pin: true,
					start: 'top top',
					end: '+=100%', // Pin for 100vh of scroll
					scrub: 1, // Smooth animation tied to scroll
					onUpdate: (self: any) => {
						// Optional: Log scroll progress for debugging
						// console.log('Scroll Progress:', self.progress.toFixed(2));
					},
				});

				// Create timeline for hero content animation
				timeline = GSAP.timeline({
					scrollTrigger: {
						trigger: heroWrapper,
						start: 'top top',
						end: 'bottom top',
						scrub: 1,
					},
				});

				// Find the hero content element (the React component wrapper)
				const heroContent = heroWrapper.querySelector('.homepage-hero') as HTMLElement;

				if (heroContent) {
					// Animate hero content: scale down, move up, fade out
					timeline
						.to(heroContent, {
							scale: 0.8,
							y: '-15%',
							opacity: 0,
							ease: 'power2.out',
						}, 0)
						// Animate main content: reveal from bottom with clipPath
						.fromTo(
							mainContent,
							{
								clipPath: 'inset(100% 0 0 0)',
								y: 50,
							},
							{
								clipPath: 'inset(0% 0 0 0)',
								y: 0,
								ease: 'power2.out',
							},
							0.1
						);
				}
			}
		}, 100); // Small delay to ensure React components are rendered
	});

	onMount(() => {
		ensureContentStore();
		storeUnsubscribe = contentStore.subscribe(($state) => {
			contentData = $state.content;
			contentLoading = $state.loading;
			contentError = $state.error;
		});

		return () => {
			storeUnsubscribe?.();
		};
	});

	onDestroy(() => {
		// Clean up all ScrollTrigger instances
		if (ScrollTrigger) {
			ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
		}
		// Kill timeline if it exists
		if (timeline) {
			timeline.kill();
		}

		storeUnsubscribe?.();
	});

	// --- Product Data ---
</script>

<svelte:head>
	<title>NOIR | Zamanın Ötesinde Takı Deneyimi</title>
	<meta name="description" content="Yapay zeka güdümlü tasarımı Türk mirasıyla bütünleştiren lüks takı koleksiyonu" />
</svelte:head>

<!-- Immersive Hero Section - GSAP Pin Container -->
<div class="hero-wrapper" bind:this={heroWrapper}>
	{#if heroLoaded && immersiveHeroModule}
		<LocalReactWrapper
			componentModule={immersiveHeroModule}
			componentName="ImmersiveHero"
			props={{ className: 'homepage-hero' }}
		/>
	{:else}
		<div class="hero-loading">
			<div class="loading-spinner"></div>
		</div>
	{/if}
</div>

<!-- Main Content Section (Scrollable) -->
<section class="main-content min-h-[200vh] py-32" bind:this={mainContent}>
	<!-- Intro Text -->
	<div class="text-center mb-20 px-4 md:px-0 max-w-3xl mx-auto">
		<h1 class="text-6xl font-serif text-yellow-600 mb-6 antialiased leading-tight">
			{heroCopy?.title}
		</h1>
		<p class="text-lg text-gray-300 max-w-xl mx-auto">
			{@html heroCopy?.description}
		</p>
		{#if heroCopy?.tagline}
			<p class="text-sm uppercase tracking-[0.3em] text-gray-500 mt-4">
				{heroCopy.tagline}
			</p>
		{/if}
	</div>

	{#if contentError}
		<div class="max-w-3xl mx-auto mb-12 px-4">
			<div class="rounded-xl border border-yellow-600/40 bg-yellow-600/10 px-4 py-3 text-sm text-yellow-200">
				{contentError}
			</div>
		</div>
	{/if}

	<!-- Featured Collection Title -->
	<div class="text-center mb-12">
		<h2 class="text-4xl font-serif text-white mb-2">{featuredTitle}</h2>
		<p class="text-gray-400">{featuredSubtitle}</p>
	</div>

	<!-- Product Grid -->
	<div class="product-grid container mx-auto px-4">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each featuredProducts as product (product.title)}
				{#if productCardLoaded && productCardModule}
					<LocalReactWrapper
						componentModule={productCardModule}
						componentName="ProductCard"
						props={product}
					/>
				{:else}
					<div class="product-loading-card bg-gray-900 rounded-xl animate-pulse"></div>
				{/if}
			{/each}
		</div>
	</div>

	<!-- Why Noir Section -->
	<div class="container mx-auto px-4 mt-32 text-center">
		<h2 class="text-4xl font-serif text-yellow-600 mb-12">
			{contentData?.home?.whyNoir?.title ?? defaultContent.home.whyNoir.title}
		</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-12">
			{#each whyNoirSections as section (section.title)}
				<div class="p-6 bg-gray-900 rounded-xl border border-gray-800 transition duration-300 hover:border-yellow-600/50">
					{#if section.icon}
						<span class="text-5xl mb-4 block">{section.icon}</span>
					{/if}
					<h3 class="text-xl font-semibold text-white mb-2">{section.title}</h3>
					<p class="text-gray-400">
						{section.description}
					</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Design Motifs Section -->
	<div class="container mx-auto px-4 mt-32 text-center">
		<h2 class="text-4xl font-serif text-white mb-12">
			{contentData?.home?.motifs?.title ?? defaultContent.home.motifs.title}
		</h2>
		<p class="text-gray-400 mb-16">
			{contentData?.home?.motifs?.subtitle ?? defaultContent.home.motifs.subtitle}
		</p>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
			{#each motifs as motif, index (motif?.name ?? `motif-${index}`)}
				<div class="flex flex-col items-center p-4 transition duration-300 hover:bg-gray-900 rounded-lg">
					{#if motif?.icon}
						<span class="text-4xl mb-4">{motif.icon}</span>
					{/if}
					<h3 class="text-lg	font-semibold text-yellow-600 mb-1">{motif?.name ?? '—'}</h3>
					<p class="text-sm text-gray-400">{motif?.description ?? ''}</p>
				</div>
			{/each}
		</div>
	</div>

	{#if impactStats.length}
		<div class="container mx-auto px-4 mt-24">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
				{#each impactStats as stat (stat.label)}
					<div class="border border-gray-800 rounded-2xl p-6 text-center bg-gradient-to-b from-gray-900/60 to-black/40">
						<p class="text-4xl font-serif text-yellow-500">{stat.value}</p>
						<p class="text-gray-400 mt-2">{stat.label}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	{#if keyFeatures?.items?.length}
		<section class="container mx-auto px-4 mt-32 text-center">
			<h2 class="text-4xl font-serif text-white mb-4">{keyFeatures.title}</h2>
			<p class="text-gray-400 mb-12">{keyFeatures.subtitle}</p>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				{#each keyFeatures.items as feature (feature.title)}
					<div class="p-6 bg-gray-900 border border-gray-800 rounded-2xl text-left">
						<h3 class="text-xl font-semibold text-white mb-3">{feature.title}</h3>
						<p class="text-gray-400 text-sm">{feature.description}</p>
						{#if feature.footnote}
							<p class="text-xs text-gray-500 mt-4">{feature.footnote}</p>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if integrationSolutions?.items?.length}
		<section class="container mx-auto px-4 mt-32">
			<div class="text-center mb-12">
				<h2 class="text-4xl font-serif text-white mb-3">{integrationTitle}</h2>
				<p class="text-gray-400 max-w-2xl mx-auto">{integrationSubtitle}</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				{#each integrationSolutions.items as solution (solution.title)}
					<div class="p-6 bg-gray-900 border border-gray-800 rounded-2xl">
						<h3 class="text-2xl font-serif text-yellow-500 mb-3">{solution.title}</h3>
						<p class="text-gray-400 mb-4">{solution.description}</p>
						{#if solution.features?.length}
							<ul class="space-y-2 text-gray-300 text-sm">
								{#each solution.features as feature (feature)}
									<li class="flex items-start gap-2">
										<span class="text-yellow-500 mt-1">•</span>
										<span>{feature}</span>
									</li>
								{/each}
							</ul>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if journeyBlock}
		<section class="container mx-auto px-4 mt-32 bg-gray-900/60 border border-gray-800 rounded-3xl p-10">
			<h2 class="text-3xl font-serif text-white mb-4">{journeyBlock.title}</h2>
			<p class="text-gray-300 mb-8">{journeyBlock.description}</p>
			{#if journeyBlock.benefits}
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					{#each journeyBlock.benefits as benefit (benefit)}
						<div class="flex items-start gap-3">
							<span class="text-yellow-500 mt-1">★</span>
							<span class="text-gray-200">{benefit}</span>
						</div>
					{/each}
				</div>
			{/if}
		</section>
	{/if}

	{#if nextStepsList.length}
		<section class="container mx-auto px-4 mt-32 text-center">
			<h2 class="text-4xl font-serif text-white mb-3">{nextStepsTitle}</h2>
			<p class="text-gray-400 mb-10">{nextStepsSubtitle}</p>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				{#each nextStepsList as step (step.title)}
					<div class="p-6 bg-gray-900 rounded-2xl border border-gray-800 text-left flex flex-col gap-3">
						<h3 class="text-xl font-semibold text-white">{step.title}</h3>
						<p class="text-gray-400 text-sm flex-1">{step.description}</p>
						<div class="text-xs text-gray-500">{step.estimatedTime}</div>
						{#if step.ctaText}
							<a href={step.link} class="text-yellow-500 font-semibold hover:underline">
								{step.ctaText}
							</a>
						{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}

	{#if mobileFeaturesBlock}
		<section class="container mx-auto px-4 mt-32 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
			<div>
				<h2 class="text-4xl font-serif text-white mb-4">{mobileFeaturesBlock.title}</h2>
				<p class="text-gray-400 mb-6">{mobileFeaturesBlock.subtitle}</p>
				<p class="text-sm text-yellow-500">{mobileFeaturesBlock.comingSoon}</p>
			</div>
			<div class="bg-gray-900 border border-gray-800 rounded-3xl p-6">
				<h3 class="text-xl font-semibold text-white mb-3">{mobileFeaturesBlock.qrTitle}</h3>
				<p class="text-gray-400 mb-4">{mobileFeaturesBlock.qrDescription}</p>
				{#if mobileFeaturesBlock.qrFeatures}
					<ul class="text-sm text-gray-300 space-y-2">
						{#each mobileFeaturesBlock.qrFeatures as feature (feature)}
							<li>• {feature}</li>
						{/each}
					</ul>
				{/if}
			</div>
		</section>
	{/if}

	{#if trafficSignBlock}
		<section class="container mx-auto px-4 mt-32 text-center">
			<h2 class="text-4xl font-serif text-white mb-6">{trafficSignBlock.title}</h2>
			<div class="space-y-4 text-gray-400 max-w-3xl mx-auto">
				{#each trafficSignBlock.descriptions as description (description)}
					<p>{description}</p>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Newsletter Form -->
	<div class="container mx-auto px-4 mt-32 text-center py-16 bg-gray-900 rounded-xl border border-gray-800 shadow-xl">
		<h2 class="text-4xl font-serif text-white mb-4">{newsletterCopy.title}</h2>
		<p class="text-gray-400 mb-8">
			{newsletterCopy.description}
		</p>
		<form class="flex flex-col md:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
			<input
				type="email"
				placeholder={newsletterCopy.placeholder}
				class="flex-grow w-full md:w-auto p-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
			/>
			<button
				type="submit"
				class="w-full md:w-auto p-3 rounded-lg bg-yellow-600 text-black font-bold hover:bg-yellow-500 transition-colors shadow-lg"
			>
				{newsletterCopy.button}
			</button>
		</form>
	</div>
</section>

<!-- Footer -->
<footer class="bg-black py-16 border-t border-gray-800">
	<div class="container mx-auto px-4 text-center">
		<div class="text-4xl font-serif text-yellow-600 mb-4 tracking-wider">{siteCopy?.name ?? 'NOIR'}</div>
		<p class="text-gray-400 mb-10 text-lg">{footerCopy.description}</p>

		<div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-left max-w-4xl mx-auto">
			<!-- Corporate -->
			<div class="flex flex-col space-y-3">
				<h4 class="text-lg font-semibold text-white mb-2">Kurumsal</h4>
				<a href="/about" class="text-gray-400 hover:text-yellow-600 transition-colors">Hakkımızda</a>
				<a href="/contact" class="text-gray-400 hover:text-yellow-600 transition-colors">İletişim</a>
				<a href="/careers" class="text-gray-400 hover:text-yellow-600 transition-colors">Kariyer</a>
			</div>

			<!-- Customer Service -->
			<div class="flex flex-col space-y-3">
				<h4 class="text-lg font-semibold text-white mb-2">Müşteri Hizmetleri</h4>
				<a href="/shipping" class="text-gray-400 hover:text-yellow-600 transition-colors"
					>Kargo ve Teslimat</a
				>
				<a href="/returns" class="text-gray-400 hover:text-yellow-600 transition-colors"
					>İade ve Değişim</a
				>
				<a href="/faq" class="text-gray-400 hover:text-yellow-600 transition-colors"
					>Sık Sorulan Sorular</a
				>
			</div>

			<!-- Legal -->
			<div class="flex flex-col space-y-3">
				<h4 class="text-lg font-semibold text-white mb-2">Yasal</h4>
				<a href="/privacy" class="text-gray-400 hover:text-yellow-600 transition-colors"
					>Gizlilik Politikası</a
				>
				<a href="/terms" class="text-gray-400 hover:text-yellow-600 transition-colors"
					>Kullanım Koşulları</a
				>
				<a href="/cookies" class="text-gray-400 hover:text-yellow-600 transition-colors"
					>Çerez Politikası</a
				>
			</div>

			<!-- Social Media -->
			<div class="flex flex-col space-y-3">
				<h4 class="text-lg font-semibold text-white mb-2">Bizi Takip Edin</h4>
				<div class="flex space-x-4">
					<a
						href="https://twitter.com/NOIR"
						target="_blank"
						rel="noopener noreferrer"
						class="text-xl text-gray-400 hover:text-yellow-600 transition-colors cursor-pointer"
						>X</a
					>
					<a
						href="https://instagram.com/NOIR"
						target="_blank"
						rel="noopener noreferrer"
						class="text-xl text-gray-400 hover:text-yellow-600 transition-colors cursor-pointer"
						>IG</a
					>
					<a
						href="https://facebook.com/NOIR"
						target="_blank"
						rel="noopener noreferrer"
						class="text-xl text-gray-400 hover:text-yellow-600 transition-colors cursor-pointer"
						>FB</a
					>
				</div>
			</div>
		</div>

		<p class="mt-16 text-sm text-gray-600">
			{footerCopy.copyright ?? '© 2025 NOIR. Tüm hakları saklıdır. Jxion Framework Powered.'}
		</p>
	</div>
</footer>

<style>
	/* --- Jxion Design System Variables (from _noir-variables.scss) --- */
	:global(:root) {
		--color-noir-black: #000000;
		--color-noir-gold: #ffd700;
		--color-noir-graphite: #434343;
		--color-noir-text-primary: #f8f8f8;
		--color-noir-text-secondary: #e2e2e2;
	}

	/* Hero Wrapper: Container for pinned content */
	.hero-wrapper {
		height: 100vh;
		position: relative;
		/* Background: Dark gradient that seeps under the hero */
		background: radial-gradient(
			circle at center,
			var(--color-noir-graphite) 0%,
			var(--color-noir-black) 100%
		);
	}

	/* React Component Container */
	:global(.homepage-hero) {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.hero-loading {
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-noir-black);
	}

	.loading-spinner {
		width: 40px;
		height: 40px;
		border: 3px solid rgba(255, 215, 0, 0.2);
		border-top-color: var(--color-noir-gold);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.main-content {
		background-color: var(--color-noir-black);
		color: var(--color-noir-text-primary);
		position: relative;
		z-index: 10; /* Ensures content is above the unpinned canvas */
		/* Initial clipPath for smooth reveal animation */
		clip-path: inset(100% 0 0 0);
	}

	/* Headings use Playfair Display font (NOIR theme) */
	:global(h1),
	:global(h2),
	:global(h3),
	footer :global(h4) {
		font-family: 'Playfair Display', 'Times New Roman', serif;
	}

	/* Visual consistency improvements */
	.product-loading-card {
		height: 450px; /* Match product card height */
		background-color: #1a1a1a;
		border: 1px solid #333;
	}
</style>


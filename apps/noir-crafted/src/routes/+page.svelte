<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import LocalReactWrapper from '$lib/components/jxion/LocalReactWrapper.svelte';
	import { getFeaturedProducts, getProductsByCollection } from '$lib/data/products';

	// NOTE(@Janberk): The main template component
	// That will going to be provided from the jxion-core.
	let smoothHeroModule: any = null;
	let jxionProductGridModule: any = null;
	let productCardModule: any = null;
	// TODO(janberk-feature(state-management)): The state management for the components needs to be handled by zustand.
	let heroLoaded = false;
	let productGridLoaded = false;
	let productCardLoaded = false;
	let gsap: any = null;
	let ScrollTrigger: any = null;

	onMount(async () => {
		try {
			// Load SmoothHero (includes smooth GSAP ScrollTrigger animations)
			smoothHeroModule = await import('$lib/components/organisms/SmoothHero');
			heroLoaded = true;
		} catch (error) {
			console.error('Error loading SmoothHero:', error);
			heroLoaded = true;
		}
		try {
			// Load JxionProductGrid (includes its own GSAP Draggable setup)
			jxionProductGridModule = await import('$lib/components/organisms/JxionProductGrid');
			productGridLoaded = true;
		} catch (error) {
			console.error('Error loading JxionProductGrid:', error);
			productGridLoaded = true;
		}
		try {
			// Keep ProductCard for backward compatibility
			productCardModule = await import('$lib/components/molecules/ProductCard');
			productCardLoaded = true;
		} catch (error) {
			console.error('Error loading ProductCard:', error);
			productCardLoaded = true;
		}

		// Initialize GSAP scroll animations for product sections
		if (typeof window !== 'undefined') {
			try {
				const gsapModule = await import('gsap');
				gsap = gsapModule.default || gsapModule.gsap || gsapModule;
				const scrollTriggerModule = await import('gsap/ScrollTrigger');
				ScrollTrigger =
					(scrollTriggerModule as any).ScrollTrigger || scrollTriggerModule.default;
				if (ScrollTrigger && gsap && gsap.registerPlugin) {
					gsap.registerPlugin(ScrollTrigger);
				}

				// Wait for DOM to be ready
				await new Promise((resolve) => setTimeout(resolve, 100));

				// Animate product cards on scroll
				const productCards = document.querySelectorAll('.product-card');
				productCards.forEach((card: any, index: number) => {
					gsap.fromTo(
						card,
						{ opacity: 0, y: 50, scale: 0.95 },
						{
							opacity: 1,
							y: 0,
							scale: 1,
							duration: 0.8,
							ease: 'power3.out',
							scrollTrigger: {
								trigger: card,
								start: 'top 85%',
								toggleActions: 'play none none reverse',
							},
							delay: index * 0.1, // Stagger effect
						}
					);
				});

				// Animate sections
				const sections = document.querySelectorAll('.section');
				sections.forEach((section: any) => {
					gsap.fromTo(
						section,
						{ opacity: 0, y: 40 },
						{
							opacity: 1,
							y: 0,
							duration: 1,
							ease: 'power2.out',
							scrollTrigger: {
								trigger: section,
								start: 'top 80%',
								toggleActions: 'play none none reverse',
							},
						}
					);
				});
			} catch (error) {
				console.error('Error initializing GSAP scroll animations:', error);
			}
		}
	});

	onDestroy(() => {
		// Cleanup GSAP ScrollTriggers
		if (ScrollTrigger && typeof window !== 'undefined') {
			ScrollTrigger.getAll().forEach((trigger: any) => {
				trigger.kill();
			});
		}
	});

	// Get featured products for the main grid
	const featuredProducts = getFeaturedProducts();
	
	// Get Virgo collection products
	const virgoProducts = getProductsByCollection('virgo');
	
	// Convert Product to ProductCard format
	const PRODUCTS = featuredProducts.map((product) => ({
		title: product.name,
		description: product.description,
		price: `₺${product.price.toLocaleString('tr-TR')}`,
		imageUrl: product.image,
		id: product.id,
	}));

	// TODO(janberk-refactor(translation)): The motif data needs to be fetched from the database and the @jxion/i18n needs to be used to translate the data. so that @noir-admin can manage the motif data and translations.
	const MOTIFS = [
		{ icon: '🌙', title: 'Ay Döngüleri', description: 'Zamanın ritmini yansıtan tasarımlar' },
		{ icon: '🌟', title: 'Virgo', description: 'Zarafet ve mükemmellik arayışı' },
		{ icon: '🌷', title: 'Lale', description: 'Türk kültürünün simgesi' },
		{ icon: '🐍', title: 'Şahmeran', description: 'Efsanevi güç ve zarafet' },
	];
</script>

<svelte:head>
	<title>NOIR | Zamanın Ötesinde Takı Deneyimi</title>
	<meta name="description" content="Yapay zeka güdümlü tasarımı Türk mirasıyla bütünleştiren lüks takı koleksiyonu" />
</svelte:head>

<!-- SmoothHero: Smooth GSAP hero component with pin and shrink animations -->
{#if heroLoaded && smoothHeroModule}
	<LocalReactWrapper
		componentModule={smoothHeroModule}
		componentName="SmoothHero"
		props={{
			title: 'The Virgo Collection',
			subtitle: 'Yapay zeka güdümlü tasarımı Türk mirasıyla sorunsuz bir şekilde bütünleştiren en son koleksiyonumuzu keşfedin.',
			description: 'Her parça, kadın gücünü ve zarafetini kutlayan özenle tasarlanmış eserlerdir.',
			ctaText: 'Koleksiyonu Keşfet',
		}}
	/>
{:else}
	<div class="hero-loading">
		<div class="loading-spinner"></div>
		<p class="text-yellow-600 mt-4">Loading SmoothHero...</p>
	</div>
{/if}

<!-- JxionProductGrid: Flagship product grid with draggable layout and inner carousels -->
{#if productGridLoaded && jxionProductGridModule}
	<LocalReactWrapper
		componentModule={jxionProductGridModule}
		componentName="JxionProductGrid"
	/>
{:else}
	<div class="product-grid-loading min-h-[150vh] bg-black flex items-center justify-center">
		<div class="loading-spinner"></div>
		<p class="text-yellow-600 mt-4">Loading JxionProductGrid...</p>
</div>
{/if}

<section id="collection" class="main-content min-h-[200vh] py-32">
	<div class="text-center mb-20 px-4 md:px-0 max-w-3xl mx-auto">
		<h1 class="text-6xl font-serif text-yellow-600 mb-6 antialiased leading-tight">
			The Virgo Collection
		</h1>
		<p class="text-lg text-gray-300 max-w-xl mx-auto">
			Yapay zeka güdümlü tasarımı Türk mirasıyla sorunsuz bir şekilde bütünleştiren en son
			koleksiyonumuzu keşfedin.
		</p>
	</div>

	<div class="text-center mb-12 section">
		<h2 class="text-4xl font-serif text-white mb-2">Öne Çıkan Koleksiyon</h2>
		<p class="text-gray-400">En sevilen parçalarımızdan bir seçki</p>
	</div>

	<!-- Legacy ProductCard grid (kept for backward compatibility) -->
	<div class="product-grid container mx-auto px-4">
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each PRODUCTS as product (product.title)}
				{#if productCardLoaded && productCardModule}
					<div class="product-card">
						<LocalReactWrapper
							componentModule={productCardModule}
							componentName="ProductCard"
							props={product}
						/>
					</div>
				{:else}
					<div class="product-loading-card bg-gray-900 rounded-xl animate-pulse product-card"></div>
				{/if}
			{/each}
		</div>
	</div>

	<div class="container mx-auto px-4 mt-32 text-center section">
		<h2 class="text-4xl font-serif text-yellow-600 mb-12">Neden Noir?</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-12">
			<div class="p-6 bg-gray-900 rounded-xl border border-gray-800 transition duration-300 hover:border-yellow-600/50">
				<span class="text-5xl mb-4 block">✨</span>
				<h3 class="text-xl font-semibold text-white mb-2">Özel Tasarım</h3>
				<p class="text-gray-400">
					Her parça, kadın gücünü ve zarafetini kutlayan özenle tasarlanmış eserlerdir.
				</p>
			</div>
			<div class="p-6 bg-gray-900 rounded-xl border border-gray-800 transition duration-300 hover:border-yellow-600/50">
				<span class="text-5xl mb-4 block">🔨</span>
				<h3 class="text-xl font-semibold text-white mb-2">Kaliteli İşçilik</h3>
				<p class="text-gray-400">
					En kaliteli malzemeler ve geleneksel zanaatkarlık ile modern tasarımın buluşması.
				</p>
			</div>
			<div class="p-6 bg-gray-900 rounded-xl border border-gray-800 transition duration-300 hover:border-yellow-600/50">
				<span class="text-5xl mb-4 block">💎</span>
				<h3 class="text-xl font-semibold text-white mb-2">Anlamlı Tasarımlar</h3>
				<p class="text-gray-400">
					Ay döngüleri, Virgo, lale ve Şahmeran gibi motiflerle örülü hikayeler.
				</p>
			</div>
		</div>
	</div>

	<div class="container mx-auto px-4 mt-32 text-center section">
		<h2 class="text-4xl font-serif text-white mb-12">Tasarım Motifleri</h2>
		<p class="text-gray-400 mb-16">
			Her koleksiyonumuz, derin anlamlar taşıyan motiflerle bezenmiştir
		</p>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
			{#each MOTIFS as motif (motif.title)}
				<div class="flex flex-col items-center p-4 transition duration-300 hover:bg-gray-900 rounded-lg">
					<span class="text-4xl mb-4">{motif.icon}</span>
					<h3 class="text-lg font-semibold text-yellow-600 mb-1">{motif.title}</h3>
					<p class="text-sm text-gray-400">{motif.description}</p>
				</div>
			{/each}
		</div>
	</div>

	<div class="container mx-auto px-4 mt-32 text-center py-16 bg-gray-900 rounded-xl border border-gray-800 shadow-xl section">
		<h2 class="text-4xl font-serif text-white mb-4">Yeni Koleksiyonlardan Haberdar Olun</h2>
		<p class="text-gray-400 mb-8">
			Özel indirimler ve yeni tasarımlar hakkında ilk siz haberdar olun.
		</p>
		<form class="flex flex-col md:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
			<input
				type="email"
				placeholder="E-posta adresinizi girin"
				class="flex-grow w-full md:w-auto p-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
			/>
			<button
				type="submit"
				class="w-full md:w-auto p-3 rounded-lg bg-yellow-600 text-black font-bold hover:bg-yellow-500 transition-colors shadow-lg"
			>
				Abone Ol
			</button>
		</form>
	</div>
</section>

<footer class="bg-black py-16 border-t border-gray-800">
	<div class="container mx-auto px-4 text-center">
		<div class="text-4xl font-serif text-yellow-600 mb-4 tracking-wider">NOIR</div>
		<p class="text-gray-400 mb-10 text-lg">Zamanın ötesinde takı deneyimi.</p>

		<div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-left max-w-4xl mx-auto">
			<div class="flex flex-col space-y-3">
				<h4 class="text-lg font-semibold text-white mb-2">Kurumsal</h4>
				<a href="/about" class="text-gray-400 hover:text-yellow-600 transition-colors">Hakkımızda</a>
				<a href="/contact" class="text-gray-400 hover:text-yellow-600 transition-colors">İletişim</a>
				<a href="/careers" class="text-gray-400 hover:text-yellow-600 transition-colors">Kariyer</a>
			</div>

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

		<p class="mt-16 text-sm text-gray-600">© 2025 NOIR. Tüm hakları saklıdır. Jxion Framework Powered.</p>
	</div>
</footer>

<style>
	/* --- TODO(@janberk-refactor(design-system)): All styles should be coming from the @jxion/design system and loaded via the @jxion/design/styles/_noir-variables.scss file.
	-- -------------------------------------------------- */

	.hero-loading {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: var(--color-noir-black);
		color: var(--color-noir-text-primary);
	}

	.product-grid-loading {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: var(--color-noir-text-primary);
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
		z-index: 10;
	}

	:global(h1),
	:global(h2),
	:global(h3),
	footer :global(h4) {
		font-family: 'Playfair Display', 'Times New Roman', serif;
	}
	
	.product-loading-card {
		height: 450px;
		background-color: #1a1a1a;
		border: 1px solid #333;
	}

	/* Performance optimizations for GSAP animations */
	:global(.smooth-hero),
	:global(.smooth-hero h1),
	:global(.smooth-hero p),
	:global(.smooth-hero button) {
		will-change: transform, opacity;
	}

	:global(.product-card),
	:global(.section) {
		will-change: transform, opacity;
	}
</style>


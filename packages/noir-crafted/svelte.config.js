import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			runtime: 'nodejs20.x',
		}),
		alias: {
			$components: 'src/lib/components',
			$atoms: 'src/lib/components/atoms',
			$molecules: 'src/lib/components/molecules',
			$organisms: 'src/lib/components/organisms',
			$layouts: 'src/lib/components/layouts',
			$lib: 'src/lib',
			$types: 'src/lib/types',
			$utils: 'src/lib/utils',
			$stores: 'src/lib/stores',
		},
	},
};

export default config;

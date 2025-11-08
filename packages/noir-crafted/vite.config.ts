import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@jxion/core': path.resolve(__dirname, '../jxion-core/src'),
			'@jxion/design': path.resolve(__dirname, '../jxion-design/src'),
			'@jxion/shared': path.resolve(__dirname, '../jxion-shared/src'),
		},
	},
	server: {
		port: 5173,
		host: true,
	},
});

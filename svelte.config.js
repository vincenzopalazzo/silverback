import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		paths: {
			// GitHub Pages serves the site under /<repo>; empty in dev
			base: process.argv.includes('dev') ? '' : '/silverback'
		}
	}
};

export default config;

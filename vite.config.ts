import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';

// GitHub Pages serves a *user* site (<name>.github.io) from the root, but a
// *project* site from /<repo>. The deploy workflow sets BASE_PATH for the latter.
const base = (process.env.BASE_PATH ?? '') as '' | `/${string}`;

export default defineConfig({
	plugins: [
		sveltekit({
			// Blog posts are .svx (markdown with Svelte in it), living in src/lib/posts.
			extensions: ['.svelte', '.svx'],
			preprocess: [mdsvex({ extensions: ['.svx'] })],

			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			adapter: adapter({
				pages: 'build',
				assets: 'build',
				// Pages has no server, so unknown routes fall back to a static 404.
				fallback: '404.html',
				precompress: false,
				strict: true
			}),

			paths: { base },
			prerender: { entries: ['*'] }
		})
	]
});

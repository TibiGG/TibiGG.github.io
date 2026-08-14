import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';
import { parse as parseYaml } from 'yaml';

// GitHub Pages serves a *user* site (<name>.github.io) from the root, but a
// *project* site from /<repo>. The deploy workflow sets BASE_PATH for the latter.
const base = (process.env.BASE_PATH ?? '') as '' | `/${string}`;

export default defineConfig({
	plugins: [
		sveltekit({
			// Blog posts are .svx (markdown with Svelte in it), living in src/lib/posts.
			extensions: ['.svelte', '.svx'],
			preprocess: [
				mdsvex({
					extensions: ['.svx'],
					// mdsvex 0.12's own frontmatter parser strips the block without
					// exporting anything, so every post came through with an undefined
					// title and an "Invalid Date". Handing it a real YAML parser is the
					// fix. `yaml` follows the 1.2 core schema, which leaves `2026-08-06`
					// as a string rather than coercing it to a Date, and post sorting
					// compares those dates as strings.
					frontmatter: {
						type: 'yaml',
						marker: '-',
						// Malformed frontmatter fails the build rather than quietly
						// producing another post with no title.
						parse: (frontmatter) => parseYaml(frontmatter)
					}
				})
			],

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
			prerender: {
				entries: ['*'],
				// With no posts written yet, /writing/[slug] has no entries to
				// generate, and an unreachable prerenderable route fails the build by
				// default. That one route is legitimately empty until the first post
				// exists, so it is excused by name; anything else unreachable is a
				// real problem and still fails.
				handleUnseenRoutes: ({ routes, message }) => {
					const unexpected = routes.filter((route) => route !== '/writing/[slug]');
					if (unexpected.length) throw new Error(message);
				}
			}
		})
	]
});

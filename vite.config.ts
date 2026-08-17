import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import { defineConfig, type Plugin } from 'vite';
import { parse as parseYaml } from 'yaml';
import { readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { printToPdf } from './scripts/chrome.mjs';

// In production /cv.pdf is printed from the built page by scripts/print-cv.mjs.
// Under `vite dev` there is no build, so this prints the page off the running dev
// server on request instead. Slower per click, but it is always the CV you are
// currently looking at, and the download button behaves the same in both places.
const cvPdfInDev: Plugin = {
	name: 'cv-pdf-dev',
	apply: 'serve',
	configureServer(server) {
		server.middlewares.use('/cv.pdf', async (req, res, next) => {
			const host = req.headers.host;
			if (!host) return next();

			const out = join(tmpdir(), `cv-dev-${process.pid}.pdf`);
			try {
				await printToPdf(`http://${host}/cv/`, out);
				const pdf = readFileSync(out);
				res.setHeader('content-type', 'application/pdf');
				res.setHeader('content-length', pdf.byteLength);
				res.end(pdf);
			} catch (e) {
				// Never answer with HTML here: the browser would save the error page
				// as cv.pdf and it would look like a corrupt download.
				res.statusCode = 500;
				res.setHeader('content-type', 'text/plain');
				res.end(`Could not print the CV: ${e instanceof Error ? e.message : String(e)}\n`);
			} finally {
				rmSync(out, { force: true });
			}
		});
	}
};

// GitHub Pages serves a *user* site (<name>.github.io) from the root, but a
// *project* site from /<repo>. The deploy workflow sets BASE_PATH for the latter.
const base = (process.env.BASE_PATH ?? '') as '' | `/${string}`;

export default defineConfig({
	plugins: [
		cvPdfInDev,
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
				// /cv.pdf is printed from the built page after this step, so the
				// crawler is always going to find it missing. Every other dead link
				// is still a build failure.
				handleHttpError: ({ path, message }) => {
					if (path === '/cv.pdf') return;
					throw new Error(message);
				},
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

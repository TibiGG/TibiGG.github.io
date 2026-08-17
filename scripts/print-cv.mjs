// Prints the built /cv/ page to build/cv.pdf with headless Chrome. Run as part
// of `npm run build`, so a build and its PDF can never come apart.
//
// The CV page exists so the CV cannot drift out of date the way a checked-in PDF
// does, which is why this file is generated at build time and never committed.
//
// No server is involved: the site is fully static with relative asset paths, so
// Chrome renders it straight off the filesystem.

import { copyFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { printToPdf } from './chrome.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const page = `${root}build/cv/index.html`;
const out = `${root}build/cv.pdf`;

if (!existsSync(page)) {
	console.error('No build/cv/index.html. Run `npm run build` first.');
	process.exit(1);
}

try {
	const chrome = await printToPdf(`file://${page}`, out);
	console.log(`Printed ${out} with ${chrome}`);
} catch (e) {
	console.error(e instanceof Error ? e.message : String(e));
	process.exit(1);
}

// `vite preview` serves SvelteKit's own client output, not the adapter's build/
// directory, so without this copy the download 404s in preview and looks broken
// even though the deployed site is fine. Production serves build/.
const previewDir = `${root}.svelte-kit/output/client`;
if (existsSync(previewDir)) {
	copyFileSync(out, `${previewDir}/cv.pdf`);
	console.log('Copied it into .svelte-kit/output/client for `vite preview`');
}

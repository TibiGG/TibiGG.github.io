// Prints the tailored CVs in applications/cv/ to applications/cv/pdf/.
//
//   npm run cv:variant            every variant
//   npm run cv:variant research   just that one
//
// Variants are served by the dev server only (see src/routes/cv/[variant]), so
// this starts one of its own on a free port, prints, and shuts it down. Nothing
// it writes is tracked: applications/ is gitignored.

import { mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { printToPdf } from './chrome.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const dir = `${root}applications/cv`;
const outDir = `${dir}/pdf`;

const all = readdirSync(dir)
	.filter((f) => f.endsWith('.ts'))
	.map((f) => f.slice(0, -3));
const wanted = process.argv.slice(2);
const names = wanted.length ? wanted : all;

const missing = names.filter((n) => !all.includes(n));
if (missing.length) {
	console.error(`No variant called ${missing.join(', ')}. Have: ${all.join(', ')}`);
	process.exit(1);
}

// Two pages that stand alone, then at most two of appendix.
const BUDGET = 4;

const server = await createServer({ configFile: `${root}vite.config.ts`, logLevel: 'error', server: { port: 0 } });
await server.listen();
const { port } = /** @type {import('node:net').AddressInfo} */ (server.httpServer?.address());

let failed = false;
try {
	mkdirSync(outDir, { recursive: true });
	for (const name of names) {
		const out = `${outDir}/${name}.pdf`;
		await printToPdf(`http://localhost:${port}/cv/${name}/`, out);
		// Chrome writes one /Type /Page object per page; good enough to count.
		const pages = (readFileSync(out, 'latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length;
		const note = pages > BUDGET ? `  <- over the ${BUDGET}-page budget` : '';
		console.log(`${name}: ${pages} pages -> ${out}${note}`);
	}
} catch (e) {
	console.error(e instanceof Error ? e.message : String(e));
	failed = true;
} finally {
	await server.close();
}
process.exit(failed ? 1 : 0);

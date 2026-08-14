// Prints the built /cv/ page to build/cv.pdf with headless Chrome.
//
//   npm run build && npm run cv:pdf
//
// The CV page exists so the CV cannot drift out of date the way a checked-in
// PDF does, so the PDF is generated from that page at build time and never
// committed. The deploy workflow runs this between the build and the upload,
// which means the downloadable file is always the page you can see.
//
// No server is involved: the site is fully static with relative asset paths, so
// Chrome renders it straight off the filesystem.

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const page = `file://${root}build/cv/index.html`;
const out = `${root}build/cv.pdf`;

if (!existsSync(`${root}build/cv/index.html`)) {
	console.error('No build/cv/index.html. Run `npm run build` first.');
	process.exit(1);
}

// Whatever the platform calls it. CI runners have google-chrome on PATH.
const candidates = [
	process.env.CHROME_PATH,
	'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
	'google-chrome',
	'google-chrome-stable',
	'chromium',
	'chromium-browser'
].filter(Boolean);

let printed = false;
for (const chrome of candidates) {
	try {
		execFileSync(
			chrome,
			[
				'--headless',
				'--disable-gpu',
				'--no-sandbox',
				'--no-pdf-header-footer',
				`--print-to-pdf=${out}`,
				page
			],
			{ stdio: 'ignore' }
		);
		printed = true;
		console.log(`Printed ${out} with ${chrome}`);
		break;
	} catch {
		// Try the next candidate.
	}
}

if (!printed) {
	console.error('No Chrome found. Set CHROME_PATH to a Chrome or Chromium binary.');
	process.exit(1);
}

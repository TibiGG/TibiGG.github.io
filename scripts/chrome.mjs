// Finding Chrome and printing a page to PDF, shared by the build-time script and
// the dev-server middleware in vite.config.ts.

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);

// Whatever the platform calls it. CI runners have google-chrome on PATH.
/** @type {string[]} */
const CANDIDATES = [];
if (process.env.CHROME_PATH) CANDIDATES.push(process.env.CHROME_PATH);
CANDIDATES.push(
	'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
	'google-chrome',
	'google-chrome-stable',
	'chromium',
	'chromium-browser'
);

/**
 * Prints `url` to `out` as a PDF. Resolves with the browser binary that worked,
 * and rejects if no Chrome or Chromium can be found.
 *
 * Asynchronous on purpose. The dev-server middleware calls this to print a page
 * served by that same single-threaded dev server, so a synchronous spawn would
 * block the event loop and deadlock: Chrome waits for the page, the server waits
 * for Chrome.
 *
 * @param {string} url
 * @param {string} out
 * @returns {Promise<string>}
 */
export async function printToPdf(url, out) {
	for (const chrome of CANDIDATES) {
		try {
			await run(chrome, [
				'--headless',
				'--disable-gpu',
				'--no-sandbox',
				'--no-pdf-header-footer',
				`--print-to-pdf=${out}`,
				url
			]);
			return chrome;
		} catch {
			// Try the next candidate.
		}
	}
	throw new Error('No Chrome found. Set CHROME_PATH to a Chrome or Chromium binary.');
}

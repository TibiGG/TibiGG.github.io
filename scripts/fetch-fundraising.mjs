// Pulls the live total off my Cancer Research UK giving page and writes it to
// src/lib/data/fundraising.json, which the site reads at build time.
//
// The site is static (GitHub Pages, no server), so nothing can poll at runtime:
// a scheduled workflow runs this, commits the JSON if it moved, and rebuilds.
//
//   node scripts/fetch-fundraising.mjs
//
// Exits non-zero on a fetch or parse failure and leaves the existing JSON alone,
// so a bad scrape never blanks the number on the page.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('../src/lib/data/fundraising.json', import.meta.url));

// Keyed by the `feed` field on each fundraiser in src/lib/data/play.ts.
const SOURCES = {
	'cancer-research-uk': 'https://fundraise.cancerresearchuk.org/page/tibi-geo'
};

// The page is Next.js, so the numbers arrive as JSON in the __NEXT_DATA__ blob
// rather than in the markup. That is far more stable than scraping rendered text.
const NEXT_DATA = /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/;

async function scrape(url) {
	const res = await fetch(url, {
		headers: {
			// The default undici UA gets a 403 from their edge.
			'user-agent':
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
			accept: 'text/html'
		}
	});
	if (!res.ok) throw new Error(`${url} responded ${res.status}`);

	const match = NEXT_DATA.exec(await res.text());
	if (!match) throw new Error(`no __NEXT_DATA__ block on ${url}`);

	const data = JSON.parse(match[1]).props?.pageProps?.pageData;
	if (!data) throw new Error(`unexpected __NEXT_DATA__ shape on ${url}`);

	const raised = Number(data.donationsTotalAmount);
	if (!Number.isFinite(raised)) throw new Error(`no donation total on ${url}`);

	return {
		// Gift Aid is counted separately by CRUK and is not part of the headline.
		raised: Math.round(raised),
		giftAid: Math.round(Number(data.donationsGiftAidTotalAmount) || 0),
		donations: Number(data.donationsCount) || 0,
		target: Number(data.target) || null,
		checked: new Date().toISOString()
	};
}

const previous = JSON.parse(await readFile(OUT, 'utf8').catch(() => '{}'));
const next = { ...previous };

for (const [key, url] of Object.entries(SOURCES)) {
	next[key] = await scrape(url);
	console.log(`${key}: £${next[key].raised} of £${next[key].target ?? '?'}`);
}

// `checked` moves on every run, so compare only the figures to decide whether
// the workflow has anything worth committing.
const figures = (o) =>
	JSON.stringify(o, (k, v) => (k === 'checked' ? undefined : v));
const changed = figures(previous) !== figures(next);

await writeFile(OUT, JSON.stringify(next, null, '\t') + '\n');
console.log(changed ? 'changed' : 'unchanged');

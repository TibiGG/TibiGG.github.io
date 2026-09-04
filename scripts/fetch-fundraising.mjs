// Pulls the live totals off my giving pages and writes them to
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

// Keyed by the `feed` field on each fundraiser in src/lib/data/play.ts. The two
// charities run different fundraising platforms, so each source names the parser
// that understands its page as well as the URL.
const SOURCES = {
	'cancer-research-uk': {
		url: 'https://fundraise.cancerresearchuk.org/page/tibi-geo',
		parse: nextData
	},
	sands: {
		url: 'https://fundraising.sands.org.uk/fundraisers/tibigeo/run-50k-in-sept',
		parse: funraisin
	}
};

// CRUK's page is Next.js, so the numbers arrive as JSON in the __NEXT_DATA__ blob
// rather than in the markup. That is far more stable than scraping rendered text.
const NEXT_DATA = /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/;

function nextData(html, url) {
	const match = NEXT_DATA.exec(html);
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
		target: Number(data.target) || null
	};
}

// Sands runs on Funraisin, which server-renders the figures into the sidebar and
// ships no JSON blob to read them from. So this one really is text scraping, and
// it is anchored on the `iveRaised` and `myGoal` class names rather than on
// position, which is the most stable handle the markup offers. Every field is
// asserted below: a layout change should fail the run loudly rather than quietly
// write a zero over a real total.
const RAISED = /class="iveRaised[^"]*"[\s\S]*?<strong>\s*£([\d,]+(?:\.\d+)?)\s*<\/strong>/;
const GIFT_AID = /class="iveRaised[^"]*"[\s\S]*?\+\s*£([\d,]+(?:\.\d+)?)\s*GiftAid/;
const GOAL = /class="myGoal[^"]*"[\s\S]*?<strong>\s*£([\d,]+(?:\.\d+)?)\s*<\/strong>/;

const amount = (m) => (m ? Number(m[1].replace(/,/g, '')) : NaN);

function funraisin(html, url) {
	const raised = amount(RAISED.exec(html));
	if (!Number.isFinite(raised)) throw new Error(`no donation total on ${url}`);

	const target = amount(GOAL.exec(html));
	const giftAid = amount(GIFT_AID.exec(html));

	return {
		raised: Math.round(raised),
		giftAid: Number.isFinite(giftAid) ? Math.round(giftAid) : 0,
		// Funraisin does not print a donation count on the page, and inferring one
		// from the donor list would miss anonymous and offline gifts. Left null
		// rather than guessed; nothing on the site reads it.
		donations: null,
		target: Number.isFinite(target) ? Math.round(target) : null
	};
}

async function scrape({ url, parse }) {
	const res = await fetch(url, {
		headers: {
			// The default undici UA gets a 403 from their edge.
			'user-agent':
				'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
			accept: 'text/html'
		}
	});
	if (!res.ok) throw new Error(`${url} responded ${res.status}`);

	return { ...parse(await res.text(), url), checked: new Date().toISOString() };
}

const previous = JSON.parse(await readFile(OUT, 'utf8').catch(() => '{}'));
const next = { ...previous };

for (const [key, source] of Object.entries(SOURCES)) {
	next[key] = await scrape(source);
	console.log(`${key}: £${next[key].raised} of £${next[key].target ?? '?'}`);
}

// `checked` moves on every run, so compare only the figures to decide whether
// the workflow has anything worth committing.
const figures = (o) =>
	JSON.stringify(o, (k, v) => (k === 'checked' ? undefined : v));
const changed = figures(previous) !== figures(next);

await writeFile(OUT, JSON.stringify(next, null, '\t') + '\n');
console.log(changed ? 'changed' : 'unchanged');

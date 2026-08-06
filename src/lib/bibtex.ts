import type { Publication } from '$lib/data/publications';

const STOP = new Set(['a', 'an', 'the', 'on', 'of', 'for', 'to', 'in', 'and', 'towards']);

// Surname is the last whitespace-separated chunk; double-barrelled given names
// like "Tiberiu-Andrei" stay out of it.
function surname(author: string) {
	const parts = author.trim().split(/\s+/);
	return parts[parts.length - 1].replace(/[^A-Za-z]/g, '').toLowerCase();
}

function firstMeaningfulWord(title: string) {
	const word = title
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, ' ')
		.split(/\s+/)
		.find((w) => w.length > 2 && !STOP.has(w));
	return word ?? 'untitled';
}

export function citeKey(pub: Publication) {
	return pub.citeKey ?? `${surname(pub.authors[0])}${pub.year}${firstMeaningfulWord(pub.title)}`;
}

// Braces around the title preserve the capitalisation of GR(1), NeSy and friends,
// which BibTeX styles would otherwise lowercase.
export function bibtex(pub: Publication) {
	const kind = pub.kind ?? 'misc';
	const venueField =
		kind === 'inproceedings' ? 'booktitle' : kind === 'article' ? 'journal' : 'howpublished';

	const fields: [string, string][] = [
		['title', `{${pub.title}}`],
		['author', pub.authors.join(' and ')],
		[venueField, pub.venue],
		['year', String(pub.year)]
	];

	const url = pub.links?.find((l) => /arxiv|doi/i.test(l.label))?.url ?? pub.links?.[0]?.url;
	if (url) fields.push(['url', url]);
	if (pub.status !== 'published') fields.push(['note', `${pub.status}`]);

	const body = fields.map(([k, v]) => `  ${k.padEnd(12)} = {${v}}`).join(',\n');
	return `@${kind}{${citeKey(pub)},\n${body}\n}`;
}

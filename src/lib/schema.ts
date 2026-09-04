import { profile } from '$lib/data/profile';
import type { Publication } from '$lib/data/publications';
import type { Post } from '$lib/posts';

// JSON-LD builders. Kept out of the components so the markup stays readable and
// the shapes are checkable in one place.

export const person = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: profile.name,
	alternateName: profile.short,
	url: profile.site + '/',
	email: `mailto:${profile.email}`,
	jobTitle: 'PhD researcher',
	description: profile.blurb.replace(/\s+/g, ' ').trim(),
	address: { '@type': 'PostalAddress', addressLocality: 'London', addressCountry: 'GB' },
	affiliation: { '@type': 'CollegeOrUniversity', name: profile.affiliation },
	knowsAbout: [
		'Formal specification',
		'GR(1) synthesis',
		'Inductive logic programming',
		'Reinforcement learning',
		'Safe and trusted AI'
	],
	sameAs: Object.values(profile.links).filter(Boolean)
};

export function scholarlyArticle(pub: Publication) {
	return {
		'@context': 'https://schema.org',
		'@type': 'ScholarlyArticle',
		headline: pub.title,
		author: pub.authors.map((name) => ({ '@type': 'Person', name })),
		datePublished: String(pub.year),
		publisher: pub.venue,
		...(pub.abstract ? { abstract: pub.abstract.replace(/\s+/g, ' ').trim() } : {}),
		...(pub.links?.length ? { url: pub.links[0].url } : {})
	};
}

export function blogPosting(post: Pick<Post, 'title' | 'date' | 'summary' | 'slug'>) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.summary,
		datePublished: post.date,
		url: `${profile.site}/writing/${post.slug}/`,
		author: { '@type': 'Person', name: profile.name, url: profile.site + '/' }
	};
}

import type { Component } from 'svelte';

// Frontmatter every post in src/lib/posts/ is expected to carry.
export type PostMeta = {
	title: string;
	date: string; // ISO, used for sorting and display
	summary: string;
	tags?: string[];
	draft?: boolean;
};

export type Post = PostMeta & {
	slug: string;
	component: Component;
};

type Module = { metadata: PostMeta; default: Component };

// Eager, so the index page can show titles and dates without a second fetch.
// The site is small enough that bundling every post is cheaper than the round trip.
//
// The pattern is deliberately non-recursive: `*` does not cross a `/`, so
// anything in src/lib/posts/drafts/ is never compiled and never reaches the
// bundle. That matters, because `draft: true` below only filters at runtime —
// the file would still be readable in a public JS chunk. Unfinished writing
// belongs in drafts/; the frontmatter flag is the second line of defence, for
// something finished that you are holding back.
const modules = import.meta.glob<Module>('./posts/*.svx', { eager: true });

const all: Post[] = Object.entries(modules)
	.map(([path, mod]) => ({
		...mod.metadata,
		slug: path.split('/').pop()!.replace(/\.svx$/, ''),
		component: mod.default
	}))
	.sort((a, b) => b.date.localeCompare(a.date));

// Drafts stay out of the build entirely. Flip `draft: false` to publish one.
export const posts = all.filter((p) => !p.draft);

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});
}

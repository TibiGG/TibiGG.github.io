import { error } from '@sveltejs/kit';
import { posts } from '$lib/posts';

// The site is fully prerendered, so every post URL has to be declared up front.
export const entries = () => posts.map((p) => ({ slug: p.slug }));

export function load({ params }: { params: { slug: string } }) {
	const post = posts.find((p) => p.slug === params.slug);
	if (!post) error(404, `No post called "${params.slug}"`);

	// Only the serialisable half crosses the load boundary; the page component
	// looks the Svelte component itself up by slug.
	const { component: _component, ...meta } = post;
	return meta;
}

<script lang="ts">
	import { base } from '$app/paths';
	import { getPost, formatDate } from '$lib/posts';
	import { profile } from '$lib/data/profile';
	import { blogPosting } from '$lib/schema';
	import Seo from '$lib/Seo.svelte';

	let { data } = $props();

	// load() already 404s on an unknown slug, so this always resolves.
	const post = $derived(getPost(data.slug)!);
	const Body = $derived(post.component);
</script>

<Seo
	title="{data.title} · {profile.name}"
	description={data.summary}
	type="article"
	published={data.date}
	schema={blogPosting(data)}
/>

<article>
	<a class="back" href="{base}/writing/">← All writing</a>
	<p class="eyebrow">{formatDate(data.date)}</p>
	<h1>{data.title}</h1>
	{#if data.tags?.length}
		<div class="tags">
			{#each data.tags as t}<span class="tag">{t}</span>{/each}
		</div>
	{/if}

	<div class="prose">
		<Body />
	</div>
</article>

<style>
	article {
		max-width: 44rem;
	}

	.back {
		display: inline-block;
		font-family: var(--display);
		font-weight: 600;
		font-size: 0.88rem;
		color: var(--ink-soft);
		text-decoration: none;
		margin-bottom: 1.5rem;
	}

	.back:hover {
		color: var(--red);
	}

	h1 {
		font-size: clamp(1.9rem, 5vw, 2.8rem);
		margin: 0.3rem 0 0.9rem;
	}

	.tags {
		display: flex;
		gap: 0.4rem;
		flex-wrap: wrap;
		margin-bottom: 2rem;
	}

	/* Markdown comes out of mdsvex as bare tags, so the prose styles live here
	   rather than on classes the author would have to remember to write. */
	.prose :global(h2) {
		font-size: 1.45rem;
		margin: 2.5rem 0 0.8rem;
	}

	.prose :global(h3) {
		font-size: 1.15rem;
		margin: 2rem 0 0.6rem;
	}

	.prose :global(p) {
		margin: 0 0 1.15rem;
	}

	.prose :global(ul),
	.prose :global(ol) {
		margin: 0 0 1.15rem;
		padding-left: 1.3rem;
	}

	.prose :global(li) {
		margin-bottom: 0.4rem;
	}

	.prose :global(blockquote) {
		margin: 1.5rem 0;
		padding: 0.2rem 0 0.2rem 1.1rem;
		border-left: 3px solid var(--teal);
		color: var(--ink-soft);
		font-style: italic;
	}

	.prose :global(code) {
		font-family: var(--mono);
		font-size: 0.85em;
		padding: 0.12em 0.4em;
		border-radius: 5px;
		border: 1px solid var(--rule);
		background: var(--paper-2);
	}

	.prose :global(pre) {
		margin: 0 0 1.5rem;
		padding: 1rem 1.1rem;
		border-radius: 10px;
		border: 1px solid var(--rule);
		background: var(--paper-2);
		overflow-x: auto;
		font-size: 0.85rem;
		line-height: 1.6;
	}

	.prose :global(pre code) {
		padding: 0;
		border: 0;
		background: none;
		font-size: 1em;
	}

	.prose :global(img) {
		max-width: 100%;
		border-radius: var(--radius);
	}

	.prose :global(hr) {
		border: 0;
		border-top: 1px solid var(--rule);
		margin: 2.5rem 0;
	}
</style>

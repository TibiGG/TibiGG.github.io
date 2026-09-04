<script lang="ts">
	import { base } from '$app/paths';
	import { posts, formatDate } from '$lib/posts';
	import { writing } from '$lib/data/hackathons';
	import { profile } from '$lib/data/profile';
	import { blogPosting } from '$lib/schema';
	import Seo from '$lib/Seo.svelte';
</script>

<Seo
	title="Writing · {profile.name}"
	description="Posts and articles by {profile.name} on formal methods, hackathons and side projects."
	schema={posts.length ? posts.map(blogPosting) : undefined}
/>

<h1 class="centerline">Writing</h1>
<p class="lede">
	I sometimes like to share my thoughts on things, not necessarily directly connected to my research. I used to like LinkedIn as a blog, but no one really reads there anymore. You should find a (reasonably) curated list of articles below.
</p>

{#if posts.length}
	<ul class="posts">
		{#each posts as post}
			<li class="card tilt">
				<p class="eyebrow">{formatDate(post.date)}</p>
				<h2><a href="{base}/writing/{post.slug}/">{post.title}</a></h2>
				<p class="summary">{post.summary}</p>
				{#if post.tags?.length}
					<div class="tags">
						{#each post.tags as t}<span class="tag">{t}</span>{/each}
					</div>
				{/if}
			</li>
		{/each}
	</ul>
{:else}
	<p class="lede">Thinking of turning this page into a blog, but nothing's published here yet. I'll write something good in my own time.</p>
{/if}

<h2 class="centerline elsewhere">Elsewhere</h2>
<ul class="external">
	{#each writing as w}
		<li>
			<a href={w.url} target="_blank" rel="noopener noreferrer">{w.title}</a>
			<span class="tag">LinkedIn</span>
		</li>
	{/each}
</ul>

<style>
	h1 {
		font-size: clamp(2rem, 5vw, 3rem);
	}

	.lede {
		max-width: 40rem;
		color: var(--ink-soft);
		margin: 0 0 2.5rem;
		font-size: 1.05rem;
	}

	.posts {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 1.25rem;
	}

	.posts h2 {
		font-size: 1.4rem;
		margin: 0.3rem 0 0.5rem;
	}

	.posts h2 a {
		text-decoration: none;
	}

	.posts h2 a:hover {
		text-decoration: underline;
	}

	.summary {
		margin: 0 0 0.9rem;
		color: var(--ink-soft);
		max-width: 44rem;
	}

	.tags {
		display: flex;
		gap: 0.4rem;
		flex-wrap: wrap;
	}

	.empty {
		color: var(--ink-soft);
	}

	.elsewhere {
		margin-top: 3.5rem;
	}

	.external {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.external li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.85rem 0.25rem;
		border-bottom: 1px solid var(--rule);
	}

	.external a {
		font-family: var(--display);
		font-weight: 600;
		text-decoration: none;
	}

	.external a:hover {
		text-decoration: underline;
	}
</style>

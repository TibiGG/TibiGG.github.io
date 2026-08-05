<script lang="ts">
	import { publications } from '$lib/data/publications';
	import { profile } from '$lib/data/profile';

	const byYear = [...publications].sort((a, b) => b.year - a.year);
</script>

<svelte:head>
	<title>Research — {profile.name}</title>
	<meta name="description" content="Papers and academic work by {profile.name}." />
</svelte:head>

<h1 class="centerline">Research</h1>
<p class="lede">
	I work on formal specifications — specifically, what to do when one turns out to be unrealisable.
	Throwing it away is easy; finding the nearest thing that <em>does</em> work is the interesting part.
</p>

<ol class="pubs">
	{#each byYear as pub}
		<li class="card tilt">
			<div class="meta">
				<span class="year">{pub.year}</span>
				<span class="tag" class:pending={pub.status !== 'published'}>{pub.status}</span>
			</div>
			<h2>{pub.title}</h2>
			<p class="authors">
				{#each pub.authors as a, i}<span class:me={a === profile.name}>{a}</span>{#if i < pub.authors.length - 1}, {/if}{/each}
			</p>
			<p class="venue">{pub.venue}</p>
			{#if pub.abstract}
				<p class="abstract">{pub.abstract}</p>
			{/if}
			{#if pub.links?.length}
				<div class="links">
					{#each pub.links as l}
						<a class="btn ghost" href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>
					{/each}
				</div>
			{/if}
		</li>
	{/each}
</ol>

<style>
	h1 {
		font-size: clamp(2rem, 5vw, 3rem);
	}

	.lede {
		max-width: 42rem;
		color: var(--ink-soft);
		margin: 0 0 3rem;
		font-size: 1.05rem;
	}

	.pubs {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 1.25rem;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 0.6rem;
	}

	.year {
		font-family: var(--mono);
		font-size: 0.8rem;
		color: var(--ink-soft);
	}

	.tag.pending {
		border-color: var(--gold);
		color: var(--ink);
		background: color-mix(in srgb, var(--gold) 22%, transparent);
	}

	h2 {
		font-size: 1.35rem;
		margin-bottom: 0.5rem;
	}

	.authors {
		margin: 0 0 0.2rem;
		font-size: 0.92rem;
		color: var(--ink-soft);
	}

	.authors .me {
		color: var(--ink);
		font-weight: 600;
		text-decoration: underline;
		text-decoration-color: var(--red);
		text-underline-offset: 3px;
	}

	.venue {
		margin: 0 0 0.9rem;
		font-family: var(--mono);
		font-size: 0.82rem;
		color: var(--teal);
	}

	.abstract {
		margin: 0 0 1.1rem;
		color: var(--ink-soft);
		font-size: 0.95rem;
		max-width: 44rem;
	}

	.links {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
	}
</style>

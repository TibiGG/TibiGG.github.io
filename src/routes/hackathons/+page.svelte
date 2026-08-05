<script lang="ts">
	import { hackathons } from '$lib/data/hackathons';
	import { profile } from '$lib/data/profile';

	const sorted = [...hackathons].sort((a, b) => b.date.localeCompare(a.date));

	const year = (iso: string) => iso.slice(0, 4);
</script>

<svelte:head>
	<title>Hackathons — {profile.name}</title>
	<meta
		name="description"
		content="{hackathons.length} hackathon and robotics competition wins, with write-ups."
	/>
</svelte:head>

<h1 class="centerline">Hackathons &amp; competitions</h1>
<p class="lede">
	{sorted.length} weekends that ended in a trophy. Some of them have write-ups; the rest exist mostly
	as blurry photos and a vague memory of the 4am pivot.
</p>

<div class="grid">
	{#each sorted as h}
		<article class="card tilt">
			<header>
				<span class="year">{year(h.date)}</span>
				<h2>{h.project}</h2>
				<p class="event">{h.event}</p>
				<p class="prize">🏆 {h.prize}</p>
			</header>

			<p class="tagline">{h.tagline}</p>

			{#if h.challenge}
				<p class="challenge"><strong>The brief:</strong> {h.challenge}</p>
			{/if}

			<div class="tags">
				{#each h.stack as s}<span class="tag">{s}</span>{/each}
			</div>

			<div class="links">
				{#if h.blogPost}
					<a class="btn" href={h.blogPost} target="_blank" rel="noopener noreferrer">
						Read the write-up
					</a>
				{/if}
				{#each h.links as l}
					<a class="btn ghost" href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>
				{/each}
			</div>
		</article>
	{/each}
</div>

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

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		gap: 1.25rem;
		align-items: start;
	}

	.year {
		font-family: var(--mono);
		font-size: 0.78rem;
		color: var(--ink-soft);
	}

	h2 {
		font-size: 1.45rem;
		margin: 0.2rem 0 0.35rem;
	}

	.event {
		margin: 0;
		font-family: var(--display);
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--teal);
	}

	.prize {
		margin: 0.15rem 0 0.9rem;
		font-size: 0.88rem;
		color: var(--ink-soft);
	}

	.tagline {
		margin: 0 0 0.75rem;
	}

	.challenge {
		margin: 0 0 1rem;
		font-size: 0.88rem;
		color: var(--ink-soft);
		padding-left: 0.8rem;
		border-left: 2px solid var(--rule);
	}

	.tags {
		display: flex;
		gap: 0.35rem;
		flex-wrap: wrap;
		margin-bottom: 1.1rem;
	}

	.links {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
</style>

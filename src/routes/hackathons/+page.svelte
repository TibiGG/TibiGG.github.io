<script lang="ts">
	import { hackathons, wins } from '$lib/data/hackathons';
	import { profile } from '$lib/data/profile';
	import Seo from '$lib/Seo.svelte';

	const sorted = [...hackathons].sort((a, b) => b.date.localeCompare(a.date));

	const year = (iso: string) => iso.slice(0, 4);
</script>

<Seo
	title="Hackathons · {profile.name}"
	description="{wins.length} hackathon and robotics competition wins by {profile.name}, with write-ups."
/>

<h1 class="centerline">Hackathons &amp; competitions</h1>
<p class="lede">
	Ah, hackathons. A weekend where I get to think outside of the box on a problem I never tackled before.
	I love them, I need them, and I'm good at them too. I've had {wins.length} weekends that earned me and 
	my teams at least one prize, and a few that ended in something better. Most of them have
	a written story. If they don't yet, I'll remember it, and eventually share it.
</p>

<div class="grid">
	{#each sorted as h}
		<article class="card tilt">
			<header>
				<span class="year">{year(h.date)}</span>
				<h2>{h.project}</h2>
				<p class="event">{h.event}</p>
				{#if h.prize}
					<p class="prize">🏆 {h.prize}</p>
				{/if}
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

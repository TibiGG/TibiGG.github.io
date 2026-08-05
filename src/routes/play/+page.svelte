<script lang="ts">
	import { games, wingChun } from '$lib/data/play';
	import { profile } from '$lib/data/profile';
</script>

<svelte:head>
	<title>Play — {profile.name}</title>
	<meta name="description" content="Board games and Wing Chun kung fu." />
</svelte:head>

<h1 class="centerline">Play</h1>
<p class="lede">
	Two hobbies, one shared idea: a small ruleset, applied under pressure, gets interesting fast.
</p>

<section>
	<h2 class="centerline">On the table</h2>
	<div class="shelf">
		{#each games as g}
			<article class="game card tilt">
				<span class="weight {g.weight}">{g.weight}</span>
				<h3>{g.title}</h3>
				<p>{g.why}</p>
			</article>
		{/each}
	</div>
</section>

<section>
	<h2 class="centerline">Wing Chun</h2>
	<p class="blurb">{wingChun.blurb}</p>
	<div class="principles">
		{#each wingChun.principles as p, i}
			<article class="principle card">
				<span class="num">{String(i + 1).padStart(2, '0')}</span>
				<h3>{p.name}</h3>
				<p>{p.gloss}</p>
			</article>
		{/each}
	</div>
</section>

<style>
	h1 {
		font-size: clamp(2rem, 5vw, 3rem);
	}

	.lede {
		max-width: 40rem;
		color: var(--ink-soft);
		margin: 0 0 3.5rem;
		font-size: 1.05rem;
	}

	section {
		margin-bottom: 4rem;
	}

	.shelf {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
		gap: 1rem;
	}

	.game h3 {
		font-size: 1.15rem;
		margin: 0.5rem 0 0.4rem;
	}

	.game p {
		margin: 0;
		font-size: 0.9rem;
		color: var(--ink-soft);
	}

	.weight {
		font-family: var(--mono);
		font-size: 0.68rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		padding: 0.12rem 0.5rem;
		border-radius: 999px;
	}

	.weight.light {
		background: color-mix(in srgb, var(--teal) 20%, transparent);
		color: var(--teal);
	}
	.weight.medium {
		background: color-mix(in srgb, var(--gold) 28%, transparent);
		color: var(--ink);
	}
	.weight.heavy {
		background: color-mix(in srgb, var(--red) 20%, transparent);
		color: var(--red);
	}

	.blurb {
		max-width: 40rem;
		margin: 0 0 2rem;
		color: var(--ink-soft);
	}

	.principles {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		gap: 1rem;
	}

	.principle {
		/* The centerline runs down each card. */
		border-top: 3px solid var(--red);
	}

	.num {
		font-family: var(--mono);
		font-size: 0.75rem;
		color: var(--ink-soft);
	}

	.principle h3 {
		font-size: 1.2rem;
		margin: 0.3rem 0 0.5rem;
	}

	.principle p {
		margin: 0;
		font-size: 0.92rem;
		color: var(--ink-soft);
	}
</style>

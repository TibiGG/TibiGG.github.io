<script lang="ts">
	import { boardGames, wingChun, training, liveFundraiser } from '$lib/data/play';
	import { profile } from '$lib/data/profile';
	import Seo from '$lib/Seo.svelte';

	const money = (n: number) => '£' + n.toLocaleString('en-GB');
	const pct = (raised: number, target: number) =>
		Math.max(0, Math.min(100, Math.round((raised / target) * 100)));

	// The running total leads the tab title, since that is the part of it a
	// browser still shows once the tab is narrow.
	const tally = liveFundraiser
		? `${money(liveFundraiser.raised)}/${money(liveFundraiser.target)} · `
		: '';

	const stamp = (iso: string) =>
		new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
</script>

<Seo
	title="{tally}On the Side · {profile.name}"
	description="Wing Chun, board games, and charity fundraisers run on daily training, by {profile.name}."
/>

<h1 class="centerline">On the Side</h1>
<p class="lede">The parts that make me complete.</p>

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

<section>
	<h2 class="centerline">On the table</h2>
	{#if boardGames.blurb.trim()}
		<p class="blurb">{boardGames.blurb}</p>
	{/if}
	<div class="shelf">
		{#each boardGames.games as g}
			<article class="game card tilt">
				<span class="weight {g.weight}">{g.weight}</span>
				<h3>{g.title}</h3>
				<p>{g.why}</p>
			</article>
		{/each}
	</div>
</section>

<section>
	<h2 class="centerline">Training, and what it was for</h2>
	<p class="blurb">{training.blurb}</p>
	<div class="fundraisers">
		{#each training.fundraisers as f}
			<article class="card fundraiser">
				<p class="eyebrow">
					{f.cause}
					{#if f.ongoing}<span class="tag live">in progress</span>{/if}
				</p>
				<p class="amount">
					{money(f.raised)}<span class="of">/{money(f.target)}</span>
					<span class="amount-note">{f.ongoing ? 'raised so far' : 'raised'}</span>
				</p>
				<div
					class="meter"
					role="progressbar"
					aria-valuenow={pct(f.raised, f.target)}
					aria-valuemin="0"
					aria-valuemax="100"
					aria-label="{f.cause}: {money(f.raised)} of {money(f.target)}"
				>
					<span style="width: {pct(f.raised, f.target)}%"></span>
				</div>
				<p class="feat">
					{f.feat}
					{#if f.checked}<span class="checked">· total checked {stamp(f.checked)}</span>{/if}
				</p>
				{#if f.url}
					<a class="btn" href={f.url} target="_blank" rel="noopener noreferrer">
						{f.ongoing ? 'Donate' : 'The page'}
					</a>
				{/if}
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
		background: color-mix(in srgb, var(--ink-soft) 18%, transparent);
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

	/* Two cards, wider than the game tiles: the money is the headline, the
	   exercise is the small print under it. */
	.fundraisers {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		gap: 1rem;
	}

	.fundraiser {
		border-left: 4px solid var(--red);
	}

	.amount {
		font-family: var(--display);
		font-weight: 700;
		font-size: 2.2rem;
		line-height: 1.1;
		margin: 0.5rem 0 0.35rem;
		color: var(--red);
	}

	/* The target rides along with the total, a size down: XX/1000. */
	.of {
		color: var(--ink-soft);
		font-size: 0.65em;
	}

	.meter {
		height: 6px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--ink-soft) 22%, transparent);
		overflow: hidden;
		margin: 0 0 0.9rem;
	}

	.meter span {
		display: block;
		height: 100%;
		background: var(--red);
		border-radius: inherit;
	}

	.checked {
		font-family: var(--mono);
		font-size: 0.75rem;
		opacity: 0.75;
	}

	.amount-note {
		font-family: var(--body);
		font-weight: 400;
		font-size: 0.85rem;
		color: var(--ink-soft);
		margin-left: 0.35rem;
	}

	.feat {
		margin: 0 0 1rem;
		color: var(--ink-soft);
		font-size: 0.95rem;
	}

	.tag.live {
		margin-left: 0.4rem;
		border-color: var(--red);
		color: var(--red);
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

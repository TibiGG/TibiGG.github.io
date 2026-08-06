<script lang="ts">
	import { publications, thesis, type Publication } from '$lib/data/publications';
	import { presentations, peerReview, outreach } from '$lib/data/service';
	import { profile } from '$lib/data/profile';
	import { bibtex, citeKey } from '$lib/bibtex';
	import { scholarlyArticle } from '$lib/schema';
	import Seo from '$lib/Seo.svelte';

	const byYear = [...publications].sort((a, b) => b.year - a.year);

	// Which paper's BibTeX is open, by cite key. Only one at a time.
	let open = $state<string | null>(null);
	let copied = $state<string | null>(null);

	function toggle(pub: Publication) {
		const key = citeKey(pub);
		open = open === key ? null : key;
	}

	async function copy(pub: Publication) {
		const key = citeKey(pub);
		try {
			await navigator.clipboard.writeText(bibtex(pub));
			copied = key;
			setTimeout(() => (copied = copied === key ? null : copied), 1800);
		} catch {
			// Clipboard blocked, so the entry is on screen to select by hand.
			open = key;
		}
	}

	const newestFirst = <T extends { date: string }>(xs: T[]) =>
		[...xs].sort((a, b) => b.date.localeCompare(a.date));

	const talksByDate = newestFirst(presentations);
	const outreachByDate = newestFirst(outreach);
	// Most recently reviewed for, first.
	const reviewing = [...peerReview].sort((a, b) => Math.max(...b.years) - Math.max(...a.years));

	const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const monthYear = (iso: string) => {
		const [y, m] = iso.split('-');
		return `${MONTHS[Number(m) - 1]} ${y}`;
	};
</script>

<Seo
	title="Research · {profile.name}"
	description="Papers, PhD thesis and talks by {profile.name}: repairing GR(1) specifications when the environment stops behaving as assumed."
	schema={publications.map(scholarlyArticle)}
/>

<h1 class="centerline">Research</h1>
<p class="lede">
	I work on formal specifications, specifically what to do when one turns out to be unrealisable.
	Throwing it away is easy; finding the nearest thing that <em>does</em> work is the interesting part.
</p>

<section class="thesis card">
	<p class="eyebrow">{thesis.programme} · {thesis.institution} · since {thesis.started}</p>
	<h2>{thesis.title}</h2>
	{#if thesis.summary}
		<p class="summary">{thesis.summary}</p>
	{/if}
	<p class="supervisors">
		Supervised by {thesis.supervisors.join(' and ')}
	</p>
</section>

<h2 class="centerline">Papers</h2>
<ol class="pubs">
	{#each byYear as pub}
		<li class="card tilt">
			<div class="meta">
				<span class="year">{pub.year}</span>
				<span class="tag" class:pending={pub.status !== 'published'}>{pub.status}</span>
			</div>
			<h3>{pub.title}</h3>
			<p class="authors">
				{#each pub.authors as a, i}<span class:me={a === profile.name}>{a}</span>{#if i < pub.authors.length - 1}, {/if}{/each}
			</p>
			<p class="venue">{pub.venue}</p>
			{#if pub.abstract}
				<p class="abstract">{pub.abstract}</p>
			{/if}
			<div class="links">
				{#each pub.links ?? [] as l}
					<a class="btn ghost" href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a>
				{/each}
				<button class="btn ghost" onclick={() => copy(pub)}>
					{copied === citeKey(pub) ? 'Copied ✓' : 'Copy BibTeX'}
				</button>
				<button
					class="linky"
					onclick={() => toggle(pub)}
					aria-expanded={open === citeKey(pub)}
					aria-controls="bib-{citeKey(pub)}"
				>
					{open === citeKey(pub) ? 'Hide' : 'Show'} entry
				</button>
			</div>
			{#if open === citeKey(pub)}
				<pre id="bib-{citeKey(pub)}">{bibtex(pub)}</pre>
			{/if}
		</li>
	{/each}
</ol>

{#if talksByDate.length}
	<h2 class="centerline sub">Presentations</h2>
	<ul class="rows">
		{#each talksByDate as t}
			<li>
				<span class="when">{monthYear(t.date)}</span>
				<div>
					<h3>
						{#if t.url}
							<a href={t.url} target="_blank" rel="noopener noreferrer">{t.title}</a>
						{:else}
							{t.title}
						{/if}
					</h3>
					<p class="org">
						{t.event} · {t.place}{#if t.kind && t.kind !== 'talk'}<span class="tag kind">{t.kind}</span>{/if}
					</p>
				</div>
			</li>
		{/each}
	</ul>
{/if}

{#if reviewing.length}
	<h2 class="centerline sub">Peer review</h2>
	<ul class="rows">
		{#each reviewing as r}
			<li>
				<span class="when">{r.years.join(', ')}</span>
				<div>
					<h3>
						{#if r.url}
							<a href={r.url} target="_blank" rel="noopener noreferrer">{r.venue}</a>
						{:else}
							{r.venue}
						{/if}
					</h3>
					<p class="org">
						{r.role}{#if r.type} · {r.type}{/if}
					</p>
				</div>
			</li>
		{/each}
	</ul>
{/if}

{#if outreachByDate.length}
	<h2 class="centerline sub">Public engagement</h2>
	<div class="outreach">
		{#each outreachByDate as o}
			<article class="card tilt">
				<p class="eyebrow">{monthYear(o.date)}{#if o.kind} · {o.kind}{/if}</p>
				<h3>
					{#if o.url}
						<a href={o.url} target="_blank" rel="noopener noreferrer">{o.title}</a>
					{:else}
						{o.title}
					{/if}
				</h3>
				<p class="org">{o.audience}{#if o.place} · {o.place}{/if}</p>
				{#if o.blurb}
					<p class="blurb">{o.blurb}</p>
				{/if}
			</article>
		{/each}
	</div>
{/if}

<style>
	h1 {
		font-size: clamp(2rem, 5vw, 3rem);
	}

	.lede {
		max-width: 42rem;
		color: var(--ink-soft);
		margin: 0 0 2.5rem;
		font-size: 1.05rem;
	}

	.thesis {
		margin-bottom: 3.5rem;
		border-left: 4px solid var(--teal);
	}

	.thesis h2 {
		font-size: 1.5rem;
		margin: 0.35rem 0 0.8rem;
		max-width: 40rem;
	}

	.summary {
		margin: 0 0 1rem;
		color: var(--ink-soft);
		max-width: 44rem;
	}

	.supervisors {
		margin: 0;
		font-family: var(--mono);
		font-size: 0.8rem;
		color: var(--teal);
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
		border-color: var(--maroon);
		color: var(--maroon);
		background: color-mix(in srgb, var(--maroon) 12%, transparent);
	}

	.pubs h3 {
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
		align-items: center;
	}

	/* A text button for the disclosure, so it doesn't compete with the real links. */
	.linky {
		border: 0;
		background: none;
		padding: 0;
		cursor: pointer;
		font-family: var(--display);
		font-weight: 600;
		font-size: 0.85rem;
		color: var(--ink-soft);
		text-decoration: underline;
		text-decoration-color: var(--rule);
		text-underline-offset: 3px;
	}

	.linky:hover {
		color: var(--red);
	}

	pre {
		margin: 1rem 0 0;
		padding: 1rem;
		border-radius: 10px;
		border: 1px solid var(--rule);
		background: var(--paper-2);
		color: var(--ink-soft);
		font-family: var(--mono);
		font-size: 0.78rem;
		line-height: 1.55;
		overflow-x: auto;
	}

	.sub {
		margin-top: 3.5rem;
	}

	/* Presentations and peer review are both a date column beside a two-line
	   entry, so they share one list treatment. */
	.rows {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.rows li {
		display: grid;
		grid-template-columns: 8rem 1fr;
		gap: 1rem;
		padding: 1rem 0.25rem;
		border-bottom: 1px solid var(--rule);
	}

	.rows h3 {
		font-size: 1.05rem;
		margin: 0 0 0.15rem;
	}

	.rows h3 a {
		text-decoration: none;
	}

	.rows h3 a:hover {
		text-decoration: underline;
	}

	.tag.kind {
		margin-left: 0.5rem;
	}

	.outreach {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		gap: 1rem;
	}

	.outreach h3 {
		font-size: 1.15rem;
		margin: 0.3rem 0 0.15rem;
	}

	.outreach .blurb {
		margin: 0.6rem 0 0;
		font-size: 0.92rem;
		color: var(--ink-soft);
	}

	.when {
		font-family: var(--mono);
		font-size: 0.82rem;
		color: var(--red);
	}

	.org {
		margin: 0;
		font-size: 0.92rem;
		color: var(--ink-soft);
	}

	@media (max-width: 720px) {
		.rows li {
			grid-template-columns: 1fr;
			gap: 0.3rem;
		}
	}
</style>

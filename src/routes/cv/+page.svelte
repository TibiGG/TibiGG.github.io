<script lang="ts">
	import { base } from '$app/paths';
	import { profile } from '$lib/data/profile';
	import { roles, education, skills } from '$lib/data/experience';
	import { publications } from '$lib/data/publications';
	import { wins } from '$lib/data/hackathons';
	import { presentations, peerReview, outreach } from '$lib/data/service';
	import { person } from '$lib/schema';
	import Seo from '$lib/Seo.svelte';

	const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	function when(ym: string) {
		if (ym === 'present') return 'present';
		const [y, m] = ym.split('-');
		return `${MONTHS[Number(m) - 1]} ${y}`;
	}

	// The CV is the same data as the rest of the site, laid out for one sheet of
	// paper, so it can never drift out of date the way a checked-in PDF does.
	const papers = [...publications].sort((a, b) => b.year - a.year);
	// Only entries that actually placed belong under "Awards".
	const awards = [...wins].sort((a, b) => b.date.localeCompare(a.date));

	const newestFirst = <T extends { date: string }>(xs: T[]) =>
		[...xs].sort((a, b) => b.date.localeCompare(a.date));

	const talks = newestFirst(presentations);
	const engagement = newestFirst(outreach);
	const reviewing = [...peerReview].sort((a, b) => Math.max(...b.years) - Math.max(...a.years));
</script>

<Seo
	title="CV · {profile.name}"
	description="Curriculum vitae of {profile.name}: PhD research, experience, publications and awards."
	schema={person}
/>

<div class="actions">
	<button class="btn" onclick={() => window.print()}>Print / save as PDF</button>
	{#if profile.cvPdf}
		<a class="btn ghost" href="{base}{profile.cvPdf}" download>Download the PDF</a>
	{/if}
	<a class="btn ghost" href="{base}/contact/">Get in touch</a>
</div>

<article class="cv">
	<header>
		<h1>{profile.name}</h1>
		<p class="roles">{profile.roles.join(' · ')}</p>
		<p class="contact">
			<a href="mailto:{profile.email}">{profile.email}</a>
			<span>·</span>
			<span>{profile.location}</span>
			<span>·</span>
			<a href={profile.site}>{profile.site.replace('https://', '')}</a>
			<span>·</span>
			<a href={profile.links.github}>github.com/TibiIC</a>
			<span>·</span>
			<a href={profile.links.linkedin}>linkedin.com/in/tibigeo</a>
		</p>
	</header>

	<section>
		<h2>Education</h2>
		{#each education as e}
			<div class="entry">
				<p class="when">{when(e.start)} – {when(e.end)}</p>
				<div>
					<h3>{e.degree}</h3>
					<p class="org">{e.org}</p>
					<p class="detail"><em>Thesis:</em> {e.thesis}</p>
				</div>
			</div>
		{/each}
	</section>

	<section>
		<h2>Experience</h2>
		{#each roles as r}
			<div class="entry">
				<p class="when">{when(r.start)} – {when(r.end)}</p>
				<div>
					<h3>{r.title}</h3>
					<p class="org">{r.org}</p>
					<p class="detail">{r.skills.join(' · ')}</p>
				</div>
			</div>
		{/each}
	</section>

	<section>
		<h2>Publications</h2>
		{#each papers as p}
			<div class="entry">
				<p class="when">{p.year}</p>
				<div>
					<h3>{p.title}</h3>
					<p class="org">{p.authors.join(', ')}</p>
					<p class="detail">
						{p.venue}{#if p.status !== 'published'} · <em>{p.status}</em>{/if}
					</p>
				</div>
			</div>
		{/each}
	</section>

	{#if talks.length}
		<section>
			<h2>Presentations</h2>
			{#each talks as t}
				<div class="entry">
					<p class="when">{when(t.date.slice(0, 7))}</p>
					<div>
						<h3>{t.title}</h3>
						<p class="org">{t.event} · {t.place}</p>
						{#if t.kind && t.kind !== 'talk'}<p class="detail">{t.kind}</p>{/if}
					</div>
				</div>
			{/each}
		</section>
	{/if}

	{#if reviewing.length}
		<section>
			<h2>Peer review</h2>
			{#each reviewing as r}
				<div class="entry">
					<p class="when">{r.years.join(', ')}</p>
					<div>
						<h3>{r.venue}</h3>
						<p class="org">{r.role}{#if r.type} · {r.type}{/if}</p>
					</div>
				</div>
			{/each}
		</section>
	{/if}

	{#if engagement.length}
		<section>
			<h2>Public engagement</h2>
			{#each engagement as o}
				<div class="entry">
					<p class="when">{when(o.date.slice(0, 7))}</p>
					<div>
						<h3>{o.title}</h3>
						<p class="org">{o.audience}{#if o.place} · {o.place}{/if}</p>
						{#if o.blurb}<p class="detail">{o.blurb}</p>{/if}
					</div>
				</div>
			{/each}
		</section>
	{/if}

	<section>
		<h2>Awards</h2>
		{#each awards as a}
			<div class="entry">
				<p class="when">{a.date.slice(0, 4)}</p>
				<div>
					<h3>{a.prize ?? a.project}</h3>
					<p class="org">{a.event} · {a.project}</p>
				</div>
			</div>
		{/each}
	</section>

	<section>
		<h2>Skills</h2>
		{#each Object.entries(skills) as [level, list]}
			<div class="entry">
				<p class="when">{level}</p>
				<div><p class="detail wide">{list.join(' · ')}</p></div>
			</div>
		{/each}
	</section>
</article>

<style>
	.actions {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
		margin-bottom: 2.5rem;
	}

	.cv {
		max-width: 48rem;
	}

	header {
		border-bottom: 2px solid var(--ink);
		padding-bottom: 1.2rem;
		margin-bottom: 1.5rem;
	}

	h1 {
		font-size: clamp(1.9rem, 5vw, 2.6rem);
		margin: 0 0 0.35rem;
	}

	.roles {
		font-family: var(--display);
		font-weight: 600;
		color: var(--teal);
		margin: 0 0 0.6rem;
	}

	.contact {
		margin: 0;
		font-size: 0.85rem;
		color: var(--ink-soft);
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	section {
		margin-bottom: 2rem;
		break-inside: auto;
	}

	h2 {
		font-size: 0.82rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--red);
		margin: 0 0 0.9rem;
		padding-bottom: 0.35rem;
		border-bottom: 1px solid var(--rule);
	}

	.entry {
		display: grid;
		grid-template-columns: 10rem 1fr;
		gap: 1rem;
		margin-bottom: 1rem;
		break-inside: avoid;
	}

	.entry h3 {
		font-size: 1rem;
		margin: 0 0 0.1rem;
	}

	.when {
		font-family: var(--mono);
		font-size: 0.78rem;
		color: var(--ink-soft);
		margin: 0.15rem 0 0;
	}

	.org {
		margin: 0 0 0.15rem;
		font-size: 0.9rem;
		color: var(--ink-soft);
	}

	.detail {
		margin: 0;
		font-size: 0.85rem;
		color: var(--ink-soft);
	}

	.detail.wide {
		font-size: 0.88rem;
	}

	@media (max-width: 640px) {
		.entry {
			grid-template-columns: 1fr;
			gap: 0.2rem;
		}
	}

	/* On paper: no buttons, tighter type, and entries that don't split across
	   a page break. The global print rules in app.css drop the site chrome. */
	@media print {
		.actions {
			display: none;
		}

		.cv {
			max-width: none;
		}

		.entry {
			grid-template-columns: 8.5rem 1fr;
			margin-bottom: 0.7rem;
		}

		h1 {
			font-size: 1.9rem;
		}

		section {
			margin-bottom: 1.3rem;
		}
	}
</style>

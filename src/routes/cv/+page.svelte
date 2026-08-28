<script lang="ts">
	import { base } from '$app/paths';
	import { profile } from '$lib/data/profile';
	import {
		academicRoles,
		industryRoles,
		education,
		funding,
		supervision,
		skills,
		skillsDraft
	} from '$lib/data/experience';
	import { publications } from '$lib/data/publications';
	import { cvCompetitions } from '$lib/data/hackathons';
	import { presentations, peerReview, outreach } from '$lib/data/service';
	import { person } from '$lib/schema';
	import { academicDate } from '$lib/date';
	import Seo from '$lib/Seo.svelte';

	const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	function when(ym: string) {
		if (ym === 'present') return 'present';
		const [y, m] = ym.split('-');
		return `${MONTHS[Number(m) - 1]} ${y}`;
	}

	// Funding dates are as precise as the award actually is, so a bare year is a
	// legitimate value here where `when` would read it as a missing month.
	function awardDate(d: string) {
		return d.includes('-') || d === 'present' ? when(d) : d;
	}

	// The CV is the same data as the rest of the site, laid out for one sheet of
	// paper, so it can never drift out of date the way a checked-in PDF does.
	const papers = [...publications].sort((a, b) => b.year - a.year);

	// 'https://github.com/TibiIC' -> 'github.com/TibiIC'. Printed on paper, so the
	// scheme and any trailing slash are noise.
	const short = (url: string) =>
		url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

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
	<!-- /cv.pdf is printed from this page: at build time in production, on request
	     by a dev-server middleware in development. Either way the file is real, so
	     the button works everywhere. -->
	{#if profile.cvPdf}
		<a class="btn ghost" href="{base}{profile.cvPdf}" download>Download the PDF</a>
	{/if}
	<a class="btn ghost" href="{base}/contact/">Get in touch</a>
</div>

<article class="cv">
	<header>
		<h1>{profile.name}</h1>
		<p class="contact">
			<a href="mailto:{profile.email}">{profile.email}</a>
			<span>·</span>
			<span>{profile.location}</span>
			<span>·</span>
			<a href={profile.site}>{profile.site.replace('https://', '')}</a>
			<span>·</span>
			<!-- Labels are derived from the URLs rather than typed out, so a changed
			     handle can never leave the old one printed next to the new link. -->
			<a href={profile.links.github}>{short(profile.links.github)}</a>
			<span>·</span>
			<a href={profile.links.linkedin}>{short(profile.links.linkedin)}</a>
			{#if profile.links.scholar}
				<span>·</span>
				<!-- An academic CV is read alongside a citation record; the panel will
				     look for this whether or not it is printed. -->
				<a href={profile.links.scholar}>Google Scholar</a>
			{/if}
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
					<p class="detail">
						<em>Thesis:</em>
						{#if e.thesisUrl}<a href={e.thesisUrl} target="_blank" rel="noopener noreferrer"
								>{e.thesis}</a
							>{:else}{e.thesis}{/if}
					</p>
					{#if e.supervisors?.length}
						<p class="detail">
							<em>{e.supervisors.length === 1 ? 'Supervisor:' : 'Supervisors:'}</em>
							{e.supervisors.join(', ')}
						</p>
					{/if}
				</div>
			</div>
		{/each}
	</section>

	{#each [{ heading: 'Academic experience', list: academicRoles }, { heading: 'Industry experience', list: industryRoles }] as group}
		<section>
			<h2>{group.heading}</h2>
			{#each group.list as r}
				<div class="entry">
					<p class="when">{when(r.start)} – {when(r.end)}</p>
					<div>
						<h3>{r.title}</h3>
						<p class="org">{r.org}</p>
						{#if r.detail}<p class="detail">{r.detail}</p>{/if}
						{#if r.courses?.length}
							<p class="courses-label">Courses</p>
							<ul class="courses">
								{#each r.courses as c}<li>{c}</li>{/each}
							</ul>
						{/if}
						<p class="detail">{r.skills.join(' · ')}</p>
					</div>
				</div>
			{/each}
		</section>
	{/each}

	<section>
		<h2>Publications</h2>
		{#each papers as p}
			<div class="entry">
				<p class="when">{p.year}</p>
				<div>
					<h3>{p.title}</h3>
					<p class="org">{p.authors.join(', ')}</p>
					<p class="detail">
						{p.venue}{#if p.status !== 'published'}{' · '}<em>{p.status}</em>{/if}
					</p>
				</div>
			</div>
		{/each}
	</section>

	{#if funding.length}
		<section>
			<h2>Funding</h2>
			{#each funding as f}
				<div class="entry">
					<p class="when">{awardDate(f.start)} – {awardDate(f.end)}</p>
					<div>
						<h3>
							{#if f.url}<a href={f.url} target="_blank" rel="noopener noreferrer">{f.title}</a
								>{:else}{f.title}{/if}
						</h3>
						<p class="org">{f.funder}{#if f.reference}{' · '}{f.reference}{/if}</p>
						<!-- Role and share on one line, because the ad asks for both and a
						     panel reads them together: what you were on the project, and
						     which part of the money was actually yours. -->
						<p class="detail">
							<em>Role:</em>
							{f.role}{#if f.share}{' · '}<em>Awarded:</em> {f.share}{/if}
						</p>
					</div>
				</div>
			{/each}
		</section>
	{/if}

	{#if supervision.length}
		<section>
			<h2>Supervision</h2>
			{#each supervision as s}
				<div class="entry">
					<p class="when">{s.year}</p>
					<div>
						<h3>{s.project}</h3>
						<p class="org">{s.level} · {s.org}</p>
						{#if s.role}<p class="detail">{s.role}</p>{/if}
						{#if s.outcome}<p class="detail">{s.outcome}</p>{/if}
					</div>
				</div>
			{/each}
		</section>
	{/if}

	{#if talks.length}
		<section>
			<h2>Presentations</h2>
			{#each talks as t}
				<div class="entry">
					<p class="when">{academicDate(t.date)}</p>
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
						<p class="org">{r.role}{#if r.type}{' · '}{r.type}{/if}</p>
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
					<p class="when">{academicDate(o.date)}</p>
					<div>
						<h3>{o.title}</h3>
						<!-- A named exhibition leads; the audience only carries the line
						     when there is no event to name. -->
						<p class="org">
							{[o.event ?? o.audience, o.place].filter(Boolean).join(' · ')}
						</p>
						{#if o.blurb}<p class="detail">{o.blurb}</p>{/if}
					</div>
				</div>
			{/each}
		</section>
	{/if}

	<section>
		<h2>Competitions &amp; hackathons</h2>
		{#each cvCompetitions as c}
			<div class="entry">
				<p class="when">{c.when}</p>
				<div>
					<!-- The prize sits on the heading line, in the same weight as the
					     project: it is the part a reader is scanning for, and in grey
					     small print underneath it was being skimmed straight past. -->
					<h3>
						{c.project}{#if c.prize}<span class="prize">{' — '}{c.prize}</span>{/if}
					</h3>
					<p class="org">{c.event}</p>
					{#if c.challenge}
						<p class="detail"><em>Challenge:</em> {c.challenge}</p>
					{/if}
					<p class="detail">{c.summary}</p>
					<p class="detail">{c.stack.join(' · ')}</p>
				</div>
			</div>
		{/each}
	</section>

	{#if !skillsDraft}
		<section>
			<h2>Skills</h2>
			{#each Object.entries(skills) as [level, list]}
				<div class="entry">
					<p class="when">{level}</p>
					<div><p class="detail wide">{list.join(' · ')}</p></div>
				</div>
			{/each}
		</section>
	{/if}
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

	/* The CV is a document, not a page of the site: no red, no teal, just ink on
	   paper. It has to survive being printed in black and white and read as a CV
	   rather than as a brand artefact. The site's tagline roles stay on the site;
	   the CV header is the name and the ways to reach it, nothing else. */
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
		color: var(--ink);
		margin: 0 0 0.9rem;
		padding-bottom: 0.35rem;
		border-bottom: 1px solid var(--rule);
	}

	.contact a {
		color: inherit;
	}

	/* Same weight as the project it follows, so the two read as one heading. */
	.prize {
		font-weight: inherit;
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

	/* The courses are the substance of a teaching role, so they get the ink and a
	   line each rather than running together in grey. */
	.courses-label {
		margin: 0.35rem 0 0.15rem;
		font-family: var(--mono);
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-soft);
	}

	.courses {
		list-style: none;
		margin: 0 0 0.4rem;
		padding: 0;
	}

	.courses li {
		font-size: 0.9rem;
		color: var(--ink);
		padding-left: 0.9rem;
		position: relative;
		line-height: 1.45;
	}

	/* An en dash, not an em dash: an em dash is a full em wide and closes the gap
	   to the text entirely. */
	.courses li::before {
		content: '–';
		position: absolute;
		left: 0;
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

		/* Real black, not the near-black token, and a grey for the secondary
		   lines that is dark enough to survive a cheap printer. The tokens are
		   fine on a screen but print washed out. */
		.cv,
		.cv h1,
		.cv h2,
		.cv h3,
		.cv a {
			color: #000;
		}

		.contact,
		.when,
		.org,
		.detail,
		.courses-label {
			color: #333;
		}

		.courses li {
			color: #000;
		}

		h2 {
			border-bottom-color: #000;
		}

		header {
			border-bottom-color: #000;
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

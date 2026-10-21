<script lang="ts">
	// The CV document itself, shared by the public /cv page and the private
	// variants at /cv/<name>/. What each one shows, and in which order, comes
	// from its `CvVariant`; the data is always the same files as the rest of the
	// site, so no version can drift out of date the way a checked-in PDF does.
	import { profile } from '$lib/data/profile';
	import {
		academicRoles,
		industryRoles,
		enterpriseRoles,
		education,
		funding,
		supervision,
		skills,
		skillsDraft
	} from '$lib/data/experience';
	import { publications } from '$lib/data/publications';
	import { cvCompetitions } from '$lib/data/hackathons';
	import { teamProjects } from '$lib/data/projects';
	import { presentations, peerReview, outreach } from '$lib/data/service';
	import { academicDate } from '$lib/date';
	import type { CvVariant, SectionKey } from './variant';

	let { variant }: { variant: CvVariant } = $props();

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

	// A path like '/masters-thesis.pdf' resolves against wherever the page was
	// printed from — file:/// in the build, localhost for a variant — and the PDF
	// then carries a link that is dead for everyone who receives it. Anchored to
	// the live site, it works on paper and on screen alike.
	const absolute = (url: string) => new URL(url, profile.site).href;

	const papers = [...publications].sort((a, b) => b.year - a.year);

	// 'https://github.com/TibiIC' -> 'github.com/TibiIC'. Printed on paper, so the
	// scheme and any trailing slash are noise.
	const short = (url: string) =>
		url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

	// A thesis title is a title and a subtitle joined by a colon, and the two read
	// as separate thoughts. Splitting them lets the line break land where the
	// sense already breaks, instead of wherever the column happens to run out.
	const titleParts = (t: string) => {
		const i = t.indexOf(': ');
		return i === -1 ? [t] : [t.slice(0, i + 1), t.slice(i + 2)];
	};

	// Papers link to their preprint where one exists, so the title itself is the
	// link rather than a trailing 'arXiv' tag. arXiv first: it is the copy that
	// stays readable without a subscription.
	const paperUrl = (p: (typeof papers)[number]) =>
		p.links?.find((l) => l.label === 'arXiv')?.url ?? p.links?.[0]?.url;

	const newestFirst = <T extends { date: string }>(xs: T[]) =>
		[...xs].sort((a, b) => b.date.localeCompare(a.date));

	const lists = {
		education,
		academic: academicRoles,
		enterprise: enterpriseRoles,
		industry: industryRoles,
		projects: teamProjects,
		publications: papers,
		funding,
		supervision,
		presentations: newestFirst(presentations),
		review: [...peerReview].sort((a, b) => Math.max(...b.years) - Math.max(...a.years)),
		engagement: newestFirst(outreach),
		competitions: cvCompetitions
	};
	type ListKey = keyof typeof lists;

	const HEADINGS: Record<SectionKey, string> = {
		summary: 'Profile',
		education: 'Education',
		academic: 'Academic experience',
		enterprise: 'Enterprise and entrepreneurship',
		industry: 'Industry experience',
		projects: 'Team projects',
		publications: 'Publications',
		funding: 'Funding',
		supervision: 'Supervision',
		presentations: 'Presentations',
		review: 'Peer review',
		engagement: 'Public engagement',
		competitions: 'Competitions & hackathons',
		// 'Methods' rather than 'Skills': the latter is an industry-CV word and
		// invites a self-assessment reading. A panel scans for methods.
		skills: 'Methods & tools'
	};
	const heading = (k: SectionKey) => variant.heading?.[k] ?? HEADINGS[k];

	// Which entries of a list this part of the CV shows. A section placed in
	// both parts with a limit splits at the limit; a limit on a section that is
	// only in one part just caps it.
	//
	// `keep` decides the same thing by title instead of by count: the titles it
	// names stay in the main part and, when the section is in both parts, the
	// rest move to the appendix.
	function part<K extends ListKey>(k: K, where: 'main' | 'appendix'): (typeof lists)[K] {
		type L = (typeof lists)[K];
		const split = variant.main.includes(k) && !!variant.appendix?.includes(k);
		const keep = variant.keep?.[k];
		let all = lists[k] as L;
		if (keep) {
			const kept = (x: unknown) => keep.includes(titleOf(x));
			if (where === 'main' || !split) all = all.filter(kept) as L;
			else return all.filter((x) => !kept(x)) as L;
		}
		const lim = variant.limit?.[k];
		if (lim === undefined) return all;
		if (where === 'appendix' && split) return all.slice(lim) as L;
		return all.slice(0, lim) as L;
	}

	// Whatever each list calls its headline.
	const titleOf = (x: unknown) => {
		const o = x as Record<string, unknown>;
		return String(o.title ?? o.project ?? o.degree ?? o.venue ?? '');
	};

	// Sections that would render empty render nothing at all, heading included.
	function shown(k: SectionKey, where: 'main' | 'appendix') {
		if (k === 'summary') return !!variant.summary;
		if (k === 'skills') return !skillsDraft;
		return part(k, where).length > 0;
	}

	const compact = $derived(!!variant.compact);
	// The bullets an entry prints, if this variant prints bullets at all.
	const pointsFor = (title: string, own?: string[]) =>
		variant.bullets ? (variant.rewrite?.[title] ?? own) : undefined;

	// 'Explaining clearly: four years of…' -> the skill, then the evidence.
	const splitPoint = (b: string) => {
		const i = b.indexOf(': ');
		return i === -1 ? ['', b] : [b.slice(0, i), b.slice(i + 2)];
	};

	// Compact, except for the sections the variant asks to keep in full.
	const cmp = (k: SectionKey) => compact && !variant.full?.includes(k);
</script>

{#snippet points(list: string[])}
	<ul class="points">
		{#each list as b}
			{@const [skill, evidence] = splitPoint(b)}
			<li>{#if skill}<strong>{skill}:</strong>{' '}{/if}{evidence}</li>
		{/each}
	</ul>
{/snippet}

{#snippet section(k: SectionKey, where: 'main' | 'appendix')}
	{@const intro = variant.intro?.[k]}
	<section>
		<h2>{heading(k)}</h2>
		{#if intro && where === 'main'}
			<div class="intro">
				{#if typeof intro === 'string'}<p>{intro}</p>{:else}{@render points(intro)}{/if}
			</div>
		{/if}
		{#if k === 'summary'}
			<p class="summary">{variant.summary}</p>
		{:else if k === 'education'}
			{#each part('education', where) as e}
				{@const pts = pointsFor(e.degree, e.bullets)}
				<div class="entry">
					<p class="when">{when(e.start)} – {when(e.end)}</p>
					<div>
						<h3>{e.degree}</h3>
						<p class="org">{e.org}</p>
						<p class="detail thesis">
							<em>Thesis:</em>
							<span
								>{#if e.thesisUrl}<a href={absolute(e.thesisUrl)} target="_blank" rel="noopener noreferrer"
										>{#each titleParts(e.thesis) as part, i}{#if i}<br />{/if}{part}{/each}</a
									>{:else}{#each titleParts(e.thesis) as part, i}{#if i}<br />{/if}{part}{/each}{/if}</span
							>
						</p>
						{#if variant.grades && e.results}<p class="detail">{e.results}</p>{/if}
						{#if pts?.length}{@render points(pts)}{/if}
						{#if e.supervisors?.length && !variant.hideSupervisors}
							<p class="detail">
								<em>{e.supervisors.length === 1 ? 'Supervisor:' : 'Supervisors:'}</em>
								{e.supervisors.join(', ')}
							</p>
						{/if}
					</div>
				</div>
			{/each}
		{:else if k === 'academic' || k === 'enterprise' || k === 'industry'}
			{#each part(k, where) as r}
				{@const pts = pointsFor(r.title, r.bullets)}
				<div class="entry">
					<p class="when">{when(r.start)} – {when(r.end)}</p>
					<div>
						<h3>{r.title}</h3>
						<p class="org">{r.org}</p>
						{#if pts?.length}
							<!-- The bullets name the courses where they matter, so the list goes. -->
							{@render points(pts)}
						{:else if r.detail}<p class="detail">{r.detail}</p>{/if}
						{#if r.courses?.length && !pts?.length}
							{#if cmp(k)}
								<p class="detail"><em>Courses:</em> {r.courses.join(' · ')}</p>
							{:else}
								<p class="courses-label">Courses</p>
								<ul class="courses">
									{#each r.courses as c}<li>{c}</li>{/each}
								</ul>
							{/if}
						{/if}
						{#if !cmp(k)}<p class="detail">{r.skills.join(' · ')}</p>{/if}
					</div>
				</div>
			{/each}
		{:else if k === 'projects'}
			{#each part('projects', where) as p}
				{@const pts = pointsFor(p.title, p.bullets)}
				<div class="entry">
					<p class="when">{p.when}</p>
					<div>
						<h3>
							{#if p.link}<a href={p.link} target="_blank" rel="noopener noreferrer">{p.title}</a
								>{:else}{p.title}{/if}
						</h3>
						<p class="org">
							{p.course} · {p.role === 'team lead' ? 'Team lead' : 'Team member'}, team of {p.teamSize}
						</p>
						{#if pts?.length}
							{@render points(pts)}
						{:else}
							<p class="detail">{p.summary}</p>
							{#if p.delivery || p.outcome}
								<p class="detail">{[p.delivery, p.outcome].filter(Boolean).join(' ')}</p>
							{/if}
						{/if}
					</div>
				</div>
			{/each}
		{:else if k === 'publications'}
			{#each part('publications', where) as p}
				<div class="entry">
					<p class="when">{p.year}</p>
					<div>
						<h3>
							{#if paperUrl(p)}<a href={paperUrl(p)} target="_blank" rel="noopener noreferrer"
									>{p.title}</a
								>{:else}{p.title}{/if}
						</h3>
						<p class="org">{p.authors.join(', ')}</p>
						<p class="detail">
							{p.venue}{#if p.status !== 'published'}{' · '}<em>{p.status}</em>{/if}
						</p>
					</div>
				</div>
			{/each}
		{:else if k === 'funding'}
			{#each part('funding', where) as f}
				<div class="entry">
					<!-- A one-off award has no range: start and end are the award date. -->
					<p class="when">
						{awardDate(f.start)}{#if f.end !== f.start}{' – '}{awardDate(f.end)}{/if}
					</p>
					<div>
						<h3>
							{#if f.url}<a href={f.url} target="_blank" rel="noopener noreferrer">{f.title}</a
								>{:else}{f.title}{/if}
						</h3>
						{#if cmp(k)}
							<p class="detail">{f.funder} · {f.share}</p>
						{:else}
							<p class="org">{f.funder}{#if f.reference}{' · '}{f.reference}{/if}</p>
							<!-- Role and share on one line, because the ad asks for both and a
							     panel reads them together: what you were on the project, and
							     which part of the money was actually yours. -->
							<p class="detail">
								<em>Role:</em>
								{f.role}{#if f.share}{' · '}<em>Awarded:</em> {f.share}{/if}
							</p>
						{/if}
					</div>
				</div>
			{/each}
		{:else if k === 'supervision'}
			{#each part('supervision', where) as s}
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
		{:else if k === 'presentations'}
			{#each part('presentations', where) as t}
				<div class="entry">
					<p class="when">{academicDate(t.date)}</p>
					<div>
						<h3>{t.title}</h3>
						<p class="org">
							{t.event} · {t.place}{#if cmp(k) && t.kind && t.kind !== 'talk'}{' · '}{t.kind}{/if}
						</p>
						{#if !cmp(k) && t.kind && t.kind !== 'talk'}<p class="detail">{t.kind}</p>{/if}
					</div>
				</div>
			{/each}
		{:else if k === 'review'}
			{#each part('review', where) as r}
				<div class="entry">
					<p class="when">{r.years.join(', ')}</p>
					<div>
						{#if cmp(k)}
							<!-- One line: four reviewing entries are not worth eight. -->
							<h3>{r.venue}<span class="aside">{' · '}{r.role}</span></h3>
						{:else}
							<h3>{r.venue}</h3>
							<p class="org">{r.role}{#if r.type}{' · '}{r.type}{/if}</p>
						{/if}
					</div>
				</div>
			{/each}
		{:else if k === 'engagement'}
			{#each part('engagement', where) as o}
				<div class="entry">
					<p class="when">{academicDate(o.date)}</p>
					<div>
						<h3>{o.title}</h3>
						<!-- A named exhibition leads; the audience only carries the line
						     when there is no event to name. -->
						<p class="org">
							{[o.event ?? o.audience, o.place].filter(Boolean).join(' · ')}
						</p>
						{#if o.blurb && !cmp(k)}<p class="detail">{o.blurb}</p>{/if}
					</div>
				</div>
			{/each}
		{:else if k === 'competitions'}
			{#each part('competitions', where) as c}
				<div class="entry">
					<p class="when">{c.when}</p>
					<div>
						<!-- The prize sits on the heading line, in the same weight as the
						     project: it is the part a reader is scanning for, and in grey
						     small print underneath it was being skimmed straight past. -->
						<h3>
							{#if variant.linkCompetitions && c.url}<a
									href={c.url}
									target="_blank"
									rel="noopener noreferrer">{c.project}</a
								>{:else}{c.project}{/if}{#if c.prize && !compact}<span class="prize"
									>{' — '}{c.prize}</span
								>{/if}
						</h3>
						<p class="org">
							<!-- In the tailored CVs a win leads the event line, labelled and in
							     full ink: a reader scanning the list should tell the wins from
							     the entries without reading every title. -->
							{#if c.prize && compact}<span class="won"
									><span class="badge">Prize</span> {c.prize}</span
								>{' · '}{/if}{c.event}{#if variant.teamwork && c.team}{' · '}{c.team.lead
									? 'Led a team of'
									: 'Team of'}
								{c.team.size}{/if}
						</p>
						{#if c.challenge && !compact}
							<p class="detail"><em>Challenge:</em> {c.challenge}</p>
						{/if}
						{#if !compact}
							<p class="detail">{c.summary}</p>
							<p class="detail">{c.stack.join(' · ')}</p>
						{:else if !cmp(k)}
							<!-- Kept inside a compact CV: what was built, without the stack,
							     which the languages section already covers. -->
							<p class="detail">{c.summary}</p>
						{/if}
					</div>
				</div>
			{/each}
		{:else if k === 'skills'}
			{#each Object.entries(variant.skills ?? skills) as [level, list]}
				{#if cmp(k)}
					<!-- Label inline: in the narrow date column it wraps to two lines. -->
					<p class="detail wide skill"><em>{level}:</em> {list.join(' · ')}</p>
				{:else}
					<div class="entry">
						<p class="when">{level}</p>
						<div><p class="detail wide">{list.join(' · ')}</p></div>
					</div>
				{/if}
			{/each}
		{/if}
	</section>
{/snippet}

<article class="cv" class:compact>
	<header>
		<h1>{profile.name}</h1>
		<p class="contact">
			<a href="mailto:{profile.email}">{profile.email}</a>
			<span>·</span>
			<!-- A compact CV drops the city: the header then fits on one line. -->
			{#if !compact}
				<span>{profile.location}</span>
				<span>·</span>
			{/if}
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

	{#each variant.main.filter((k) => shown(k, 'main')) as k}
		{@render section(k, 'main')}
	{/each}

	{#if variant.appendix?.some((k) => shown(k, 'appendix'))}
		<!-- Starts on a fresh page in print, so the first pages stand on their own
		     and the appendix reads as optional rather than as page three. -->
		<div class="appendix">
			<p class="appendix-title">Additional information</p>
			{#each variant.appendix.filter((k) => shown(k, 'appendix')) as k}
				{@render section(k, 'appendix')}
			{/each}
		</div>
	{/if}
</article>

<style>
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
		/* A heading stranded at the foot of a page, its entries overleaf. */
		break-after: avoid;
	}

	.contact a {
		color: inherit;
	}

	/* Same weight as the project it follows, so the two read as one heading. */
	.prize {
		font-weight: inherit;
	}

	.aside {
		font-weight: normal;
		color: var(--ink-soft);
	}

		.summary {
		margin: 0;
		font-size: 0.92rem;
		line-height: 1.5;
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

	/* Two columns rather than an inline label, so the second line of a long title
	   hangs under the first instead of restarting at the margin. The underline
	   then stacks into one block and reads as a single link, which is the whole
	   point — an inline label leaves the wrapped tail underlined out on its own. */
	.detail.thesis {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0 0.3em;
		align-items: baseline;
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

	.won {
		font-weight: 600;
		color: var(--ink);
	}

	/* Boxed rather than coloured, so it survives a black-and-white printer. */
	.badge {
		display: inline-block;
		padding: 0 0.3em;
		margin-right: 0.25em;
		border: 1px solid currentColor;
		border-radius: 2px;
		font-family: var(--mono);
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		line-height: 1.4;
		vertical-align: 0.1em;
	}

	/* Spans both columns: it is about the whole section, not one entry. */
	.intro {
		margin: 0 0 0.8rem;
		font-size: 0.88rem;
	}

	.intro p {
		margin: 0;
	}

	/* Skill-first bullets: the bold lead-in is what a reader scans down. */
	.points {
		margin: 0.15rem 0 0;
		padding-left: 1rem;
		font-size: 0.85rem;
		color: var(--ink-soft);
		line-height: 1.4;
	}

	.points strong {
		color: var(--ink);
		font-weight: 600;
	}

	.skill {
		break-inside: avoid;
		break-before: avoid;
	}

	.appendix {
		margin-top: 3rem;
		padding-top: 1.2rem;
		border-top: 2px solid var(--ink);
	}

	.appendix-title {
		margin: 0 0 1.5rem;
		font-family: var(--mono);
		font-size: 0.78rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--ink-soft);
	}

	@media (max-width: 640px) {
		.entry {
			grid-template-columns: 1fr;
			gap: 0.2rem;
		}
	}

	/* On paper: tighter type, and entries that don't split across a page break.
	   The global print rules in app.css drop the site chrome. */
	@media print {
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
		.courses-label,
		.appendix-title {
			color: #333;
		}

		.courses li,
		.points strong,
		.won {
			color: #000;
		}

		.points {
			color: #333;
		}

		h2 {
			border-bottom-color: #000;
		}

		header,
		.appendix {
			border-color: #000;
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

		.appendix {
			break-before: page;
			margin-top: 0;
		}

		/* Two pages is the budget, so a compact variant spends less on air. */
		.compact .entry {
			grid-template-columns: 6.5rem 1fr;
			gap: 0.8rem;
			margin-bottom: 0.5rem;
		}

		.compact section {
			margin-bottom: 1rem;
		}

		.compact h2 {
			margin-bottom: 0.6rem;
		}

		.compact header {
			padding-bottom: 0.8rem;
			margin-bottom: 1rem;
		}
	}
</style>

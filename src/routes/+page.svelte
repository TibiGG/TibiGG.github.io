<script lang="ts">
	import { base } from '$app/paths';
	import { profile, diceFacts } from '$lib/data/profile';
	import { publications } from '$lib/data/publications';
	import { hackathons, writing } from '$lib/data/hackathons';
	import { roles, education, skills } from '$lib/data/experience';
	import Die from '$lib/Die.svelte';

	const MONTHS = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	// 'present' passes through; otherwise YYYY-MM renders as "Mon YYYY".
	function when(ym: string) {
		if (ym === 'present') return 'present';
		const [y, m] = ym.split('-');
		return `${MONTHS[Number(m) - 1]} ${y}`;
	}

	let fact = $state('Roll the die for something you didn’t ask to know.');
	let rolled = $state(false);

	function newFact() {
		// Don't land on the fact we're already showing.
		let next = fact;
		while (next === fact && diceFacts.length > 1) {
			next = diceFacts[Math.floor(Math.random() * diceFacts.length)];
		}
		fact = next;
		rolled = true;
	}

	const wins = hackathons.length;
	// Sort rather than trusting the data file's order.
	const latest = [...hackathons].sort((a, b) => b.date.localeCompare(a.date))[0];
</script>

<svelte:head>
	<title>{profile.name} — research, hackathons, dice</title>
	<meta
		name="description"
		content="Portfolio of {profile.name}: PhD research on specification repair, {wins} hackathon and competition wins, board games and Wing Chun."
	/>
</svelte:head>

<section class="hero">
	<div>
		<p class="eyebrow">{profile.location}</p>
		<h1>{profile.name}</h1>
		<p class="roles">
			{#each profile.roles as role, i}
				<span>{role}</span>{#if i < profile.roles.length - 1}<span class="sep">·</span>{/if}
			{/each}
		</p>
		<p class="blurb">{profile.blurb}</p>
		<div class="cta">
			<a class="btn" href="{base}/research">Read the research</a>
			<a class="btn ghost" href="{base}/hackathons">See the wins</a>
		</div>
	</div>

	<aside class="dicebox">
		<Die onroll={newFact} />
		<p class="fact" class:rolled>{fact}</p>
	</aside>
</section>

<section class="stats">
	<div class="stat card">
		<strong>{publications.length}</strong>
		<span>papers</span>
	</div>
	<div class="stat card">
		<strong>{wins}</strong>
		<span>hackathons &amp; competitions won</span>
	</div>
	<div class="stat card">
		<strong>∞</strong>
		<span>board games unplayed on the shelf</span>
	</div>
</section>

<section>
	<h2 class="centerline">Most recent win</h2>
	<article class="card feature">
		<p class="eyebrow">{latest.event} — {latest.prize}</p>
		<h3>{latest.project}</h3>
		<p>{latest.tagline}</p>
		<div class="tags">
			{#each latest.stack as s}<span class="tag">{s}</span>{/each}
		</div>
		<a class="more" href="{base}/hackathons">All {wins} of them →</a>
	</article>
</section>

<section>
	<h2 class="centerline">Where I've worked</h2>
	<ol class="timeline">
		{#each roles as r}
			<li>
				<p class="when">{when(r.start)} – {when(r.end)}</p>
				<div>
					<h3>
						{#if r.link}
							<a href={r.link} target="_blank" rel="noopener noreferrer">{r.title}</a>
						{:else}
							{r.title}
						{/if}
					</h3>
					<p class="org">{r.org}</p>
					<div class="tags">
						{#each r.skills as s}<span class="tag">{s}</span>{/each}
					</div>
				</div>
			</li>
		{/each}
	</ol>
</section>

<section>
	<h2 class="centerline">Education</h2>
	<div class="edu">
		{#each education as e}
			<article class="card">
				<p class="eyebrow">{when(e.start)} – {when(e.end)}</p>
				<h3>{e.degree}</h3>
				<p class="org">{e.org}</p>
				<p class="thesis">
					<span class="label">Thesis</span>
					{e.thesis}{#if e.inProgress}<span class="tag wip">in progress</span>{/if}
				</p>
			</article>
		{/each}
	</div>
</section>

<section>
	<h2 class="centerline">Tools of the trade</h2>
	<div class="skills">
		{#each Object.entries(skills) as [level, list]}
			<div>
				<p class="label">{level}</p>
				<div class="tags">
					{#each list as s}<span class="tag">{s}</span>{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

<section>
	<h2 class="centerline">Things I wrote</h2>
	<ul class="writing">
		{#each writing as w}
			<li>
				<a href={w.url} target="_blank" rel="noopener noreferrer">{w.title}</a>
				<span class="tag">LinkedIn</span>
			</li>
		{/each}
	</ul>
</section>

<style>
	.hero {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 3rem;
		align-items: center;
		margin-bottom: 4rem;
	}

	h1 {
		font-size: clamp(2.4rem, 7vw, 4.2rem);
		margin: 0.4rem 0 0.6rem;
	}

	.roles {
		font-family: var(--display);
		font-weight: 600;
		color: var(--teal);
		margin: 0 0 1.2rem;
		font-size: 1.05rem;
	}

	.sep {
		opacity: 0.45;
		margin: 0 0.5rem;
		color: var(--ink-soft);
	}

	.blurb {
		max-width: 34rem;
		color: var(--ink-soft);
		margin: 0 0 1.8rem;
	}

	.cta {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.dicebox {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		max-width: 15rem;
		text-align: center;
	}

	.fact {
		font-size: 0.9rem;
		color: var(--ink-soft);
		margin: 0;
		min-height: 5rem;
	}

	.fact.rolled {
		color: var(--ink);
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
		gap: 1rem;
		margin-bottom: 4rem;
	}

	.stat {
		text-align: center;
		padding: 1.25rem 1rem;
	}

	.stat strong {
		display: block;
		font-family: var(--display);
		font-size: 2.4rem;
		line-height: 1;
		color: var(--red);
	}

	.stat span {
		font-size: 0.85rem;
		color: var(--ink-soft);
	}

	section {
		margin-bottom: 4rem;
	}

	.feature h3 {
		font-size: 1.7rem;
		margin: 0.3rem 0 0.5rem;
	}

	.feature p {
		margin: 0 0 1rem;
		color: var(--ink-soft);
	}

	.tags {
		display: flex;
		gap: 0.4rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.more {
		font-family: var(--display);
		font-weight: 600;
		font-size: 0.92rem;
		text-decoration: none;
		color: var(--red);
	}

	.timeline {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.1rem;
	}

	.timeline li {
		display: grid;
		grid-template-columns: 11rem 1fr;
		gap: 1rem;
		padding: 1.1rem 0.25rem;
		border-bottom: 1px solid var(--rule);
	}

	.timeline h3 {
		font-size: 1.05rem;
		margin: 0 0 0.15rem;
	}

	.timeline h3 a {
		text-decoration: none;
	}

	.timeline h3 a:hover {
		text-decoration: underline;
	}

	.when {
		font-family: var(--display);
		font-size: 0.85rem;
		color: var(--red);
		margin: 0.15rem 0 0;
	}

	.org {
		color: var(--ink-soft);
		font-size: 0.92rem;
		margin: 0 0 0.6rem;
	}

	.edu {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		gap: 1rem;
	}

	.edu h3 {
		font-size: 1.15rem;
		margin: 0.3rem 0 0.15rem;
	}

	.thesis {
		margin: 0;
		font-size: 0.92rem;
		color: var(--ink-soft);
	}

	.label {
		display: block;
		font-family: var(--display);
		font-weight: 600;
		font-size: 0.75rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--teal);
		margin: 0 0 0.25rem;
	}

	.tag.wip {
		margin-left: 0.5rem;
	}

	.skills {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		gap: 1.5rem;
	}

	.writing {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.1rem;
	}

	.writing li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.85rem 0.25rem;
		border-bottom: 1px solid var(--rule);
	}

	.writing a {
		font-family: var(--display);
		font-weight: 600;
		text-decoration: none;
	}

	.writing a:hover {
		text-decoration: underline;
	}

	@media (max-width: 720px) {
		.hero {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		.dicebox {
			max-width: none;
			flex-direction: row;
			text-align: left;
		}
		.fact {
			min-height: 0;
		}
		.timeline li {
			grid-template-columns: 1fr;
			gap: 0.35rem;
		}
	}
</style>

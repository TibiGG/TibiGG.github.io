<script lang="ts">
	import { profile } from '$lib/data/profile';

	// Static site, so no form backend — mailto keeps it honest and dependency-free.
	let copied = $state(false);

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(profile.email);
			copied = true;
			setTimeout(() => (copied = false), 1800);
		} catch {
			// Clipboard blocked (insecure context, permissions) — the mailto link still works.
			copied = false;
		}
	}

	const channels = [
		{ label: 'LinkedIn', url: profile.links.linkedin, note: 'Where the write-ups live' },
		{ label: 'GitHub', url: profile.links.github, note: 'Code, mostly half-finished' },
		{ label: 'GitHub (older)', url: profile.links.githubOld, note: 'Undergrad-era projects' },
		...(profile.links.scholar
			? [{ label: 'Google Scholar', url: profile.links.scholar, note: 'Papers and citations' }]
			: [])
	];
</script>

<svelte:head>
	<title>Contact — {profile.name}</title>
	<meta name="description" content="Get in touch with {profile.name}." />
</svelte:head>

<h1 class="centerline">Say hello</h1>
<p class="lede">
	Research collaborations, hackathon teams, or a spare seat at a four-player game — all welcome.
</p>

<div class="card email-card">
	<p class="eyebrow">Email</p>
	<a class="email" href="mailto:{profile.email}">{profile.email}</a>
	<div class="row">
		<a class="btn" href="mailto:{profile.email}">Open in mail app</a>
		<button class="btn ghost" onclick={copyEmail}>{copied ? 'Copied ✓' : 'Copy address'}</button>
	</div>
</div>

<div class="channels">
	{#each channels as c}
		<a class="card tilt channel" href={c.url} target="_blank" rel="noopener noreferrer">
			<strong>{c.label}</strong>
			<span>{c.note}</span>
		</a>
	{/each}
</div>

<style>
	h1 {
		font-size: clamp(2rem, 5vw, 3rem);
	}

	.lede {
		max-width: 38rem;
		color: var(--ink-soft);
		margin: 0 0 2.5rem;
		font-size: 1.05rem;
	}

	.email-card {
		max-width: 34rem;
		margin-bottom: 2rem;
	}

	.email {
		display: block;
		font-family: var(--display);
		font-size: clamp(1.1rem, 3.5vw, 1.6rem);
		font-weight: 700;
		margin: 0.3rem 0 1.2rem;
		word-break: break-all;
	}

	.row {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
	}

	.channels {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
		gap: 1rem;
	}

	.channel {
		text-decoration: none;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}

	.channel strong {
		font-family: var(--display);
		font-size: 1.1rem;
	}

	.channel span {
		font-size: 0.87rem;
		color: var(--ink-soft);
	}
</style>

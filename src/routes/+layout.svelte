<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { profile } from '$lib/data/profile';

	let { children } = $props();

	const nav = [
		{ href: '/', label: 'Home' },
		{ href: '/research', label: 'Research' },
		{ href: '/hackathons', label: 'Hackathons' },
		{ href: '/play', label: 'Play' },
		{ href: '/contact', label: 'Contact' }
	];

	const isActive = (href: string) =>
		href === '/'
			? page.url.pathname === base + '/' || page.url.pathname === base
			: page.url.pathname.startsWith(base + href);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<header>
	<div class="wrap bar">
		<a class="brand" href="{base}/">
			<span class="pip" aria-hidden="true"></span>
			{profile.short}
		</a>
		<nav aria-label="Main">
			{#each nav as item}
				<a
					href="{base}{item.href}"
					class:active={isActive(item.href)}
					aria-current={isActive(item.href) ? 'page' : undefined}
				>
					{item.label}
				</a>
			{/each}
		</nav>
	</div>
</header>

<main class="wrap">
	{@render children()}
</main>

<footer>
	<div class="wrap foot">
		<span>© {new Date().getFullYear()} {profile.name}</span>
		<span class="dot">·</span>
		<span>Built with SvelteKit, deployed on GitHub Pages</span>
		<span class="dot">·</span>
		<a href="{base}/contact">Say hello</a>
	</div>
</footer>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 20;
		backdrop-filter: blur(10px);
		background: color-mix(in srgb, var(--paper) 82%, transparent);
		border-bottom: 1px solid var(--rule);
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.85rem 0;
		flex-wrap: wrap;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-family: var(--display);
		font-weight: 700;
		font-size: 1.2rem;
		text-decoration: none;
		letter-spacing: -0.02em;
	}

	/* A single die pip as the logo. */
	.pip {
		width: 1.55rem;
		height: 1.55rem;
		border-radius: 6px;
		border: 2px solid var(--ink);
		background: var(--red);
		position: relative;
		box-shadow: 2px 2px 0 var(--ink);
	}

	.pip::after {
		content: '';
		position: absolute;
		inset: 0;
		margin: auto;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--paper);
	}

	nav {
		display: flex;
		gap: 0.35rem;
		flex-wrap: wrap;
	}

	nav a {
		font-family: var(--display);
		font-weight: 600;
		font-size: 0.94rem;
		padding: 0.35rem 0.7rem;
		border-radius: 999px;
		text-decoration: none;
		color: var(--ink-soft);
	}

	nav a:hover {
		color: var(--ink);
		background: var(--paper-2);
	}

	nav a.active {
		color: var(--ink);
		background: var(--paper-2);
		box-shadow: inset 0 0 0 1px var(--rule);
	}

	main {
		min-height: 70vh;
		padding: 3.5rem 0 5rem;
	}

	footer {
		border-top: 1px solid var(--rule);
		background: var(--paper-2);
	}

	.foot {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
		justify-content: center;
		padding: 2rem 0;
		font-size: 0.86rem;
		color: var(--ink-soft);
		text-align: center;
	}

	.dot {
		opacity: 0.5;
	}
</style>

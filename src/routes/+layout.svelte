<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { profile } from '$lib/data/profile';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import Logo from '$lib/Logo.svelte';

	let { children } = $props();

	const nav = [
		{ href: '/', label: 'Home' },
		{ href: '/research', label: 'Research' },
		{ href: '/writing', label: 'Writing' },
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
			<Logo />
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
		<ThemeToggle />
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
		<a href="{base}/cv">CV</a>
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
		gap: 0.75rem;
		padding: 0.85rem 0;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		margin-right: auto;
		font-family: var(--display);
		font-weight: 700;
		font-size: 1.2rem;
		text-decoration: none;
		letter-spacing: -0.02em;
	}

	nav {
		display: flex;
		gap: 0.35rem;
	}

	nav a {
		white-space: nowrap;
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

	/* Below the fold of a phone screen the six links won't fit beside the brand,
	   so they drop to their own row and scroll sideways rather than wrapping into
	   a two-line block that shoves the content down. */
	@media (max-width: 720px) {
		.bar {
			flex-wrap: wrap;
			padding-bottom: 0.4rem;
		}

		nav {
			order: 3;
			flex-basis: 100%;
			overflow-x: auto;
			scrollbar-width: none;
			padding-bottom: 0.45rem;
		}

		nav::-webkit-scrollbar {
			display: none;
		}
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

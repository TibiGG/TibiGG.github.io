<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { profile } from '$lib/data/profile';

	// /play was the page's address before it became "On the Side". It shipped in
	// a sitemap, so it redirects instead of 404ing. The meta refresh covers
	// visitors arriving with no JS; goto() makes it instant for everyone else.
	onMount(() => {
		goto(`${base}/side/`, { replaceState: true });
	});
</script>

<svelte:head>
	<title>Moved to On the Side</title>
	<meta name="robots" content="noindex" />
	<meta http-equiv="refresh" content="0; url={base}/side/" />
	<link rel="canonical" href="{profile.site}/side/" />
</svelte:head>

<h1 class="centerline">Moved</h1>
<p class="lede">
	This page is now <a href="{base}/side/">On the Side</a>.
</p>

<style>
	h1 {
		font-size: clamp(2rem, 5vw, 3rem);
	}

	.lede {
		color: var(--ink-soft);
		font-size: 1.05rem;
	}
</style>

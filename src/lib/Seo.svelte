<script lang="ts">
	import { page } from '$app/state';
	import { profile } from '$lib/data/profile';

	type Props = {
		title: string;
		description: string;
		// 'website' for pages, 'article' for posts.
		type?: 'website' | 'article';
		// Site-root-relative (or absolute). Crawlers need a fully-qualified URL,
		// so never SvelteKit's `base`, which prerenders to a relative './'.
		image?: string;
		published?: string;
		// Structured data for this page; serialised into a JSON-LD block.
		schema?: Record<string, unknown> | Record<string, unknown>[];
	};

	let { title, description, type = 'website', image = '/og.png', published, schema }: Props =
		$props();

	// Trailing slashes are forced site-wide, so pathname is already canonical.
	const url = $derived(profile.site + page.url.pathname);
	const absoluteImage = $derived(image.startsWith('http') ? image : profile.site + image);

	// A literal `<` inside JSON-LD could close the tag early, so it is escaped;
	// the closing tag itself is spliced together for the same reason.
	const jsonLd = $derived(
		schema
			? `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}<` +
				'/script>'
			: null
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />

	<meta property="og:type" content={type} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={absoluteImage} />
	<meta property="og:site_name" content={profile.name} />
	{#if published}
		<meta property="article:published_time" content={published} />
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={absoluteImage} />

	{#if jsonLd}
		{@html jsonLd}
	{/if}
</svelte:head>

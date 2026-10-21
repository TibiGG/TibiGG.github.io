<script lang="ts">
	import Cv from '$lib/cv/Cv.svelte';
	import { profile } from '$lib/data/profile';

	let { data } = $props();
</script>

<!-- The page title becomes the PDF's title, which the recipient sees in their
     viewer, so it is the CV's name and nothing about how it was made. -->
<svelte:head>
	<title>CV · {profile.name}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<Cv variant={data.variant} />

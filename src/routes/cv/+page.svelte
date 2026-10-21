<script lang="ts">
	import { base } from '$app/paths';
	import { profile } from '$lib/data/profile';
	import { person } from '$lib/schema';
	import Seo from '$lib/Seo.svelte';
	import Cv from '$lib/cv/Cv.svelte';
	import { publicCv } from '$lib/cv/variant';
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

<Cv variant={publicCv} />

<style>
	.actions {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
		margin-bottom: 2.5rem;
	}

	@media print {
		.actions {
			display: none;
		}
	}
</style>

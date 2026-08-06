<script lang="ts">
	import { toggleTheme, followSystem } from '$lib/theme.svelte';

	// Shift-click forgets the override and goes back to following the OS.
	function onclick(event: MouseEvent) {
		if (event.shiftKey) followSystem();
		else toggleTheme();
	}
</script>

<!-- Which icon shows is decided in CSS from the theme actually in effect, not
     from component state, so it is already correct in the prerendered HTML and
     never flickers on hydration. The label covers both directions, for the same
     reason. -->
<button
	type="button"
	class="toggle"
	{onclick}
	title="Toggle light or dark theme (shift-click to follow your system)"
	aria-label="Toggle light or dark theme"
>
	<svg class="icon sun" viewBox="0 0 24 24" aria-hidden="true">
		<circle cx="12" cy="12" r="4.2" />
		<path
			d="M12 2v2.6M12 19.4V22M2 12h2.6M19.4 12H22M4.9 4.9l1.9 1.9M17.2 17.2l1.9 1.9M19.1 4.9l-1.9 1.9M6.8 17.2l-1.9 1.9"
		/>
	</svg>
	<svg class="icon moon" viewBox="0 0 24 24" aria-hidden="true">
		<path class="fill" d="M20 14.4A8.5 8.5 0 1 1 9.6 4a6.8 6.8 0 0 0 10.4 10.4Z" />
	</svg>
</button>

<style>
	.toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.2rem;
		height: 2.2rem;
		padding: 0;
		border-radius: 999px;
		border: 1px solid var(--rule);
		background: var(--paper-2);
		color: var(--ink-soft);
		cursor: pointer;
		transition:
			color 0.15s ease,
			border-color 0.15s ease,
			transform 0.15s ease;
	}

	.toggle:hover {
		color: var(--red);
		border-color: var(--red);
		transform: rotate(-12deg);
	}

	.icon {
		width: 1.05rem;
		height: 1.05rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.7;
		stroke-linecap: round;
	}

	.fill {
		fill: currentColor;
		stroke: none;
	}

	/* Light is the default: show the sun. */
	.moon {
		display: none;
	}

	/* Dark by OS preference, unless explicitly overridden to light. */
	@media (prefers-color-scheme: dark) {
		:global(:root:not([data-theme='light'])) .sun {
			display: none;
		}

		:global(:root:not([data-theme='light'])) .moon {
			display: block;
		}
	}

	/* Dark by explicit choice, whatever the OS says. */
	:global(:root[data-theme='dark']) .sun {
		display: none;
	}

	:global(:root[data-theme='dark']) .moon {
		display: block;
	}
</style>

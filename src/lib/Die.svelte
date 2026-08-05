<script lang="ts">
	// A clickable d6. Rolls, tumbles, lands on a face, and reports the number.
	let { onroll }: { onroll?: (face: number) => void } = $props();

	// Pip layout per face, on a 3x3 grid indexed 1-9.
	const layouts: Record<number, number[]> = {
		1: [5],
		2: [1, 9],
		3: [1, 5, 9],
		4: [1, 3, 7, 9],
		5: [1, 3, 5, 7, 9],
		6: [1, 3, 4, 6, 7, 9]
	};

	let face = $state(5);
	let rolling = $state(false);

	function roll() {
		if (rolling) return;
		rolling = true;
		// Flicker through faces while it "tumbles".
		const flicker = setInterval(() => (face = 1 + Math.floor(Math.random() * 6)), 80);
		setTimeout(() => {
			clearInterval(flicker);
			face = 1 + Math.floor(Math.random() * 6);
			rolling = false;
			onroll?.(face);
		}, 620);
	}
</script>

<button class="die" class:rolling onclick={roll} aria-label="Roll the die for a random fact">
	<span class="grid">
		{#each Array(9) as _, i}
			<span class="cell">
				{#if layouts[face].includes(i + 1)}<span class="pip"></span>{/if}
			</span>
		{/each}
	</span>
</button>

<style>
	.die {
		width: 5.5rem;
		height: 5.5rem;
		border-radius: 16px;
		border: 3px solid var(--ink);
		background: var(--card);
		box-shadow: 5px 5px 0 var(--ink);
		cursor: pointer;
		padding: 0.55rem;
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
	}

	.die:hover {
		transform: translate(-2px, -2px) rotate(-3deg);
		box-shadow: 7px 7px 0 var(--ink);
	}

	.die:active {
		transform: translate(3px, 3px);
		box-shadow: 2px 2px 0 var(--ink);
	}

	.die.rolling {
		animation: tumble 0.62s ease-in-out;
	}

	@keyframes tumble {
		0% { transform: rotate(0deg) scale(1); }
		30% { transform: rotate(-18deg) scale(1.1); }
		60% { transform: rotate(16deg) scale(1.08); }
		100% { transform: rotate(0deg) scale(1); }
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
		width: 100%;
		height: 100%;
	}

	.cell {
		display: grid;
		place-items: center;
	}

	.pip {
		width: 0.72rem;
		height: 0.72rem;
		border-radius: 50%;
		background: var(--red);
	}
</style>

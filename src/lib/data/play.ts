import live from './fundraising.json';

// The games I actually play. The `why` lines are mine to rewrite whenever the
// mood changes; nothing else on the page depends on their wording.
export const boardGames = {
	// Left empty it renders nothing at all, so there is no half-finished
	// paragraph on the page while you think about it.
	blurb: `The pill that cured my highschool video game addiction. Highly recommended activity for friend meetups, team building events, and even date nights! Here are some of my all time favourites:`,
	games: [
		{
			title: 'Arkham Horror: The Card Game',
			why: 'My favourite game of all time. RPG and deckbuilder in one, with a touch of cosmic horror. What\'s not to like?',
			weight: 'heavy'
		},
		{
			title: 'Dungeons & Dragons',
			why: 'Jumping from Catan to D&D was a parkour-level introduction. Joined for the shiny weird dice, stayed for the infinite possibilities.',
			weight: 'heavy'
		},
		{
			title: 'Root',
			why: 'I love me some asymmetric multi-faction warfare. Even better when the warring factions are cute forest animals. Hard game to master.',
			weight: 'medium'
		},
		{
			title: 'My Father’s Work',
			why: 'The Kickstarter pledge that keeps on giving, where I can throw safety out the window and achieve the full potential of my research! Muahahahaha',
			weight: 'medium'
		},
		{
			title: 'Star Wars Imperial Assault',
			why: 'Speaking of asymmetry, what if the DM could win? And the DM was the strongest intergalactic empire of all time?',
			weight: 'medium'
		},
		{
			title: 'Blood on the Clocktower',
			why: 'The social deduction game that destroyed any semblance of trust in my friends. The amount of lying and scheming that people are capable of...',
			weight: 'heavy'
		},
		{
			title: 'Unstable Unicorns',
			why: 'Building an army of unicorns has never been more stressful and annoying. But even if you don\'t win, at least you can annoy your friends.',
			weight: 'light'
		},
		{
			title: 'Exploding Kittens',
			why: 'The one that even people who don\'t play board games can appreciate. The art is cute, every draw is intense. Good luck surviving the spam attacks in the late game!',
			weight: 'light'
		}
	]
};

// Training, framed by what it was for. The exercise is the mechanism; the
// fundraisers are the point, and they are what the section leads with.
export const training = {
	blurb: `Everyone loves lifting heavy, but the body needs more than that. The body is made to move through
		all its ranges of motion, which makes yoga the perfect medium to practise that, and to bring in
		some mindfulness for an efficient use of my time. The body was also made to run. Anything you
		can do that gets you closer to how our ancestors lived for thousands of years is a good thing
		for not just your body but your mind as well. Plus, once you have had that runner's high, it is
		difficult to stop :).
		I have run a half marathon, and I have been snowboarding every winter for 15 years already.
		Finally, I have used my fitness to take on some fundraising challenges. The results are below,
		and I am still raising, if you are happy to get involved!`,
	fundraisers: [
		{
			cause: 'Cancer Research UK',
			feat: '10 pull-ups a day for a month',
			target: 1000,
			// Scraped from the giving page by scripts/fetch-fundraising.mjs and
			// refreshed by .github/workflows/fundraising.yml. Don't edit by hand.
			raised: live['cancer-research-uk'].raised,
			checked: live['cancer-research-uk'].checked,
			ongoing: true,
			// Add the fundraising link and the card grows a donate button.
			url: 'https://fundraise.cancerresearchuk.org/page/tibi-geo'
		},
		{
			cause: 'Teenage Cancer Trust',
			feat: '100 push-ups a day for a month',
			target: 1000,
			raised: 1000,
			checked: null,
			ongoing: false,
			url: 'https://www.justgiving.com/page/tibi-geo'
		}
	]
};

// The ongoing fundraiser, for the pieces of the page that lead with it (the
// progress bar, and the amount in the browser tab).
export const liveFundraiser = training.fundraisers.find((f) => f.ongoing) ?? null;

export const wingChun = {
	blurb: `Wing Chun is a close-range southern Chinese martial art built on a small number of
		ideas. It was the first art Bruce Lee mastered, taught to him by Grandmaster Ip Man. The
		focus is on perfecting a finite set of moves, applying them through a small set of
		principles, and developing tactile sensitivity through the continuous iteration of drills.
		Through daily, mindful, long-term practice, the art develops a highly adaptive person who
		prioritises efficiency and precision in everything — which translates rather nicely into my
		work.`,
	// Three principles, shown as cards.
	principles: [
		{
			name: 'Centerline Theory',
			gloss: 'The shortest path between you and your opponent is a straight line between your centre and theirs, so whoever controls the centreline controls the game. Very similar to chess.'
		},
		{
			name: 'Chi Sau',
			gloss: 'Also known as "sticky hands", this is the drill that defines Wing Chun. By training the sensitivity of your arms, you stop relying on your eyes in a fight. At close range, you need instinct to react to openings instantly, and to make defence automatic.'
		},
		{
			name: 'Adaptability',
			gloss: 'You never force a plan. You stay ready to adapt to whatever your opponent, or the world, is throwing at you. This is the concept that ties in surprisingly closely to my research.'
		}
	]
};

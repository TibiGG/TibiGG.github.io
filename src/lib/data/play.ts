import live from './fundraising.json';

// The games I actually play. The `why` lines are mine to rewrite whenever the
// mood changes; nothing else on the page depends on their wording.

export const games = [
	{
		title: 'Dungeons & Dragons',
		why: 'The one where the rulebook is a starting position rather than a constraint. A d20 and a table willing to argue with it will carry a story further than any board will.',
		weight: 'heavy'
	},
	{
		title: 'Arkham Horror: The Card Game',
		why: 'A campaign that remembers what you did to it. Your deck carries the scars from one scenario to the next.',
		weight: 'heavy'
	},
	{
		title: 'Root',
		why: 'Asymmetry as a lifestyle: four factions that barely share a rulebook, let alone a strategy.',
		weight: 'medium'
	},
	{
		title: 'My Father’s Work',
		why: 'A Kickstarter pledge that turned into a legacy game about inheriting a mad scientist’s laboratory, and his unfinished experiments.',
		weight: 'heavy'
	},
	{
		title: 'Blood on the Clocktower',
		why: 'Social deduction where the dead keep talking. Everyone plays to the end, and the Storyteller bends the truth for a living.',
		weight: 'medium'
	},
	{
		title: 'Unstable Unicorns',
		why: 'Build a herd, ruin someone else’s. Cheerful art doing a poor job of hiding how mean the table gets.',
		weight: 'light'
	},
	{
		title: 'Exploding Kittens',
		why: 'Russian roulette for people who like cats. Teaches a table the shape of a push-your-luck game in about four minutes.',
		weight: 'light'
	}
];

// Training, framed by what it was for. The exercise is the mechanism; the
// fundraisers are the point, and they are what the section leads with.
export const training = {
	blurb: `Yoga, running and strength work, on much the same bargain as Wing Chun: a small thing
		repeated daily until it stops being a decision. A half marathon is the furthest that has
		taken me so far. Winters go to snowboarding, which I have been doing for more than half
		my life by now. Twice it has been more interesting to point the habit at something other
		than myself.`,
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

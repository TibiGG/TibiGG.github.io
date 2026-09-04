import live from './fundraising.json';
import { snowboardSeasons, lifeShare } from '$lib/elapsed';

// The games I actually play. The `why` lines are mine to rewrite whenever the
// mood changes; nothing else on the page depends on their wording.
//
// `bgg` is the game's BoardGameGeek page, so a reader can go and look it up
// rather than take my word for it. BGG resolves on the numeric id and ignores
// the slug after it, so these survive a rename upstream. D&D is the odd one
// out: it is a role-playing game, so it has no entry in BGG's board game
// database and the link goes to its RPG family page on the same site.
export const boardGames = {
	// Left empty it renders nothing at all, so there is no half-finished
	// paragraph on the page while you think about it.
	blurb: `The pill that cured my video game addiction. Highly recommended activity for friend meetups and team building events! Here are some of my all time favourites:`,
	// Rendered under the shelf, tied to the asterisk in the D&D card. Set it to an
	// empty string and the note disappears along with its rule.
	footnote: `* I know the phrasing sounds AI generated. But it sounds pretty good, and I wrote it, so I'm keeping it.`,
	games: [
		{
			title: 'Arkham Horror: The Card Game',
			why: 'My favourite game of all time. RPG and deckbuilder in one, with a touch of cosmic horror. What\'s not to like?',
			weight: 'heavy',
			bgg: 'https://boardgamegeek.com/boardgame/205637/arkham-horror-the-card-game'
		},
		{
			title: 'Dungeons & Dragons',
			why: 'Jumping from Catan to D&D was a parkour-level introduction. Joined for the cool weird dice, stayed for the infinite possibilities*.',
			weight: 'heavy',
			bgg: 'https://boardgamegeek.com/rpgfamily/192/dungeons-and-dragons'
		},
		{
			title: 'Root',
			why: 'I love me some asymmetric multi-faction warfare. Even better when the warring factions are cute forest animals. Bloody hard game to master.',
			weight: 'medium',
			bgg: 'https://boardgamegeek.com/boardgame/237182/root'
		},
		{
			title: 'My Father’s Work',
			why: 'The Kickstarter pledge that keeps on giving, where I can throw safety out the window and achieve the full potential of my research! Muahahahaha',
			weight: 'medium',
			bgg: 'https://boardgamegeek.com/boardgame/328866/my-fathers-work'
		},
		{
			title: 'Star Wars Imperial Assault',
			why: 'Speaking of asymmetry, what if the DM could win? And the DM was the strongest intergalactic empire of all time?',
			weight: 'medium',
			bgg: 'https://boardgamegeek.com/boardgame/164153/star-wars-imperial-assault'
		},
		{
			title: 'Blood on the Clocktower',
			why: 'The social deduction game that destroyed any semblance of trust in my friends. The amount of lying and scheming that people are capable of...',
			weight: 'heavy',
			bgg: 'https://boardgamegeek.com/boardgame/240980/blood-on-the-clocktower'
		},
		{
			title: 'Unstable Unicorns',
			why: 'Building an army of unicorns has never been more stressful and annoying. But even if you don\'t win, at least you can annoy your friends.',
			weight: 'light',
			bgg: 'https://boardgamegeek.com/boardgame/234190/unstable-unicorns'
		},
		{
			title: 'Exploding Kittens',
			why: 'The one that even people who don\'t play board games can appreciate. The art is cute, every draw is intense. Hint: hoard the attack cards!',
			weight: 'light',
			bgg: 'https://boardgamegeek.com/boardgame/172225/exploding-kittens'
		}
	]
};

// Training, framed by what it was for. The exercise is the mechanism; the
// fundraisers are the point, and they are what the section leads with.
export const training = {
	// A getter, not a plain string, because the snowboarding count is worked out
	// at render rather than frozen into the file. See $lib/elapsed.
	get blurb() {
		return `We are all aware of "Mens sana in corpore sano", but work, stress and deadlines can make
		things more complicated. So, to enable this balance, I like to motivate my fitness habits with a reason 
		to stay consistently healthy and fit (other than the obvious goal of staying healthy and fit). 
		I like to train for challenges. I ran a half marathon, I do yoga every day, and I have been snowboarding every winter for ${snowboardSeasons()} seasons already.
			Recently, I started taking on some fundraising challenges. The results are below,
			and I am still raising, if you are happy to get involved!`;
	},
	// Newest first: the top card is the one the page leads with, and the one whose
	// total goes in the browser tab.
	//
	// `when` is the month the physical challenge ran, which is not the same as how
	// long the page keeps taking money — the August pull-ups are done, but the
	// CRUK page is still open. `reached` is the day the target was actually hit,
	// so only a fundraiser that got there has one.
	fundraisers: [
		{
			cause: 'Sands',
			// The charity itself, not the giving page, for a reader who wants to know
			// what the money is actually for.
			charity: 'https://www.sands.org.uk',
			feat: 'Run 50k in a month',
			when: '2026-09',
			target: 500,
			raised: live['sands'].raised,
			checked: live['sands'].checked,
			reached: null,
			ongoing: true,
			url: 'https://fundraising.sands.org.uk/fundraisers/tibigeo/run-50k-in-sept'
		},
		{
			cause: 'Cancer Research UK',
			charity: 'https://www.cancerresearchuk.org',
			feat: '10 pull-ups a day for a month',
			when: '2026-08',
			target: 200,
			// Scraped from the giving page by scripts/fetch-fundraising.mjs and
			// refreshed by .github/workflows/fundraising.yml. Don't edit by hand.
			raised: live['cancer-research-uk'].raised,
			checked: live['cancer-research-uk'].checked,
			reached: null,
			ongoing: true,
			// Add the fundraising link and the card grows a donate button.
			url: 'https://fundraise.cancerresearchuk.org/page/tibi-geo'
		},
		{
			cause: 'Teenage Cancer Trust',
			charity: 'https://www.teenagecancertrust.org',
			feat: '100 push-ups a day for a month',
			when: '2025-11',
			// TODO: yours to fill in — the day the £1,000 was crossed. I have no
			// record of it and the JustGiving page no longer publishes its donation
			// dates. The card grows 'target reached ...' as soon as this is a date.
			reached: null,
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
			name: 'Centreline Theory',
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

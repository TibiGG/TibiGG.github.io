// Facts about elapsed time, computed rather than typed. Anything written down
// as a number here ("more than half my life", "for 16 years") is a fact with a
// shelf life, and a personal site is exactly the kind of thing that goes three
// years without an edit.
//
// These are evaluated during render, so the prerendered HTML is right as of the
// last deploy and the page corrects itself in the browser after that.

// The winter you were 10: born 4 September 1999, so age 10 ran from September
// 2009 to September 2010, and the only winter inside it is the 2009–10 season.
// Seasons are named for the year they start in, so that is season 2009.
const FIRST_SNOWBOARD_SEASON = 2009;

// A representative mid-season date for the first season, used for the "share of
// my life" arithmetic. The exact day is long gone; a month either way moves the
// answer by nothing that survives rounding.
const SNOWBOARDING_SINCE = new Date('2010-01-01');

// Only used to work out what fraction of a life the above adds up to. If you
// would rather not have a full date of birth sitting in a public repo, delete
// this and `lifeShare()` with it; `snowboardSeasons()` does not need it.
const BIRTH = new Date('1999-09-04');

const YEAR_MS = 365.2425 * 24 * 60 * 60 * 1000;
const yearsBetween = (from: Date, to: Date) => (to.getTime() - from.getTime()) / YEAR_MS;

// Northern-hemisphere seasons start in December, so the count ticks over then
// rather than on 1 January. Counts seasons started, including the current one.
export function snowboardSeasons(now: Date = new Date()): number {
	const lastDecember = now.getMonth() >= 11 ? now.getFullYear() : now.getFullYear() - 1;
	return lastDecember - FIRST_SNOWBOARD_SEASON + 1;
}

// The claim in words, so it keeps up on its own. Crossed half in April 2020,
// reaches two thirds in August 2030 and three quarters at the end of 2040.
export function lifeShare(now: Date = new Date()): string {
	const share = yearsBetween(SNOWBOARDING_SINCE, now) / yearsBetween(BIRTH, now);
	if (share >= 0.75) return 'three quarters of my life';
	if (share >= 2 / 3) return 'two thirds of my life';
	if (share >= 0.5) return 'more than half my life';
	return 'a good chunk of my life';
}

// The academic record that isn't papers: talks given, reviewing done, and work
// aimed at people outside the field.
//
// All three lists start empty. Every section that reads them, on /research and
// on /cv, only renders when its list has something in it, so the site stays
// honest while you fill these in. Each type has a worked example above it; copy
// it into the array and edit.

export type Presentation = {
	title: string;
	event: string; // conference, workshop, seminar series, lab meeting
	place: string; // city, or 'online'
	date: string; // ISO, YYYY-MM-DD (the day, or the first of the month if you only recall that)
	// What you actually did. Shapes the label on the card.
	kind?: 'talk' | 'invited talk' | 'poster' | 'demo' | 'panel';
	// Link to slides, a recording, or the event page.
	url?: string;
};

/* Example. Delete the comment markers and edit:
{
	title: 'Adaptive GR(1) Specification Repair for Liveness-Preserving Shielding',
	event: 'NeSy 2026',
	place: 'online',
	date: '2026-09-01',
	kind: 'talk',
	url: 'https://nesy-ai.org/conferences/nesy-2026'
}
*/
export const presentations: Presentation[] = [];

export type Review = {
	venue: string; // 'AAMAS', 'ICSE', 'Journal of Automated Reasoning'
	// Sub-reviewing under a supervisor is the normal way PhD students start, and
	// it counts. Say so plainly rather than inflating it to 'reviewer'.
	role: 'reviewer' | 'sub-reviewer' | 'PC member' | 'artifact evaluation';
	years: number[];
	// 'conference', 'workshop' or 'journal', shown as a small label.
	type?: 'conference' | 'workshop' | 'journal';
	url?: string;
};

/* Example:
{ venue: 'AAMAS', role: 'sub-reviewer', years: [2024, 2025], type: 'conference' }
*/
export const peerReview: Review[] = [];

export type Outreach = {
	title: string;
	// Who it was for: a school, a festival, the public, prospective students.
	audience: string;
	date: string; // ISO
	kind?: 'talk' | 'workshop' | 'demo' | 'mentoring' | 'writing' | 'volunteering';
	place?: string;
	// One or two sentences: what you did and why it mattered.
	blurb?: string;
	url?: string;
};

/* Example:
{
	title: 'What is a formal specification, and why would a robot need one?',
	audience: 'Sixth-form students',
	date: '2025-03-12',
	kind: 'talk',
	place: 'Imperial College London',
	blurb: 'A department open day session on why we write down what software must never do.'
}
*/
export const outreach: Outreach[] = [];

// The academic record that isn't papers: talks given, reviewing done, and work
// aimed at people outside the field.
//
// Every section that reads these, on /research and on /cv, only renders when its
// list has something in it, so the site stays honest while they fill up.
//
// `draft: true` keeps an entry out of the build. Several below are drafted from
// what you remembered but are still missing a date or the exact name of the
// event, and a CV with a wrong date on it is worse than a CV with one fewer
// line. Fill in the TODOs, drop the draft flag, and the entry appears on both
// /research and /cv with no other change needed.

export type Presentation = {
	title: string;
	event: string; // conference, workshop, seminar series, lab meeting
	place: string; // city, or 'online'
	// As precise as you actually remember: 'YYYY', 'YYYY-MM' or 'YYYY-MM-DD'.
	// A bare year is a perfectly normal way to list a talk, and it beats
	// inventing a month to satisfy a format.
	date: string;
	// What you actually did. Shapes the label on the card.
	kind?: 'talk' | 'invited talk' | 'poster' | 'demo' | 'panel';
	// Link to slides, a recording, or the event page.
	url?: string;
	// Incomplete, so it stays out of the build. See the note at the top.
	draft?: boolean;
};

const allPresentations: Presentation[] = [
	{
		// Your own work, to your cohort.
		title: 'Adaptive GR(1) Specification Repair for Liveness-Preserving Shielding',
		event: 'STAI CDT Student Seminar',
		place: 'London',
		date: '2025',
		kind: 'talk'
	},
	{
		title: 'Inductive Adaptation of GR(1) Specifications to Environment Changes',
		event: 'STAI CDT Student Seminar',
		place: 'London',
		date: '2024',
		kind: 'talk'
	},
	{
		// Someone else's paper, presented because you found it interesting. Worth
		// distinguishing from your own work: it shows reading, not results.
		title: 'Just-in-Time Reactive Synthesis (paper presentation)',
		event: 'STAI CDT First Year Reading Group',
		place: 'London',
		date: '2023',
		kind: 'talk'
	}
];

export const presentations = allPresentations.filter((p) => !p.draft);

export type Review = {
	venue: string; // 'AAMAS', 'ICSE', 'Journal of Automated Reasoning'
	// Sub-reviewing under a supervisor is the normal way PhD students start, and
	// it counts. Say so plainly rather than inflating it to 'reviewer'.
	role: 'reviewer' | 'sub-reviewer' | 'PC member' | 'artifact evaluation';
	years: number[];
	// 'conference', 'workshop' or 'journal', shown as a small label.
	type?: 'conference' | 'workshop' | 'journal';
	url?: string;
	draft?: boolean;
};

// TODO: you said there were more venues. Add a line each as they come back.
const allPeerReview: Review[] = [
	{
		// Nominated to the programme committee when NeSy expanded its PC for the
		// Phase II pool, so this is PC membership rather than a single review, and
		// it is listed publicly in the proceedings.
		venue: 'NeSy',
		role: 'PC member',
		years: [2026],
		type: 'conference'
	},
	{
		// RA-L is a journal, not a conference, and the invitation came to you by
		// name rather than through a supervisor, so this one is 'reviewer'.
		venue: 'IEEE Robotics and Automation Letters (RA-L)',
		role: 'reviewer',
		years: [2025],
		type: 'journal',
		url: 'https://www.ieee-ras.org/publications/ra-l'
	},
	{ venue: 'IROS', role: 'reviewer', years: [2022], type: 'conference' },
	{
		// The one sub-review, passed down by your supervisor. Everything about it
		// is still to be recovered except that it happened.
		venue: '', // TODO: which venue, and which year
		role: 'sub-reviewer',
		years: [],
		draft: true
	}
];

export const peerReview = allPeerReview.filter((r) => !r.draft);

export type Outreach = {
	title: string;
	// Who it was for: a school, a festival, the public, prospective students.
	audience: string;
	date: string; // 'YYYY', 'YYYY-MM' or 'YYYY-MM-DD', as with a presentation
	kind?: 'talk' | 'workshop' | 'demo' | 'mentoring' | 'writing' | 'volunteering';
	// The exhibition, festival or open day this was part of. Named events lead
	// the line, because "an exhibition at King's" is weaker than its actual name.
	event?: string;
	place?: string;
	// One or two sentences: what you did and why it mattered.
	blurb?: string;
	url?: string;
	draft?: boolean;
};

const allOutreach: Outreach[] = [
	{
		title: 'Human or machine? A live Turing test',
		audience: 'General public',
		// The exhibition ran 2 May – 30 June 2023. Narrow this to '2023-05' or a
		// full date if you remember which day you were on the floor.
		date: '2023',
		kind: 'demo',
		event: 'Bringing the Human to the Artificial',
		place: 'Bush House, King’s College London',
		blurb: `Two visitors were handed a tablet each and had to work out, from the conversation
			alone, whether they were talking to a language model or to the other visitor. A public
			demo finding out whether the state-of-the-art LLMs could pass for a human.`,
		url: 'https://www.kcl.ac.uk/ai/exhibition-2023'
	}
];

export const outreach = allOutreach.filter((o) => !o.draft);

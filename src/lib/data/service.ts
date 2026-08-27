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
		// The poster for the NeSy paper. Dated ahead of the conference on purpose:
		// the paper is already published and on arXiv, and a forthcoming poster at
		// an accepted venue is a normal CV line. Title is the poster's own, which
		// hyphenates 'GR(1)-Specification' where the paper does not.
		title:
			'Adaptive GR(1)-Specification Repair for Liveness-Preserving Shielding in Reinforcement Learning',
		event: 'NeSy 2026 — 20th International Conference on Neurosymbolic Learning and Reasoning',
		place: 'Lisbon',
		// The conference runs 1–4 September 2026; narrow this to the day once you
		// know which session you are in.
		date: '2026-09',
		kind: 'poster'
	},
	{
		// No paper attached: a networking conference across the AI CDTs, where the
		// poster was the reason to be in the room. Worth listing as what it was.
		title: 'Analysing Adaptations of GR(1) Specifications',
		event: 'UKRI Inter AI CDT Conference',
		place: 'Bath',
		// The conference ran 28–29 October 2025 and the poster stood across it.
		date: '2025-10',
		kind: 'poster',
		url: 'https://cdt-art-ai.ac.uk/news/events/ukri-inter-ai-cdt-conference-2025/'
	},
	{
		// Read off the poster PDF rather than the calendar invite, so the title is
		// the one that was actually on the wall.
		title:
			'Analysing Adaptations of GR(1) Specifications: How to adapt to unexpected environment changes',
		// TODO: check the event's official name — taken from the subject line of
		// your invitation ("core STAI CDT showcase event to engage with industry"),
		// which is a description rather than a title.
		event: 'STAI CDT Industry Showcase',
		place: 'London',
		date: '2025-06-11',
		kind: 'poster'
	},
	{
		// Your own work, to your cohort. This is the shielding work a year before
		// it became the NeSy paper, under the title it carried at the time — the
		// LTL framing came first, GR(1) and 'liveness-preserving' came later.
		title: 'Safe Adaptation from Unexpected Failures: An Interpretable Shielding Framework for RL',
		event: 'STAI CDT Student Seminar',
		place: 'London',
		date: '2024-11-06',
		kind: 'talk'
	},
	{
		title: 'Inductive Adaptation of GR(1) Specifications to Environment Changes',
		event: 'STAI CDT Student Seminar',
		place: 'London',
		date: '2024-04-17',
		kind: 'talk'
	},
	{
		// Title off the poster PDF. The earliest framing of the work, and the only
		// one that named the tool: the later posters dropped 'ReSynthesise' and
		// led with the research question instead.
		title: 'ReSynthesise: Repairing Formal Specifications via Iterative Weakening',
		event: '2024 IEEE RAS Summer School on Multi-Robot Systems',
		place: 'Prague',
		// The school ran 29 July – 2 August 2024. Kept to the month rather than
		// asserting the 29th, since you were not sure which day you presented.
		date: '2024-07',
		kind: 'poster'
	},
	{
		// Title confirmed off the poster PDF. What is still undecided is whether
		// this belongs here at all: a Late Stage Review is an internal Imperial
		// progression assessment, not a venue you were selected for, and a panel
		// reads it as a milestone you passed rather than a presentation you gave.
		// It is also the same poster as the June 2025 showcase entry, relaid out
		// landscape. Published anyway, on your call: the two dates show the work
		// being carried from an internal review out to an industry audience.
		title:
			'Analysing Adaptations of GR(1) Specifications: How to adapt to unexpected environment changes',
		event: 'Late Stage Review, Department of Computing',
		place: 'Imperial College London',
		date: '2024-12-06',
		kind: 'poster'
	},
	{
		// Someone else's paper, presented because you found it interesting. Worth
		// distinguishing from your own work: it shows reading, not results.
		title: 'Just-in-Time Reactive Synthesis (paper presentation)',
		event: 'STAI CDT Journal Club',
		place: 'London',
		date: '2023-03-20',
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

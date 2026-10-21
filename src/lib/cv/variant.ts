// A CV variant is the same data as /cv, cut and ordered for one kind of
// application. The public /cv is one variant (`publicCv` below), so the site
// keeps generating exactly as before; the tailored ones live in the gitignored
// applications/cv/ folder, render at /cv/<name>/ under `vite dev` only, and are
// printed to PDF by `npm run cv:variant`.
//
// The shape follows the advice you were given in Oct 2026: two pages that hold
// everything a panel needs, then an appendix of up to two more for the rest.

export type SectionKey =
	| 'summary' // the variant's own profile paragraph
	| 'education'
	| 'academic'
	| 'enterprise'
	| 'industry'
	| 'projects' // undergraduate team projects, from projects.ts
	| 'publications'
	| 'funding'
	| 'supervision'
	| 'presentations'
	| 'review'
	| 'engagement'
	| 'competitions'
	| 'skills';

export type CvVariant = {
	// For you, not the reader: what this cut is for.
	purpose?: string;
	// Three or four lines at the top: what you do, the milestones you hit, and
	// where the work goes next. The one place a variant says anything the data
	// does not.
	summary?: string;
	// The first two pages, in order.
	main: SectionKey[];
	// Everything after the break, under 'Additional information'. A key that is
	// in both lists, with a `limit`, continues here: the first `limit` entries
	// sit in the main part and the rest move to the appendix.
	appendix?: SectionKey[];
	limit?: Partial<Record<SectionKey, number>>;
	// Like `limit`, but by name: the entries whose title (or project name) is
	// listed stay in the main part; the rest go to the appendix if the section
	// is in it too.
	keep?: Partial<Record<SectionKey, string[]>>;
	heading?: Partial<Record<SectionKey, string>>;
	// A short note under a section's heading, for what holds across every entry
	// in it, so the entries don't each repeat it. A list prints as skill-first
	// bullets, the same as an entry's.
	intro?: Partial<Record<SectionKey, string | string[]>>;
	// Drops the lines a two-page CV cannot afford: the per-role skills tags, the
	// tech stacks and challenge lines on competitions, one course per line.
	compact?: boolean;
	// Sections that keep their full detail in a compact CV.
	full?: SectionKey[];
	// Prints team size and lead roles on projects and competitions.
	teamwork?: boolean;
	// Prints degree results (averages, Dean's List) under each degree.
	grades?: boolean;
	// Leaves out who supervised each degree: an academic panel looks for it, an
	// engineering hiring manager does not.
	hideSupervisors?: boolean;
	// Links each competition's project name to its demo or write-up.
	linkCompetitions?: boolean;
	// Prints each entry's `bullets` (skill first, then the evidence) in place of
	// its paragraph. Entries with no bullets keep their paragraph.
	bullets?: boolean;
	// This application's own bullets for an entry, keyed by its title (a
	// degree's name, a role's title, a project's title). Replaces that entry's
	// bullets from the data files, for this variant only.
	rewrite?: Record<string, string[]>;
	// This application's own languages-and-tools groups, in place of the ones in
	// experience.ts: lead with what the advert asks for.
	skills?: Record<string, string[]>;
};

// The public CV, section for section as it was before variants existed.
export const publicCv: CvVariant = {
	main: [
		'education',
		'academic',
		'enterprise',
		'industry',
		'publications',
		'funding',
		'supervision',
		'presentations',
		'review',
		'engagement',
		'competitions',
		'skills'
	]
};

// The PhD's supervisors are recorded once, on the thesis in `publications.ts`,
// and read from there below. Imperial's ad asks for degrees on the CV and a
// doctorate is normally listed with who supervised it, but a name copied into
// two files is a name that will eventually disagree with itself.
import { thesis } from './publications';

export type Role = {
	title: string;
	org: string;
	start: string; // YYYY-MM
	end: string; // YYYY-MM, or 'present'
	// Which half of the CV's experience section this belongs under. Research and
	// teaching read as one career; a company internship reads as another.
	track: 'academic' | 'industry';
	skills: string[];
	// What the role actually involved. One sentence, present on the CV only.
	detail?: string;
	// The courses a teaching role covered. Listing them is the whole point:
	// "teaching assistant" says nothing, the course names say which material you
	// know well enough to support and assess others on.
	//
	// Deliberately not called "taught": neither of these roles involved lecturing,
	// and the `detail` line above says what the work actually was.
	courses?: string[];
	link?: string;
};

export type Study = {
	degree: string;
	org: string;
	start: string;
	end: string;
	thesis: string;
	// Set this and the title becomes a link, on the home page and on the CV.
	// Prefer an institutional URL (Imperial's Spiral) over a PDF in static/: it
	// outlives the repo and keeps a large binary out of it. A thesis belongs here
	// rather than in `publications`, which is for peer-reviewed work.
	thesisUrl?: string;
	// Who supervised it. Shown under the thesis line on the CV.
	supervisors?: string[];
	inProgress?: boolean;
};

export const roles: Role[] = [
	{
		title: 'Graduate Teaching Assistant',
		org: 'Imperial College London',
		start: '2022-10',
		end: '2025-08',
		track: 'academic',
		detail:
			'Marked coursework across the undergraduate curriculum, including assessed individual coursework and group projects counting towards students’ final marks, and supported students through exercises during classes and tutorial sessions.',
		// TODO: add the rest of the courses I marked as GTA.
		courses: [
			'Operating Systems',
			'Introduction to Machine Learning',
			'Programming',
			'Software Systems Engineering',
			'Knowledge Representation',
			'Logic',
			'Discrete Mathematics'
		],
		skills: ['Assessed marking & feedback', 'In-class support']
	},
	{
		title: 'Undergraduate Teaching Assistant',
		org: 'Imperial College London',
		start: '2020-10',
		end: '2022-07',
		track: 'academic',
		detail:
			'Taught weekly tutorials to small groups, clarifying theoretical concepts and working through selected exercises, and marked their coursework. Also supported students in tutorial sessions on Programming.',
		courses: [
			'Discrete Mathematics',
			'Logic',
			'Reasoning about Programs',
			'Graphs & Algorithms',
			'Programming'
		],
		skills: ['Small-group teaching', 'Marking & feedback', 'In-class support']
	},
	{
		title: 'Undergraduate Research Opportunity Programme',
		org: 'Imperial College London',
		start: '2019-06',
		end: '2019-08',
		track: 'academic',
		detail: 'Researched the application of GANs (Generative Adversarial Networks) to speech transfer between emotion domains, finding StarGANs effective for multi-domain transfer.',
		skills: ['GAN R&D', 'TensorFlow', 'Deep learning']
	},
	{
		title: 'Member of Technical Staff Intern',
		org: 'Nutanix',
		start: '2021-06',
		end: '2021-10',
		track: 'industry',
		// TODO: the specifics are the whole value of this entry for a systems or
		// verification post — what the patches actually did, and what the report
		// concluded. Two clauses would make this the strongest line on the CV for
		// that kind of role. Deliberately not guessed.
		// Precise about what went upstream: a QEMU patch was accepted; the kernel
		// change was submitted and turned down as too narrow for the wider user
		// base, and lives in Nutanix's tree. 'Patches upstreamed to both' was
		// wrong and is the kind of claim a systems reviewer would check.
		detail:
			'Systems R&D in C on the Linux kernel and QEMU layers of the hypervisor. Upstreamed a patch to QEMU; the kernel work is maintained in Nutanix’s own tree. Written up as an internal report and presented company-wide.',
		skills: [
			'Hypervisor internals',
			'Linux kernel & QEMU',
			'C',
			'Open-source contribution',
			'Technical writing'
		]
	},
	{
		title: 'Teaching Unreal Engine game development',
		// The school's own name, kept exactly as it styles itself.
		org: 'International Computer High School of Constanta',
		start: '2017-10',
		end: '2018-06',
		track: 'industry',
		detail: 'Designed and delivered a game development course to high-school students.',
		skills: ['Lecturing', 'OOP', 'C++', 'Unreal Engine'],
		link: 'https://www.linkedin.com/pulse/first-kinda-job-teaching-game-development-tiberiu-andrei-georgescu'
	}
];

// The CV splits these; the rest of the site treats `roles` as one list.
export const academicRoles = roles.filter((r) => r.track === 'academic');
export const industryRoles = roles.filter((r) => r.track === 'industry');

export const education: Study[] = [
	{
		degree: 'PhD, Safe and Trusted AI',
		org: 'Imperial College London',
		start: '2022-10',
		end: 'present',
		thesis: 'Inductive Adaptation of GR(1) Specifications to Environment Changes',
		supervisors: thesis.supervisors,
		inProgress: true
	},
	{
		degree: 'MEng Computing, First-Class Honours',
		org: 'Imperial College London',
		start: '2018-10',
		end: '2022-07',
		thesis:
			'Towards Rebound-Focused Reinforcement Learning: Solving Deadlocks in Traffic Intersections',
		supervisors: ['Dario Paccagnan', 'Panagiotis Angeloudis'],
		// Published with permission: the copyright is mine under Imperial's
		// guidelines. Served from static/, which is why the 1.5 MB PDF is now
		// tracked in git rather than ignored.
		thesisUrl: '/masters-thesis.pdf'
	}
];

// Imperial's ad asks the CV for "past and current funding (please state your role
// in the project and make clear what share of the funding was awarded to you
// personally vs the consortium as a whole)". That last clause is the whole point
// of the field, so `share` is required rather than optional: an amount with no
// indication of whose it was is the ambiguity they are explicitly asking you to
// remove.
export type Funding = {
	// The award as the funder names it, not a paraphrase.
	title: string;
	funder: string; // 'EPSRC', 'UKRI', 'Royal Society'
	start: string; // 'YYYY' or 'YYYY-MM'
	end: string; // 'YYYY', 'YYYY-MM', or 'present'
	// What you were on it: a studentship holder is not a co-investigator, and a
	// panel reads the difference immediately.
	role: 'studentship holder' | 'principal investigator' | 'co-investigator' | 'named researcher';
	// The funder's grant reference, where the award has one.
	reference?: string;
	// Whose money this was. Say the personal figure when the award was made to
	// you, and name the consortium total separately when it was not.
	share: string;
	url?: string;
	draft?: boolean;
};

// The STAI CDT studentship is live on the CV. The grant reference and the cash
// value of the award still have to come off the offer letter or the CDT
// administrator; `share` answers the ad's actual question — whose money this is —
// without inventing a figure, and gains the number when you have it.
const allFunding: Funding[] = [
	{
		title: 'UKRI Centre for Doctoral Training in Safe and Trusted AI — PhD studentship',
		funder: 'UKRI / EPSRC',
		start: '2022-10',
		end: '2026',
		role: 'studentship holder',
		// The CDT's EPSRC grant, as STAI students cite it in acknowledgements.
		// It is the centre's award rather than a reference issued to you, which
		// is why `share` sits next to it saying which part of the money was
		// yours. Your offer letter may also carry a student-specific number.
		reference: 'EP/S023356/1',
		// TODO: add the cash figure — fees + stipend over the four years — once you
		// have it off the offer letter. That is the personal figure the ad asks
		// for; the CDT's overall centre grant is the consortium figure and is a
		// different number.
		share: 'full fees and stipend, awarded to me personally',
		url: 'https://safeandtrustedai.org/'
	}
];

export const funding = allFunding.filter((f) => !f.draft);

// The ad asks separately for "supervision". It means supervision you have given
// — undergraduate, MRes and MSc projects — not the people who supervised you;
// those sit on the degree, above. Worth listing even where the role was informal
// or shared with a supervisor, as long as the line says which it was.
export type Supervision = {
	// The student's project, or their name if you would rather lead with it.
	// A project title tells a panel what you can supervise.
	project: string;
	// 'MEng project', 'MSc thesis', 'UROP student', 'summer intern'.
	level: string;
	org: string;
	year: string; // 'YYYY' or 'YYYY–YYYY'
	// Sole, joint, or day-to-day supervision under a named academic. Say which.
	role?: string;
	outcome?: string; // 'grade awarded', 'led to a paper', where it applies
	draft?: boolean;
};

// TODO: empty because I have no record of it either way. If you co-supervised or
// gave day-to-day supervision to any UROP, MEng or MSc student — including
// informally, alongside Dalal or Sebastian — add a line each and the section
// appears on the CV. If you genuinely have not supervised anyone yet, leave this
// empty and say so in the teaching statement instead; an absent section is
// better than a thin one.
const allSupervision: Supervision[] = [];

export const supervision = allSupervision.filter((s) => !s.draft);

// Held back from the whole site, the same way a drafted post is: the languages
// you happen to know say less than the research, the teaching and the writing do,
// and they were competing with them for a reader's attention. Nothing is deleted
// — set this to false and the sections reappear on the home page and the CV,
// including in the printed and downloadable PDF.
export const skillsDraft = false;

// Grouped by what the tool is for, not by how good you claim to be at it.
// Self-graded tiers were the previous shape and read badly: 'Experienced' is
// what everyone writes and carries no weight, while 'Intermediate' is taken
// literally, so the CV was volunteering limitations. Grouping by kind also puts
// the rare items first — Clingo and ILASP are the two entries a panel cannot
// assume, and they were previously buried mid-list between Java and Scala.
export const skills = {
	// The four a panel cannot assume, and the ones that name the method: two ILP
	// learners, the ASP solver under them, and the GR(1) synthesiser the thesis
	// is built on.
	'Logic & solvers': ['ILASP', 'FastLAS', 'Clingo', 'Prolog', 'Spectra (GR(1))'],
	// Svelte sits here rather than under Workflow: it is something you write code
	// in, and unlike the tail that was cut, there is a live artefact behind it —
	// this site. Go, Kotlin and Swift came off because exposure to a language is
	// no longer evidence of much when picking one up costs a weekend.
	'Languages & frameworks': [
		'Python',
		'C',
		'C++',
		'Java',
		'Scala',
		'Haskell',
		'JavaScript',
		'SQL',
		'PyTorch',
		'Svelte'
	],
	Workflow: ['Git', 'Bash', 'tmux', 'LaTeX']
};

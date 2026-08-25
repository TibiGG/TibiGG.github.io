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
		end: '2025-10',
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
			'Taught weekly small-group tutorials for small groups of students, clarifying theoretical concepts and working through selected exercises, and marked their coursework. Also supported students in tutorial sessions on Programming.',
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
		detail: 'Did research on the appliation of GANs (Generative Adversarial Networks) on speech transfer between emotion domains. Observed usefulness of StarGANs on multi-domain transfer.',
		skills: ['GAN R&D', 'TensorFlow', 'Deep learning']
	},
	{
		title: 'Member of Technical Staff Intern',
		org: 'Nutanix',
		start: '2021-06',
		end: '2021-10',
		track: 'industry',
		detail: 'R&D on the Linux and QEMU layer of the hypervisor, written up as an internal report & presented company-wide.',
		skills: ['Linux & QEMU R&D', 'C', 'Academic writing', 'Product development']
	},
	{
		title: 'Teaching Unreal Engine game development',
		org: 'High school',
		start: '2017-10',
		end: '2018-06',
		track: 'industry',
		detail: 'Designed and delivered a game development course to highschool students.',
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
			'Towards Rebound-Focused Reinforcement Learning: Solving Deadlocks in Traffic Intersections'
		// TODO: add `supervisors: [...]` — who supervised the MEng project.
		// TODO: pending permission to publish. The PDF is sitting untracked at
		// static/masters-thesis.pdf (gitignored) for local preview. To publish it:
		// add `thesisUrl: '/masters-thesis.pdf'` above and un-ignore the file, or
		// better, point thesisUrl at Imperial's Spiral and leave the binary out of
		// the repo. Run `npm run dev` to see how it looks meanwhile.
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

// TODO: nothing here is public knowledge, so nothing is filled in. The STAI CDT
// studentship is drafted below from what the programme publishes about itself;
// the grant reference and the amount have to come off your offer letter or the
// CDT administrator, and the entry stays out of the build until they do.
const allFunding: Funding[] = [
	{
		title: 'UKRI Centre for Doctoral Training in Safe and Trusted AI — PhD studentship',
		funder: 'UKRI / EPSRC',
		start: '2022-10',
		end: '2026',
		role: 'studentship holder',
		// TODO: the CDT's grant reference. On your offer letter, or ask the CDT
		// administrator. Deliberately left blank rather than guessed.
		reference: undefined,
		// TODO: the value of the studentship awarded to you (fees + stipend over
		// the four years). This is the personal figure the ad asks for; the CDT's
		// overall centre grant is the consortium figure and is a different number.
		share: '',
		url: 'https://safeandtrustedai.org/',
		draft: true
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
export const skillsDraft = true;

// Grouped as the CV groups them, so the ordering stays a deliberate choice.
export const skills = {
	Experienced: ['C', 'Python', 'Java', 'Clingo', 'ILASP', 'Scala', 'Git', 'C++', 'Bash', 'Svelte'],
	Intermediate: ['Swift', 'Haskell', 'JavaScript', 'SQL', 'LaTeX', 'C#', 'Go', 'Kotlin']
};

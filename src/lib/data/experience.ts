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
	// Courses taught, for the teaching roles. Listing them is the whole point:
	// "teaching assistant" says nothing, "taught Logic and Operating Systems"
	// says what you know well enough to teach.
	courses?: string[];
	link?: string;
};

export type Study = {
	degree: string;
	org: string;
	start: string;
	end: string;
	thesis: string;
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
			'Tutored and marked across the undergraduate curriculum, including assessed coursework counting towards students’ final marks.',
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
		skills: ['Tutoring', 'Assessed marking & feedback']
	},
	{
		title: 'Undergraduate Teaching Assistant',
		org: 'Imperial College London',
		start: '2020-10',
		end: '2022-07',
		track: 'academic',
		detail: 'Ran a small tutorial group for first-year foundational courses.',
		courses: ['Discrete Mathematics', 'Logic', 'Reasoning about Programs', 'Graphs & Algorithms'],
		skills: ['Tutoring', 'Marking & feedback']
	},
	{
		title: 'Undergraduate Research Opportunity Programme',
		org: 'Imperial College London',
		start: '2019-06',
		end: '2019-08',
		track: 'academic',
		detail: 'Applied StarGAN to emotional voice conversion, transferring speech between emotion domains.',
		skills: ['StarGAN R&D', 'TensorFlow', 'Deep learning']
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
		detail: 'Designed and delivered a game development course to secondary school students.',
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
		inProgress: true
	},
	{
		degree: 'MEng Computing, First-Class Honours',
		org: 'Imperial College London',
		start: '2018-10',
		end: '2022-07',
		thesis:
			'Towards Rebound-Focused Reinforcement Learning: Solving Deadlocks in Traffic Intersections'
	}
];

// Grouped as the CV groups them, so the ordering stays a deliberate choice.
export const skills = {
	Experienced: ['C', 'Python', 'Java', 'Clingo', 'ILASP', 'Scala', 'Git', 'C++', 'Bash'],
	Intermediate: ['Swift', 'Haskell', 'JavaScript', 'SQL', 'LaTeX', 'C#', 'Go', 'Kotlin']
};

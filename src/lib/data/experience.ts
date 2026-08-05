export type Role = {
	title: string;
	org: string;
	start: string; // YYYY-MM
	end: string; // YYYY-MM, or 'present'
	skills: string[];
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
		title: 'Undergraduate & Graduate Teaching Assistant',
		org: 'Imperial College London',
		start: '2020-10',
		end: '2025-10',
		skills: ['Tutoring', 'Marking & feedback']
	},
	{
		title: 'Member of Technical Staff Intern',
		org: 'Nutanix',
		start: '2021-06',
		end: '2021-10',
		skills: ['Linux & QEMU R&D', 'C', 'Academic writing', 'Product development']
	},
	{
		title: 'Undergraduate Research Opportunity Programme',
		org: 'Imperial College London',
		start: '2019-06',
		end: '2019-08',
		skills: ['StarGAN R&D', 'TensorFlow']
	},
	{
		title: 'Teaching Unreal Engine game development',
		org: 'High school',
		start: '2017-10',
		end: '2018-06',
		skills: ['Lecturing', 'OOP', 'C++', 'Unreal Engine'],
		link: 'https://www.linkedin.com/pulse/first-kinda-job-teaching-game-development-tiberiu-andrei-georgescu'
	}
];

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
		degree: 'MEng Computing — First-Class Honours',
		org: 'Imperial College London',
		start: '2018-10',
		end: '2022-07',
		thesis:
			'Towards Rebound-Focused Reinforcement Learning — Solving Deadlocks in Traffic Intersections'
	}
];

// Grouped as the CV groups them, so the ordering stays a deliberate choice.
export const skills = {
	Experienced: ['C', 'Python', 'Java', 'Clingo', 'ILASP', 'Scala', 'Git', 'C++', 'Bash'],
	Intermediate: ['Swift', 'Haskell', 'JavaScript', 'SQL', 'LaTeX', 'C#', 'Go', 'Kotlin']
};

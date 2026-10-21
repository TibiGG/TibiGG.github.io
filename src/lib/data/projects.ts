// Undergraduate team projects, for the CV variants that make the case for
// organisation and teamwork rather than for research ability. The research
// record already shows you can do the work; these show you can run a team
// through a fixed deadline, which is what a careers adviser told you to put
// in front of panels in Oct 2026.
//
// Sources, so nothing here is remembered rather than recorded: the LaTeX CV in
// ~/Documents/MyCV (its git history has the team sizes and the 'coordinated'
// lines) and your LinkedIn write-ups on ARM11 and WACC. Where those disagree
// with memory, they win.
//
// On the public CV and in the variants; `draft: true` keeps an entry off both.

export type TeamProject = {
	title: string;
	// The module or programme it was for, so a reader can tell coursework from a
	// side project.
	course: string;
	org: string;
	when: string; // 'YYYY' or an academic year, 'YYYY–YY'
	teamSize: number;
	// 'team lead' only where you coordinated the team, which the old CV says
	// in so many words for ARM11 and WACC.
	role: 'team lead' | 'team member';
	// What was built. One sentence.
	summary: string;
	// How the work was run: the planning, the split, the milestones. This is the
	// line the whole section exists for.
	delivery?: string;
	outcome?: string;
	// What the CV variants print in place of summary, delivery and outcome:
	// 'Skill: evidence', the part before the colon in bold.
	bullets?: string[];
	link?: string;
	draft?: boolean;
};

const allProjects: TeamProject[] = [
	{
		title: 'WACC compiler',
		course: 'Compilers group project',
		org: 'Imperial College London',
		when: '2019–20',
		teamSize: 4,
		role: 'team lead',
		summary:
			'Compiler in Scala and ANTLR targeting ARM assembly, with nine extensions including concurrent compilation, SSA form and peephole optimisation.',
		// Only what the old CV and the write-up say. The project's milestone
		// structure is not on record, so it is not claimed.
		delivery: 'Coordinated the team.',
		outcome: '91.5% in the Compilers module.',
		bullets: [
			'Leadership: coordinated a team of four building a compiler for a teaching language.',
			'Engineering: parser and semantic analysis in Scala with ANTLR, code generation to ARM assembly, and nine extensions including parallel compilation, SSA form and a Vim plugin.',
			'Result: 91.5% in the Compilers module.',
		],
		link: 'https://www.linkedin.com/pulse/wacc-compiler-project-tiberiu-andrei-georgescu/'
	},
	{
		title: 'ARM11 emulator, assembler and Raspberry Pi smart mirror',
		course: 'First-year C group project',
		org: 'Imperial College London',
		when: '2019',
		teamSize: 4,
		role: 'team lead',
		summary:
			'ARM11 emulator and assembler in C, extended into a Raspberry Pi smart mirror.',
		// From the write-up: conventions agreed first, the shared utility layer
		// written before the split, one instruction class per person, then one
		// widget per person for the extension.
		delivery:
			'Set the conventions and wrote the shared utility layer first, then split the work one module per member; emulator and assembler done in under a week.',
		outcome: 'On time, near-full marks, and the mirror kept as an award.',
		bullets: [
			'Leadership: agreed coding conventions and wrote the shared utility layer first, then split the work one module per member.',
			'Project management: organised project around milestones: emulator, assembler and extension. Built a Raspberry Pi smart mirror for extension. Everything delivered on time, near-full marks.',
		],
		link: 'https://www.linkedin.com/pulse/project-arm11-raspberry-pi-smart-mirror-tiberiu-andrei-georgescu'
	},
	{
		title: 'Pintos operating system',
		course: 'Operating Systems group project',
		org: 'Imperial College London',
		when: '2019–20',
		teamSize: 4,
		role: 'team member',
		summary:
			'Thread scheduling, user programs and virtual memory for the Pintos teaching kernel, in C.'
	},
	{
		title: 'Design for Real People',
		course: 'Group project for an external client',
		org: 'Imperial College London',
		// TODO: the year, the team size, the client, and whether you led it. The
		// old CV only says 'worked in a team using AGILE development'.
		when: '',
		teamSize: 0,
		role: 'team member',
		summary:
			'A Unity game that crowdsources data for researchers, with a Java back end deployed on Microsoft Azure in Docker containers, built in agile sprints with the client’s stakeholders.',
		draft: true
	}
];

export const teamProjects = allProjects.filter((p) => !p.draft);

export type Publication = {
	title: string;
	authors: string[];
	venue: string;
	year: number;
	status: 'published' | 'in review' | 'preprint';
	links?: { label: string; url: string }[];
	abstract?: string;
};

// NOTE (Claude): seeded from your CV + PhD/JournalPaper. Verify venue/year/status
// on the GR(1) paper — I read the title off the LaTeX source, not a published record.
export const publications: Publication[] = [
	{
		title: 'Learning to adapt GR(1) specifications through degradation',
		authors: ['Tiberiu-Andrei Georgescu', 'Dalal Alrajeh', 'Sebastian Uchitel'],
		venue: 'Journal paper',
		year: 2025,
		status: 'in review',
		abstract: `When a GR(1) specification is unrealisable, the interesting question is not
			"is it broken" but "what is the closest thing to it that isn't". This work learns
			principled degradations of a specification rather than discarding it.`,
		links: []
	},
	{
		title: 'Transferring Multi-Agent Reinforcement Learning Policies for Autonomous Driving',
		authors: ['Tiberiu-Andrei Georgescu'],
		venue: 'IROS 2022',
		year: 2022,
		status: 'published',
		links: [{ label: 'IROS 2022', url: 'https://iros2022.org/' }]
	}
];

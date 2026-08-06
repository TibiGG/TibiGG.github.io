export type Publication = {
	title: string;
	authors: string[];
	venue: string;
	year: number;
	status: 'published' | 'in review' | 'preprint';
	links?: { label: string; url: string }[];
	abstract?: string;
};

// Author lists and titles for the two arXiv entries are taken from the arXiv
// records themselves, not inferred.
export const publications: Publication[] = [
	{
		title: 'Learning to Adapt GR(1) Specifications',
		authors: ['Tiberiu-Andrei Georgescu', 'Dalal Alrajeh', 'Sebastian Uchitel'],
		venue: 'Journal paper',
		year: 2026,
		status: 'in review',
		abstract: `Assume-guarantee specifications for reactive systems lean on their environment
			assumptions being correct — when the assumptions fail, the guarantees can fail with
			them. This work learns the environment's real behaviour with logic-based machine
			learning, then adapts the guarantees to restore correctness via oracle-guided
			inductive synthesis.`,
		links: []
	},
	{
		title:
			'Adaptive GR(1) Specification Repair for Liveness-Preserving Shielding in Reinforcement Learning',
		authors: [
			'Tiberiu-Andrei Georgescu',
			'Alexander W. Goodall',
			'Dalal Alrajeh',
			'Francesco Belardinelli',
			'Sebastian Uchitel'
		],
		venue: 'NeSy 2026',
		year: 2026,
		status: 'published',
		abstract: `Shielding keeps a reinforcement learning agent inside a formal safety
			specification, but the usual shield is static: when the environment stops behaving
			the way the specification assumed, the agent fails quietly. This work detects that
			breakdown and repairs the GR(1) specification at runtime with inductive logic
			programming, weakening goals minimally and only when necessary.`,
		links: [
			{ label: 'arXiv', url: 'https://arxiv.org/abs/2511.02605' },
			{ label: 'NeSy', url: 'https://nesy-ai.org/conferences/nesy-2026' }
		]
	},
	{
		title:
			'Transferring Multi-Agent Reinforcement Learning Policies for Autonomous Driving using Sim-to-Real',
		authors: [
			'Eduardo Candela',
			'Leandro Parada',
			'Luis Marques',
			'Tiberiu-Andrei Georgescu',
			'Yiannis Demiris',
			'Panagiotis Angeloudis'
		],
		venue: 'IROS 2022',
		year: 2022,
		status: 'published',
		abstract: `Multi-agent driving policies trained in simulation rarely survive contact with
			real hardware. Training with MAPPO under domain randomisation and deploying onto the
			physical Duckietown testbed beat the rule-based baseline by 1.85x on average.`,
		links: [
			{ label: 'arXiv', url: 'https://arxiv.org/abs/2203.11653' },
			{ label: 'IROS 2022', url: 'https://iros2022.org/' }
		]
	}
];

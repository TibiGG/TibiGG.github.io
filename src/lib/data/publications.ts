export type Publication = {
	title: string;
	authors: string[];
	venue: string;
	year: number;
	status: 'published' | 'under review' | 'preprint';
	// Decides the BibTeX entry type on the research page: conference papers are
	// @inproceedings, journal submissions @article, anything else @misc.
	kind?: 'inproceedings' | 'article' | 'misc';
	// Cite key. Left off, one is derived as <surname><year><firstword>.
	citeKey?: string;
	links?: { label: string; url: string }[];
	abstract?: string;
};

// The PhD, described for people who won't read the papers.
export const thesis = {
	title: 'Inductive Adaptation of GR(1) Specifications to Environment Changes',
	institution: 'Imperial College London',
	programme: 'PhD, Safe and Trusted AI',
	started: 2022,
	supervisors: ['Dalal Alrajeh', 'Sebastian Uchitel'],
	summary: `Formal specifications, when deployed in real life, may require online adaptation.
		Although methods to perform said adaptation exist and are well studied, the suitability of
		the proposed adaptation has not been sufficiently quantified for logic-based formalisms, diminishing
		trust in the resulting adaptation. This work attempts to fill that gap for GR(1)
		specifications, generating general-purpose properties and rules applicable over a wide
		range of formalisms.`
};

// Author lists and titles for the two arXiv entries are taken from the arXiv
// records themselves, not inferred.
export const publications: Publication[] = [
	{
		title: 'Learning to Adapt GR(1) Specifications',
		authors: ['Tiberiu-Andrei Georgescu', 'Dalal Alrajeh', 'Sebastian Uchitel'],
		venue: 'Journal paper',
		year: 2026,
		status: 'under review',
		kind: 'article',
		abstract: `Assume-guarantee specifications for reactive systems rely on the correctness of
			their environmental assumptions. Should those assumptions fail, the guarantees can fail
			silently with them. This work inductively learns the environment's real behaviour from
			observations, then adapts the guarantees to restore correctness via an oracle-guided
			inductive synthesis loop.`,
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
		kind: 'inproceedings',
		abstract: `Shielding ensures an autonomous agent follows a formal safety specification.
			Not all such specifications, however, make explicit the underlying conditions they
			require to hold, and should those conditions (assumptions) ever break, the shield may no
			longer be enforceable. This work detects that breakdown and repairs the underlying
			specification at runtime with inductive logic programming, degrading safety goals
			minimally and only when necessary.`,
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
		kind: 'inproceedings',
		abstract: `Multi-agent driving policies trained in simulation rarely survive contact with
			real hardware. Training with MAPPO under domain randomisation and deploying onto the
			physical Duckietown testbed beat the rule-based baseline by 1.85x on average.`,
		links: [
			{ label: 'arXiv', url: 'https://arxiv.org/abs/2203.11653' },
			{ label: 'IROS 2022', url: 'https://iros2022.org/' }
		]
	}
];

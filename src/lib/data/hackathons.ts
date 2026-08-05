export type Hackathon = {
	event: string;
	prize: string;
	date: string; // ISO, used for sorting
	project: string;
	tagline: string;
	challenge?: string;
	stack: string[];
	links: { label: string; url: string }[];
	blogPost?: string; // LinkedIn write-up, surfaced as a big obvious button
};

// Seeded from your CV. Add a `blogPost` URL to any of these as you write them up —
// the card grows a "Read the write-up" button automatically.
export const hackathons: Hackathon[] = [
	{
		event: 'Building an AI Scientist Hackathon',
		prize: 'Winner',
		date: '2026-07-03',
		project: 'ReBind: The Personal AI Clinician',
		tagline: 'An agentic clinician that reasons over a patient’s own history.',
		stack: ['Agentic infrastructure', 'React', 'Python'],
		links: [
			{ label: 'Event', url: 'https://luma.com/yw0c3upd' },
			{ label: 'Project', url: 'https://lnkd.in/p/e-Bt_Kef' }
		]
	},
	{
		event: 'OxfordHack 2022',
		prize: 'Most Stylish Hack',
		date: '2022-02-22',
		project: 'StoryTelly',
		tagline: 'Automated generation of animated children’s stories.',
		challenge: 'Build an application showcasing artistic style.',
		stack: ['GPT-3', 'NLP', 'Python'],
		links: [{ label: 'Devpost', url: 'https://devpost.com/software/storytelly' }]
	},
	{
		event: 'ICHack 2022',
		prize: 'Marshall Wace Challenge — Most Entrepreneurial Hack',
		date: '2022-02-08',
		project: 'StartNet',
		tagline: 'Matching entrepreneurs with investors by pitch and shared interests.',
		challenge: 'Build a platform supporting entrepreneurial endeavour.',
		stack: ['NLP', 'Python', 'Databases'],
		links: [{ label: 'Devpost', url: 'https://devpost.com/software/startnet' }]
	},
	{
		event: 'ICHack 2020',
		prize: 'Thought Machine Challenge — Money for Good',
		date: '2020-02-08',
		project: 'Laughable',
		tagline: 'Comedy streaming where the audience pays in proportion to how hard they laughed.',
		challenge: 'Build a platform supporting microtransactions in a way that is good for the world.',
		stack: ['JavaScript', 'Emotion recognition', 'Webex API'],
		links: [{ label: 'Devpost', url: 'https://devpost.com/software/laughable' }]
	},
	{
		event: 'OxfordHack 2019',
		prize: 'Cisco Challenge',
		date: '2019-11-11',
		project: 'VLearning',
		tagline: 'Teaching platform matching teachers to students by interest and skill level.',
		challenge: 'Build an application that helps people connect in a novel way.',
		stack: ['JavaScript', 'Python', 'Cisco Webex API'],
		links: [{ label: 'Devpost', url: 'https://devpost.com/software/vlearning' }]
	},
	{
		event: 'Chainhack24',
		prize: 'Third Place & Decentralized Identity Prize',
		date: '2019-11-17',
		project: 'UnID',
		tagline: 'A smart ID card that decentralises your personal data and answers questions about you without disclosing them.',
		challenge: 'Learn blockchain and build something on it in 24 hours.',
		stack: ['Java', 'Node', 'Blockchain', 'Sovrin'],
		links: [{ label: 'GitLab', url: 'https://gitlab.doc.ic.ac.uk/blockchain-hack18/unid' }],
		blogPost:
			'https://www.linkedin.com/pulse/chainhack24-my-first-hackathon-blockchain-tiberiu-andrei-georgescu/'
	},
	{
		event: 'R. U. Hacking? 2019',
		prize: 'UN SDG 7 & 11 Challenge',
		date: '2019-02-16',
		project: 'Enercom',
		tagline: 'Communities of energy-efficient houses that generate enough power to sustain themselves.',
		challenge: 'Build an application supporting UN Sustainable Development Goals 7 and 11.',
		stack: ['PWA', 'JavaScript', 'Python', 'Java'],
		links: [{ label: 'GitHub', url: 'https://github.com/TibiGG/EnerCom' }]
	},
	{
		event: 'Robotex International 2018',
		prize: 'Second Place — Mega Lego Sumo, Tallinn',
		date: '2018-11-25',
		project: 'Mega Sumo Bot',
		tagline: 'A 3kg Lego sumo robot, scaled up from a design built for a robot a third its weight.',
		challenge: 'Build an up-to-3kg Lego sumo robot.',
		stack: ['RobotC', 'Mechanical design'],
		links: [{ label: 'Robotex', url: 'https://robotex.international/' }]
	},
	{
		event: 'First Tech Challenge Romania 2018',
		prize: 'Competitor',
		date: '2018-01-01',
		project: 'FTC Robot',
		tagline: 'The national round of the FIRST Tech Challenge.',
		stack: ['Java', 'Mechanical design'],
		links: [{ label: 'FTC Romania', url: 'https://natieprineducatie.ro/' }]
	},
	{
		event: 'Infomatrix 2017',
		prize: 'First Prize — Lego Sumo',
		date: '2017-01-01',
		project: 'Lego Sumo Bot',
		tagline: 'Two robots, one ring, one of them still standing.',
		stack: ['RobotC', 'Mechanical design'],
		links: [{ label: 'Infomatrix', url: 'http://infomatrix.ro/' }]
	},
	{
		event: 'Infomatrix 2016',
		prize: 'First Prize — Lego Sumo',
		date: '2016-06-01',
		project: 'Lego Sumo Bot',
		tagline: 'The same ring, a year earlier.',
		stack: ['RobotC', 'Mechanical design'],
		links: [{ label: 'Infomatrix', url: 'http://infomatrix.ro/' }]
	},
	{
		event: 'Robotex International 2016',
		prize: 'Third Prize — Lego Sumo',
		date: '2016-01-01',
		project: 'Lego Sumo Bot',
		tagline: 'First trip to Tallinn, first podium.',
		stack: ['RobotC', 'Mechanical design'],
		links: [{ label: 'Robotex', url: 'https://robotex.international/' }]
	}
];

// Other LinkedIn write-ups that aren't hackathons — shown on the writing strip.
export const writing = [
	{
		title: 'ChainHack24: My First Blockchain Hackathon',
		url: 'https://www.linkedin.com/pulse/chainhack24-my-first-hackathon-blockchain-tiberiu-andrei-georgescu/'
	},
	{
		title: 'The WACC Compiler Project',
		url: 'https://www.linkedin.com/pulse/wacc-compiler-project-tiberiu-andrei-georgescu/'
	},
	{
		title: 'True Concurrency: Parallel Picture Processing in C',
		url: 'https://www.linkedin.com/pulse/true-concurrency-parallel-picture-processing-c-georgescu/'
	},
	{
		title: 'ARM11 Processor & a Raspberry Pi Smart Mirror',
		url: 'https://www.linkedin.com/pulse/project-arm11-raspberry-pi-smart-mirror-tiberiu-andrei-georgescu'
	},
	{
		title: 'My First (Kinda) Job: Teaching Game Development',
		url: 'https://www.linkedin.com/pulse/first-kinda-job-teaching-game-development-tiberiu-andrei-georgescu'
	}
];

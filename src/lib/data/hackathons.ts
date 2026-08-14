export type Hackathon = {
	event: string;
	// Leave it off when nothing was won. The card then says nothing at all,
	// rather than announcing that you turned up.
	prize?: string;
	date: string; // ISO, used for sorting
	project: string;
	tagline: string;
	challenge?: string;
	stack: string[];
	links: { label: string; url: string }[];
	blogPost?: string; // LinkedIn write-up, surfaced as a big obvious button
	// Entered but didn't place. Counts are drawn from `wins` below, so an entry
	// marked this way never gets counted as one.
	won?: false;
	// A CV-register version of the tagline, for entries whose site copy is too
	// playful to put in front of a hiring panel. Falls back to `tagline`.
	cvSummary?: string;
	// Whether the CV lists this one on its own. Defaults to "yes if it placed".
	// Set true to carry a strong entry that didn't place, false for anything
	// folded into the grouped robotics line below.
	onCv?: boolean;
};

// Seeded from your CV. Add a `blogPost` URL to any of these as you write them up.
// The card grows a "Read the write-up" button automatically.
export const hackathons: Hackathon[] = [
	{
		event: 'Building an AI Scientist Hackathon',
		date: '2026-07-03',
		project: 'ReBind: The Personal AI Clinician',
		tagline: 'A specialised clinic in the palm of your hand: it monitors your progress to propose the treatment plan that fits you.',
		cvSummary:
			'Patient-facing agent that tracks a course of treatment and adapts the plan as the patient responds.',
		won: false,
		// Didn't place, but it is the most recent and the most substantial build,
		// so the CV carries it on merit rather than on a prize.
		onCv: true,
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
		tagline: 'Generating animated children’s stories way before ChatGPT and Midjourney.',
		cvSummary: 'Generated animated children’s stories from a short written prompt.',
		challenge: 'Build an application showcasing artistic style.',
		stack: ['GPT-3', 'NLP', 'Python'],
		links: [{ label: 'Devpost', url: 'https://devpost.com/software/storytelly' }]
	},
	{
		event: 'ICHack 2022',
		prize: 'Marshall Wace Challenge: Most Entrepreneurial Hack',
		date: '2022-02-08',
		project: 'StartNet',
		tagline: 'Matching entrepreneurs with investors by pitch and shared interests.',
		challenge: 'Build a platform supporting entrepreneurial endeavour.',
		stack: ['NLP', 'Python', 'Databases'],
		links: [{ label: 'Devpost', url: 'https://devpost.com/software/startnet' }]
	},
	{
		event: 'ICHack 2020',
		prize: 'Thought Machine Challenge: Money for Good',
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
		tagline: 'A smart ID card that authenticates you without disclosing personal data.',
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
		tagline: 'A self-sustainable community of energy-efficient houses.',
		challenge: 'Build an application supporting UN Sustainable Development Goals 7 and 11.',
		stack: ['PWA', 'JavaScript', 'Python', 'Java'],
		links: [{ label: 'GitHub', url: 'https://github.com/TibiGG/EnerCom' }]
	},
	{
		event: 'Robotex International 2018',
		prize: 'Second Place, Mega Lego Sumo, Tallinn',
		date: '2018-11-25',
		onCv: false,
		project: 'Mega Sumo Bot',
		tagline: 'First time scaling up my Lego sumo bot to three times its original weight. Second international podium.',
		challenge: 'Build an up-to-3kg Lego sumo robot.',
		stack: ['RobotC', 'Mechanical design'],
		links: [{ label: 'Robotex', url: 'https://robotex.international/' }]
	},
	{
		event: 'First Tech Challenge Romania 2018',
		date: '2018-01-01',
		onCv: false,
		project: 'FTC Robot',
		tagline: 'The national round of the FIRST Tech Challenge.',
		won: false,
		stack: ['Java', 'Mechanical design'],
		links: [{ label: 'FTC Romania', url: 'https://natieprineducatie.ro/' }]
	},
	{
		event: 'Infomatrix 2017',
		prize: 'First Prize, Lego Sumo',
		date: '2017-01-01',
		onCv: false,
		project: 'Lego Sumo Bot',
		tagline: 'Second national Lego Sumo win.',
		stack: ['RobotC', 'Mechanical design'],
		links: [{ label: 'Infomatrix', url: 'http://infomatrix.ro/' }]
	},
	{
		event: 'Infomatrix 2016',
		prize: 'First Prize, Lego Sumo',
		date: '2016-06-01',
		onCv: false,
		project: 'Lego Sumo Bot',
		tagline: 'First national Lego Sumo win.',
		stack: ['RobotC', 'Mechanical design'],
		links: [{ label: 'Infomatrix', url: 'http://infomatrix.ro/' }]
	},
	{
		event: 'Robotex International 2016',
		prize: 'Third Prize, Lego Sumo',
		date: '2016-01-01',
		onCv: false,
		project: 'Lego Sumo Bot',
		tagline: 'First international Lego Sumo podium.',
		stack: ['RobotC', 'Mechanical design'],
		links: [{ label: 'Robotex', url: 'https://robotex.international/' }]
	}
];

// The subset that actually placed. Every count on the site comes from here, so
// adding an entry that didn't place can't inflate a "wins" number by accident.
export const wins = hackathons.filter((h) => h.won !== false);

export type CvCompetition = {
	when: string; // the left column: a year, or a range
	project: string; // the headline, because a reader knows projects, not events
	prize?: string; // rides on the heading line, where it cannot be skimmed past
	event: string;
	challenge?: string; // what the organisers asked for, labelled as such
	summary: string;
	stack: string[];
};

// The CV's version of this list, which is a different document with a different
// reader. Someone outside the hackathon scene cannot rank "OxfordHack" against
// "ICHack", so the project leads and the event trails as the credential. The
// four Lego Sumo podiums say the same thing four times, so they collapse into a
// single line; the site keeps them separate, where there is room.
const robotics: CvCompetition = {
	when: '2016 – 2018',
	project: 'Autonomous Lego Sumo robots',
	prize: '4 national & international podiums',
	event: 'Infomatrix 2016, 2017 · Robotex International 2016, 2018',
	challenge: 'Build and program an autonomous Lego sumo robot, up to 3kg in the mega class.',
	summary:
		'First place at Infomatrix 2016 and 2017, second in the 3kg class at Robotex International 2018, third at Robotex International 2016.',
	stack: ['RobotC', 'Mechanical design']
};

export const cvCompetitions: CvCompetition[] = [
	...hackathons
		.filter((h) => h.onCv ?? h.won !== false)
		.map((h) => ({
			when: h.date.slice(0, 4),
			project: h.project,
			prize: h.prize,
			event: h.event,
			challenge: h.challenge,
			summary: h.cvSummary ?? h.tagline,
			stack: h.stack
		})),
	robotics
];

// Other LinkedIn write-ups that aren't hackathons, shown on the writing strip.
export const writing = [
	{
		title: 'How to Win a Hackathon',
		url: 'https://www.linkedin.com/pulse/how-win-hackathon-tiberiu-andrei-georgescu/'
	},
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

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
	// `featured` fills a link's button in red on /hackathons, like the write-up
	// button, for the one link a visitor should click first.
	links: { label: string; url: string; featured?: boolean }[];
	blogPost?: string; // LinkedIn write-up, surfaced as a big obvious button
	// Entered but didn't place. Counts are drawn from `wins` below, so an entry
	// marked this way never gets counted as one.
	won?: false;
	// A CV-register version of the tagline, for entries whose site copy is too
	// playful to put in front of a hiring panel. Falls back to `tagline`.
	cvSummary?: string;
	// The same for `challenge`, when the brief as the organisers wrote it is too
	// long for a CV line. Falls back to `challenge`.
	cvChallenge?: string;
	// Whether the CV lists this one on its own. Defaults to "yes if it placed".
	// Set true to carry a strong entry that didn't place, false for anything
	// folded into the grouped robotics line below.
	onCv?: boolean;
	// Team size, and whether you coordinated it. From the old LaTeX CV, which
	// says 'coordinated' in so many words where it applies. Only the CV variants
	// print this; the public CV and /hackathons are unchanged.
	// `solo`: a project you built alone while entered as part of a team.
	team?: { size: number; lead?: boolean; solo?: boolean };
	// How long the build ran: 24 for a one-night hackathon, 48 for two nights.
	// Recorded but not printed anywhere yet.
	hours?: number;
};

// Seeded from your CV. Add a `blogPost` URL to any of these as you write them up.
// The card grows a "Read the write-up" button automatically.
export const hackathons: Hackathon[] = [
	{
		event: 'Junction 2026, Helsinki',
		prize: 'Third Place, AfterQuery Challenge: Break the Agent',
		date: '2026-11-15',
		project: 'Loophole',
		hours: 48,
		tagline:
			'Children’s 3D puzzles that frontier AI models can’t solve. Plug in your agent over MCP and watch it fail. Or let it train, and see if it can puzzle it out. My idea and my build, over 48 sleepless hours. No model we tested ever beat The Rat Trap.',
		challenge:
			'AfterQuery Challenge track: Break the Agent — build a reinforcement learning environment that challenges today’s best AI agents, demonstrate real failure modes, and show that its rewards reflect real progress.',
		cvChallenge: 'Build an RL environment exposing real failure modes in frontier AI agents.',
		cvSummary:
			'Disentanglement-puzzle RL environment for LLM agents. No model solved the hardest.',
		stack: ['MuJoCo', 'MCP', 'Harbor', 'Python', 'Docker'],
		// The team of 3 entered more than one project. This one was Tibi's idea, and
		// Tibi built it alone; the CV says 'Solo build in a team of 3'.
		team: { size: 3, solo: true },
		links: [
			{ label: 'Video', url: 'https://youtu.be/FnqAnuDAAFw' },
			{ label: 'Website', url: 'https://tibiic.github.io/Loophole/#/', featured: true },
			{ label: 'GitHub', url: 'https://github.com/TibiIC/Loophole' },
			{ label: 'Event', url: 'https://2026.hackjunction.com' }
		]
	},
	{
		event: 'Since AI Hackathon 2026, Turku',
		date: '2026-11-08',
		project: 'Climate Lens',
		hours: 48,
		tagline:
			'Choose how the world acts on climate, and watch on a 3D globe what the coming decades do to the land’s harvests. Climate Lens then suggests how to keep yields up in that future, and drafts the nature report for you.',
		challenge:
			'Apetit Challenge: Climate & Nature Navigator, turning fragmented climate and nature data into decisions.',
		cvChallenge: 'Climate & Nature Navigator',
		cvSummary:
			'Maps how climate policy hits selected regions, and how to raise yield and soil carbon.',
		won: false,
		onCv: true,
		stack: ['SvelteKit', 'CesiumJS', 'Python', 'FastAPI', 'Snowflake Cortex'],
		team: { size: 4, lead: true },
		links: [
			{ label: 'Video', url: 'https://youtu.be/nxaXI02Tex0' },
			{ label: 'Demo', url: 'https://78-141-197-63.sslip.io' },
			{ label: 'GitHub', url: 'https://github.com/TibiIC/BlueSky' }
		],
		blogPost: 'https://www.linkedin.com/feed/update/urn:li:activity:7526524308731588608'
	},
	{
		event: 'Adeline Sprint Sessions · Health x AI Hackathon',
		date: '2026-09-18',
		project: 'Charge',
		hours: 5,
		tagline:
			'Preventive health as managing exercise batteries (strength, cardio, HIIT, balance and flexibility), with personalised exercise recommendations to charge the emptiest one. Used probabilistic logic recommendation backend.',
		challenge:
			'Bupa Challenge track: Connected Care — from treating illness to preventing it.',
		cvChallenge: 'Bupa Connected Care: from treating illness to preventing it.',
		cvSummary: 'Recommends daily exercise from wearable data, via probabilistic-logic clinical rules.',
		// No placement was announced for the challenge track, so there is no prize
		// line. It earns its CV entry the same way ReBind does — on the build.
		won: false,
		onCv: true,
		stack: ['ProbLog', 'Python', 'FastAPI', 'SvelteKit', 'Google Cloud Run'],
		// A 5-hour sprint, not a 24-hour hackathon. Tibi's idea and Tibi's code, as
		// the only coder; the one teammate advised, discussing the idea at length.
		team: { size: 2, lead: true },
		links: [
			{ label: 'Demo', url: 'https://charge-health.vercel.app' },
			{ label: 'Event', url: 'https://www.adeline.co.uk/hackathon' }
		]
	},
	{
		event: 'Building an AI Scientist Hackathon',
		date: '2026-07-03',
		project: 'ReBind: The Personal AI Clinician',
		hours: 24,
		tagline: 'A specialised clinic in the palm of your hand: it monitors your progress to propose the treatment plan that fits you.',
		challenge:
			'Build an AI scientist on the sponsors’ agentic drug generation, validation and testing tools.',
		cvChallenge: 'Build an AI scientist on the sponsors’ agentic drug-discovery tools.',
		cvSummary: 'Patient-facing agent that adapts a treatment plan as the patient responds.',
		won: false,
		// Didn't place, but it is the most recent and the most substantial build,
		// so the CV carries it on merit rather than on a prize.
		onCv: true,
		stack: ['Agentic infrastructure', 'React', 'Python'],
		// Led it, with good teamwork across the three.
		team: { size: 3, lead: true },
		links: [
			{ label: 'Event', url: 'https://luma.com/yw0c3upd' },
			{
				label: 'Write-up',
				url: 'https://www.linkedin.com/feed/update/urn:li:activity:7483231227450298369'
			}
		]
	},
	{
		event: 'OxfordHack 2022',
		prize: 'Most Stylish Hack',
		date: '2022-02-22',
		project: 'StoryTelly',
		hours: 24,
		tagline: 'Generating animated children’s stories way before ChatGPT and Midjourney.',
		cvSummary: 'Generated animated children’s stories from a short written prompt.',
		challenge: 'Build an application showcasing artistic style.',
		stack: ['GPT-3', 'NLP', 'Python'],
		// Led it, and built the work around each member's own strengths.
		team: { size: 4, lead: true },
		links: [{ label: 'Devpost', url: 'https://devpost.com/software/storytelly' }]
	},
	{
		event: 'ICHack 2022',
		prize: 'Marshall Wace Challenge: Most Entrepreneurial Hack',
		date: '2022-02-08',
		project: 'StartNet',
		hours: 24,
		tagline: 'Matching entrepreneurs with investors by pitch and shared interests.',
		challenge: 'Build a platform supporting entrepreneurial endeavour.',
		stack: ['NLP', 'Python', 'Databases'],
		team: { size: 4, lead: true },
		links: [{ label: 'Devpost', url: 'https://devpost.com/software/startnet' }]
	},
	{
		event: 'ICHack 2020',
		prize: 'Thought Machine Challenge: Money for Good',
		date: '2020-02-08',
		project: 'Laughable',
		hours: 24,
		tagline: 'Comedy streaming where the audience pays in proportion to how hard they laughed.',
		challenge: 'Build a platform supporting microtransactions in a way that is good for the world.',
		cvChallenge: 'Build a microtransaction platform that is good for the world.',
		stack: ['JavaScript', 'Emotion recognition', 'Webex API'],
		// The one team Tibi was part of but didn't lead.
		team: { size: 4 },
		links: [{ label: 'Devpost', url: 'https://devpost.com/software/laughable' }]
	},
	{
		event: 'OxfordHack 2019',
		prize: 'Cisco Challenge',
		date: '2019-11-11',
		project: 'VLearning',
		hours: 24,
		tagline: 'Teaching platform matching teachers to students by interest and skill level.',
		challenge: 'Build an application that helps people connect in a novel way.',
		stack: ['JavaScript', 'Python', 'Cisco Webex API'],
		team: { size: 4, lead: true },
		links: [{ label: 'Devpost', url: 'https://devpost.com/software/vlearning' }]
	},
	{
		event: 'Chainhack24',
		prize: 'Third Place & Decentralized Identity Prize',
		date: '2019-11-17',
		project: 'UnID',
		hours: 24,
		tagline: 'A smart ID card that authenticates you without disclosing personal data.',
		challenge: 'Learn blockchain and build something on it in 24 hours.',
		stack: ['Java', 'Node', 'Blockchain', 'Sovrin'],
		team: { size: 3, lead: true },
		links: [{ label: 'GitLab', url: 'https://gitlab.doc.ic.ac.uk/blockchain-hack18/unid' }],
		blogPost:
			'https://www.linkedin.com/pulse/chainhack24-my-first-hackathon-blockchain-tiberiu-andrei-georgescu/'
	},
	{
		event: 'R. U. Hacking? 2019',
		prize: 'UN SDG 7 & 11 Challenge',
		date: '2019-02-16',
		project: 'Enercom',
		hours: 24,
		tagline: 'A self-sustainable community of energy-efficient houses.',
		challenge: 'Build an application supporting UN Sustainable Development Goals 7 and 11.',
		cvChallenge: 'Build an app supporting UN Sustainable Development Goals 7 and 11.',
		stack: ['PWA', 'JavaScript', 'Python', 'Java'],
		team: { size: 4, lead: true },
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
	team?: { size: number; lead?: boolean; solo?: boolean };
	url?: string; // the entry's first link: the demo where there is one
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
	challenge: 'Build an autonomous Lego sumo robot, up to 3kg in the mega class.',
	summary: 'First at Infomatrix 2016 and 2017; third at Robotex 2016, second (3kg class) in 2018.',
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
			challenge: h.cvChallenge ?? h.challenge,
			summary: h.cvSummary ?? h.tagline,
			stack: h.stack,
			team: h.team,
			url: h.links[0]?.url
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

// Everything personal lives in this folder. Edit these files, not the components.

export const profile = {
	name: 'Tiberiu-Andrei Georgescu',
	short: 'Tibi',
	// Shown under the name on the home page.
	roles: [
		'PhD student',
		'Safe & Trusted AI research',
		'serial hackathon winner',
		'wing chun practitioner',
		'board game hoarder',
	],
	blurb: `I make autonomous systems adaptive and trustworthy using logic-based machine learning. 
	In the process of finishing my PhD at Imperial College London, as part of the CDT for Safe & Trusted AI.`,
	location: 'London, UK',
	email: 'tibi.geo@ic.ac.uk',
	// Absolute origin, used for canonical URLs, link previews and the sitemap.
	// Change this one line if the site moves to a custom domain.
	site: 'https://tibigg.github.io',
	// Drop a PDF at static/cv.pdf and set this to '/cv.pdf' to offer the real
	// file alongside the printable /cv page. Empty means "print the page instead".
	// Generated from /cv/ at build time by scripts/print-cv.mjs, never committed,
	// so the download and the page can never disagree.
	cvPdf: '/cv.pdf',
	links: {
		github: 'https://github.com/TibiIC',
		githubOld: 'https://github.com/TibiGG',
		linkedin: 'https://www.linkedin.com/in/tibigeo',
		// The bare profile URL: the `pli` and `authuser` params on the link you
		// copied are your own session's, not part of the profile's address.
		scholar: 'https://scholar.google.com/citations?user=elQzWZ8AAAAJ'
	}
};

// Little facts the dice on the home page rolls through. Add as many as you like.
export const diceFacts = [
	'Second place, Mega Lego Sumo, Robotex International, Tallinn, 2018.',
	'Taught high schoolers to build games in Unreal Engine C++ before I could legally drink in the US.',
	'Upstreamed patches to the Linux Kernel and QEMU during an internship at Nutanix.',
	'Wing Chun runs on the centreline theory: the shortest path is a straight one.',
	'Built a Raspberry Pi smart mirror in C, because a normal mirror was insufficient.',
	'Fine-tuned GPT-3 to write animated children’s stories. It won "Most Stylish Hack".',
	'I speak Romanian and English.',
	'Shielded a reinforcement learning agent playing Atari Seaquest with a formal specification that repairs itself mid-episode.',
	'Built an AI clinician called ReBind at a "Building an AI Scientist" hackathon in 2026.'
];

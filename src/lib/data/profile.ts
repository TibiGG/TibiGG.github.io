// Everything personal lives in this folder. Edit these files, not the components.

export const profile = {
	name: 'Tiberiu-Andrei Georgescu',
	short: 'Tibi',
	// Shown under the name on the home page.
	roles: [
		'PhD researcher',
		'serial hackathon winner',
		'board game hoarder',
		'wing chun practitioner'
	],
	blurb: `I make autonomous systems adaptive and trustworthy using logic-based machine learning.
		Otherwise, when I'm not off at a hackathon, I'm overplanning my next board game session, or
		drilling forms and sparring in my Wing Chun kwoon.`,
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
		scholar: '' // add your Google Scholar URL when you have one
	}
};

// Little facts the dice on the home page rolls through. Add as many as you like.
export const diceFacts = [
	'Second place, Mega Lego Sumo, Robotex International, Tallinn, 2018.',
	'Taught high schoolers to build games in Unreal Engine C++ before I could legally drink in the US.',
	'Upstreamed patches to the Linux Kernel and QEMU during an internship at Nutanix.',
	'Wing Chun runs on the centerline theory: the shortest path is a straight one.',
	'Built a Raspberry Pi smart mirror in C, because a normal mirror was insufficient.',
	'Fine-tuned GPT-3 to write animated children’s stories. It won "Most Stylish Hack".',
	'I speak Romanian and English.',
	'Shielded a reinforcement learning agent playing Atari Seaquest with a formal specification that repairs itself mid-episode.',
	'Built an AI clinician called ReBind at a "Building an AI Scientist" hackathon in 2026.'
];

// Everything personal lives in this folder. Edit these files, not the components.

export const profile = {
	name: 'Tiberiu-Andrei Georgescu',
	short: 'Tibi',
	// The one-line answer to 'what is this person?', shown between the name and the
	// keyword line. The ribbon below says what the work *is*; this says what to
	// file him under, which a reader needs first and cannot get from nine
	// specialist terms. 'AI Safety' leans towards the alignment/interpretability
	// world in current usage, and this work is safety in the provable-safety
	// tradition — the ribbon resolves that on the very next line, which is why the
	// broader label is worth its slight ambiguity. 'Safe & Trusted AI Researcher'
	// is the exact-but-quieter alternative.
	title: 'AI Safety Researcher',
	// The credentials line under the title, joined by '|' rather than the ribbon's
	// '·' so the two read as different kinds of list: standing and membership
	// here, research topics below. The CDT is the reason this is not just a
	// generic studentship, so it is named and linked rather than left to the last
	// clause of the blurb.
	credentials: [
		{ label: 'PhD Candidate' },
		{ label: 'UKRI CDT in Safe & Trusted AI', url: 'https://safeandtrustedai.org/' }
	],
	// Shown under the name on the home page, as one '·'-separated line.
	//
	// Three research terms, not eight. This line is for recognition, not coverage
	// — /research and /cv are where the full record lives. Someone who works on
	// this should be able to place you from a glance, and every soft word added
	// makes the sharp ones harder to see.
	//
	// Umbrella terms, deliberately. GR(1) is the formalism this work happens to
	// use, not the boundary of it, and it is an opaque acronym to everyone who is
	// not already in reactive synthesis — so the ribbon names the field and the
	// papers name the fragment. 'Specification Adaptation' follows the same rule:
	// it is the thesis's own word ('Inductive Adaptation of GR(1) Specifications
	// to Environment Changes') and the broader one, since repair — the NeSy and
	// Prague word — is the special case where something is already broken.
	//
	// 'Inductive Logic Programming' stays unabbreviated: ILP reads as noise to
	// anyone outside it, and the people inside it will recognise the full name
	// just as fast. 'Shielded' is what does the work in the last one, since bare
	// 'Reinforcement Learning' is the broadest word in ML and signals nothing.
	//
	// The tail is a ramp, not a pile-up. 'serial hackathon winner' is an
	// achievement but a playful one, so it carries the line from research terms
	// into the joke; 'board game hoarder' lands on that setup. Cut the ramp and
	// the joke has to make the whole jump from 'Shielded Reinforcement Learning'
	// on its own, which reads as a non sequitur — tried it, it was worse.
	//
	// Wing Chun came out because it is opaque to most readers, and unlike the
	// other two it cannot explain itself in two words. /side does that properly
	// for anyone who cares.
	//
	// ILP and ASP sit next to each other on purpose — the learning method and the
	// formalism it learns in — so they clarify one another instead of reading as
	// two words for the same thing. ASP earns its slot on reach: the KR/ICLP crowd
	// is large, largely does not work on learning, and 'Inductive Logic
	// Programming' does not catch it. Clingo stays on the skills list, where the
	// tool belongs; this line names paradigms.
	//
	// Dropped from the research half: 'Adaptation' alone (too vague to place),
	// 'MEng Computing' (sits oddly beside 'PhD Candidate', and the CV has it).
	roles: [
		'Reactive Synthesis',
		'Specification Adaptation',
		'Inductive Logic Programming',
		'Answer Set Programming',
		'Shielded Reinforcement Learning',
		'serial hackathon winner',
		'board game hoarder',
	],
	blurb: `I make autonomous systems adaptive and trustworthy using Answer Set Programs and Inductive Logic Programming. 
	Currently in the write-up stage of my PhD at Imperial College London, as part of the CDT for Safe & Trusted AI.`,
	location: 'London, UK',
	// Shown as the eyebrow above the name on the home page, and read by the
	// JSON-LD in $lib/schema so the affiliation is stated once. It carries the
	// city on its own, which is why the eyebrow no longer prints `location` too —
	// 'Imperial College London · London, UK' says London twice.
	affiliation: 'Imperial College London',
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
	'Upstreamed a patch to QEMU during an internship at Nutanix, and wrote kernel code that still lives in their tree.',
	'Wing Chun runs on the centreline theory: the shortest path is a straight one.',
	'Built a Raspberry Pi smart mirror in C, because a normal mirror was insufficient.',
	'Fine-tuned GPT-3 to write animated children’s stories. It won "Most Stylish Hack".',
	'I speak Romanian and English.',
	'Shielded a reinforcement learning agent playing Atari Seaquest with a formal specification that repairs itself mid-episode.',
	'Built an AI clinician called ReBind at a "Building an AI Scientist" hackathon in 2026.'
];

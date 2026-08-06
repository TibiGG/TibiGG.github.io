import { profile } from '$lib/data/profile';
import { posts } from '$lib/posts';

export const prerender = true;

// Every page on the site, with the pages that change most often weighted highest.
const pages: { path: string; priority: number; changefreq: string }[] = [
	{ path: '/', priority: 1.0, changefreq: 'monthly' },
	{ path: '/research/', priority: 0.9, changefreq: 'monthly' },
	{ path: '/writing/', priority: 0.8, changefreq: 'weekly' },
	{ path: '/hackathons/', priority: 0.7, changefreq: 'yearly' },
	{ path: '/play/', priority: 0.5, changefreq: 'yearly' },
	{ path: '/cv/', priority: 0.6, changefreq: 'monthly' },
	{ path: '/contact/', priority: 0.5, changefreq: 'yearly' }
];

export function GET() {
	const urls = [
		...pages.map((p) => ({ ...p, lastmod: undefined as string | undefined })),
		...posts.map((post) => ({
			path: `/writing/${post.slug}/`,
			priority: 0.6,
			changefreq: 'yearly',
			lastmod: post.date
		}))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) => `	<url>
		<loc>${profile.site}${u.path}</loc>${u.lastmod ? `\n\t\t<lastmod>${u.lastmod}</lastmod>` : ''}
		<changefreq>${u.changefreq}</changefreq>
		<priority>${u.priority.toFixed(1)}</priority>
	</url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: { 'content-type': 'application/xml; charset=utf-8' }
	});
}

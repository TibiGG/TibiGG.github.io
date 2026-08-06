# tibigg.github.io

Personal portfolio: SvelteKit, prerendered to static HTML, deployed to GitHub Pages.

Live at **https://tibigg.github.io**

## Editing content

All content lives in `src/lib/data/`. You shouldn't need to touch a component to update the site.

| File              | What's in it                                                        |
| ----------------- | ------------------------------------------------------------------- |
| `profile.ts`      | Name, roles, blurb, links, site URL, and the random dice facts       |
| `publications.ts` | Papers, the PhD `thesis` blurb, and the (empty) `talks` list         |
| `experience.ts`   | Jobs, degrees and skills, feeds the home page and the CV            |
| `hackathons.ts`   | Hackathons, plus the `writing` list of LinkedIn articles             |
| `play.ts`         | Board games and Wing Chun principles                                 |

Blog posts are the exception: they're markdown, in `src/lib/posts/`.

### Writing a blog post

Create `src/lib/posts/my-post.svx`. The filename becomes the URL
(`/writing/my-post/`), and the frontmatter drives the index page:

```yaml
---
title: My post
date: 2026-08-06
summary: One sentence, shown on the writing index.
tags: ['formal-methods']
draft: true # omit or set false to publish
---
```

`.svx` is markdown plus Svelte, so a post can `import` a component and drop an
interactive figure into the prose. Prose styling lives in
`src/routes/writing/[slug]/+page.svelte`.

### Papers and BibTeX

The research page generates a BibTeX entry per paper from the data. Set `kind`
to `inproceedings` / `article` / `misc` to pick the entry type, and `citeKey` if
you want a specific key rather than the derived `surnameYearWord`.

### The CV

`/cv` renders the same data as a one-column CV and prints cleanly (the site
chrome drops out via print styles). "Print / save as PDF" is the download path;
if you'd rather serve a real file, drop it at `static/cv.pdf` and set
`cvPdf: '/cv.pdf'` in `profile.ts`, and an extra download button appears.

### Theme

Colours are `light-dark()` pairs in `src/app.css`, so each token is defined once.
The header toggle cycles system → light → dark and stores the choice; an inline
script in `app.html` applies it before first paint so there's no flash.

### Link previews and SEO

Every page renders its meta through `src/lib/Seo.svelte`: canonical URL, Open
Graph, Twitter card and JSON-LD (`Person`, `ScholarlyArticle`, `BlogPosting`).
`/sitemap.xml` is generated at build time from the route list plus the posts.

The preview card image is `static/og.png`, rendered from `static/og.svg`:

```sh
rsvg-convert -w 1200 -h 630 static/og.svg -o static/og.png
```

One thing to change if the site moves: `profile.site` in `profile.ts`, and the
`Sitemap:` line in `static/robots.txt`.

### Hackathons that didn't place

Add `won: false` to an entry and it still gets a card, but it drops out of the
`wins` list, which is where every count on the site ("N hackathons won", the
CV's Awards section, the "most recent win" panel) comes from. The card loses its
trophy too.

### Adding a hackathon write-up

Add a `blogPost` URL to any entry in `hackathons.ts` and the card grows a
"Read the write-up" button automatically:

```ts
{
  event: 'ICHack 2022',
  // ...
  blogPost: 'https://www.linkedin.com/pulse/your-article/'
}
```

## Local development

```sh
npm install
npm run dev      # dev server at localhost:5173
npm run build    # static build into build/
npm run preview  # serve the production build
npm run check    # typecheck
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages. **One-time setup:** in the repo's
Settings → Pages, set _Source_ to **GitHub Actions**.

### Moving to a custom domain later

1. Add your domain in Settings → Pages → Custom domain (this commits a `CNAME` file).
2. At your DNS provider, point the apex at GitHub's Pages IPs, or add a `CNAME`
   record for `www` pointing to `tibigg.github.io`.

No code change is needed: a user site and a custom domain both serve from the root.

### Turning this into a project repo instead

If this ever moves to a repo not named `TibiGG.github.io`, the site serves from
`/<repo>`. Set `BASE_PATH` in the workflow to `/${{ github.event.repository.name }}`;
internal links adjust automatically, since every link is already prefixed with
SvelteKit's `base`.

## Notes on the seeded content

Content was drawn from the CV in `MyCV/` and the PhD folder. Two things to verify:

- The GR(1) journal paper's venue/year/status is inferred from the LaTeX source,
  not from a published record.
- The `play.ts` game entries are placeholders, so swap in your actual favourites.

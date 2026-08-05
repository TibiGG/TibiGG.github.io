# tibigg.github.io

Personal portfolio — SvelteKit, prerendered to static HTML, deployed to GitHub Pages.

Live at **https://tibigg.github.io**

## Editing content

All content lives in `src/lib/data/`. You shouldn't need to touch a component to update the site.

| File              | What's in it                                               |
| ----------------- | ---------------------------------------------------------- |
| `profile.ts`      | Name, roles, blurb, links, and the random dice facts        |
| `publications.ts` | Papers. `status` is `published` / `in review` / `preprint`  |
| `hackathons.ts`   | Wins, plus the `writing` list of LinkedIn articles          |
| `play.ts`         | Board games and Wing Chun principles                        |

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

No code change is needed — a user site and a custom domain both serve from the root.

### Turning this into a project repo instead

If this ever moves to a repo not named `TibiGG.github.io`, the site serves from
`/<repo>`. Set `BASE_PATH` in the workflow to `/${{ github.event.repository.name }}`;
internal links adjust automatically, since every link is already prefixed with
SvelteKit's `base`.

## Notes on the seeded content

Content was drawn from the CV in `MyCV/` and the PhD folder. Two things to verify:

- The GR(1) journal paper's venue/year/status is inferred from the LaTeX source,
  not from a published record.
- The `play.ts` game entries are placeholders — swap in your actual favourites.

// Every page is static, so prerender the whole site at build time so GitHub Pages
// can serve real HTML per route (good for SEO and for link previews).
export const prerender = true;
export const trailingSlash = 'always';

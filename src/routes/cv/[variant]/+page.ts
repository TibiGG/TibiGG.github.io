import { error } from '@sveltejs/kit';
import type { CvVariant } from '$lib/cv/variant';

// The tailored CVs, one per file in the gitignored applications/cv/ folder.
// Served by `vite dev` only: never prerendered, and a 404 in any build, so the
// deployed site cannot carry them even if a local build is previewed.
export const prerender = false;

// Behind DEV so a production build drops the glob and emits no chunk for them:
// even a local `npm run build` then carries nothing from applications/.
const files: Record<string, () => Promise<{ default: CvVariant }>> = import.meta.env.DEV
	? import.meta.glob<{ default: CvVariant }>('/applications/cv/*.ts')
	: {};

export async function load({ params }) {
	const file = files[`/applications/cv/${params.variant}.ts`];
	if (!file) error(404, `No CV variant called "${params.variant}"`);
	return { name: params.variant, variant: (await file()).default };
}

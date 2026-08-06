import { browser } from '$app/environment';

// Until someone touches the toggle there is no stored choice at all, and the
// page follows the OS. The first click writes an explicit light/dark override;
// from then on the site ignores the OS. That keeps the control to two visible
// states, rather than cycling through a "system" state that looks identical to
// whichever theme the OS is already using.
export type Theme = 'light' | 'dark';

const KEY = 'theme';

function systemPrefersDark() {
	return browser && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function current(): Theme {
	if (!browser) return 'light';
	const stored = localStorage.getItem(KEY);
	if (stored === 'light' || stored === 'dark') return stored;
	return systemPrefersDark() ? 'dark' : 'light';
}

export const theme = $state({ value: current() as Theme });

export function setTheme(next: Theme) {
	theme.value = next;
	if (!browser) return;
	document.documentElement.dataset.theme = next;
	localStorage.setItem(KEY, next);
}

export function toggleTheme() {
	setTheme(theme.value === 'dark' ? 'light' : 'dark');
}

// Escape hatch: forget the override and go back to following the OS.
export function followSystem() {
	if (!browser) return;
	localStorage.removeItem(KEY);
	delete document.documentElement.dataset.theme;
	theme.value = systemPrefersDark() ? 'dark' : 'light';
}

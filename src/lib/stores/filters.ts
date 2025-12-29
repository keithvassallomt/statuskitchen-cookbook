import { writable } from 'svelte/store';

export const searchQuery = writable<string>('');
export const selectedTags = writable<string[]>([]);

export function resetFilters() {
	searchQuery.set('');
	selectedTags.set([]);
}

export function toggleTag(tag: string) {
	selectedTags.update((tags) => {
		if (tags.includes(tag)) {
			return tags.filter((t) => t !== tag);
		}
		return [...tags, tag];
	});
}

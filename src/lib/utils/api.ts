import type { RecipesIndex, RecipeIndexEntry } from '$lib/types/recipe';

const RECIPES_URL =
	'https://raw.githubusercontent.com/keithvassallomt/statuskitchen-recipes/main/recipes.json';

/**
 * Fetch the recipes index from GitHub
 * Note: No client-side caching needed - CloudFront and browser handle this via Cache-Control headers
 */
export async function fetchRecipes(fetch: typeof globalThis.fetch): Promise<RecipesIndex> {
	const response = await fetch(RECIPES_URL, {
		headers: {
			Accept: 'application/json'
		}
	});

	if (!response.ok) {
		if (response.status === 404) {
			// Empty cookbook - return empty index
			return {
				version: 1,
				last_updated: new Date().toISOString(),
				recipes: []
			};
		}
		throw new Error(`Failed to fetch recipes: ${response.status}`);
	}

	return response.json();
}

/**
 * Find a recipe by UUID
 */
export async function fetchRecipeByUuid(
	fetch: typeof globalThis.fetch,
	uuid: string
): Promise<RecipeIndexEntry | null> {
	const index = await fetchRecipes(fetch);
	return index.recipes.find((r) => r.uuid === uuid) || null;
}

/**
 * Generate a statuskitchen:// install URL for a recipe
 */
export function generateInstallUrl(downloadUrl: string): string {
	const encoded = encodeURIComponent(downloadUrl);
	return `statuskitchen://install?url=${encoded}`;
}

/**
 * Extract all unique tags from recipes
 */
export function extractAllTags(recipes: RecipeIndexEntry[]): string[] {
	const tagSet = new Set<string>();
	recipes.forEach((r) => r.tags.forEach((t) => tagSet.add(t)));
	return Array.from(tagSet).sort();
}

/**
 * Filter recipes by search query
 */
export function filterRecipes(
	recipes: RecipeIndexEntry[],
	query: string,
	selectedTags: string[]
): RecipeIndexEntry[] {
	let result = recipes;

	// Filter by search query
	if (query.trim()) {
		const q = query.toLowerCase();
		result = result.filter(
			(r) =>
				r.name.toLowerCase().includes(q) ||
				r.description.toLowerCase().includes(q) ||
				r.author.toLowerCase().includes(q) ||
				r.tags.some((t) => t.toLowerCase().includes(q))
		);
	}

	// Filter by selected tags (AND logic - must have all selected tags)
	if (selectedTags.length > 0) {
		result = result.filter((r) => selectedTags.every((tag) => r.tags.includes(tag)));
	}

	return result;
}

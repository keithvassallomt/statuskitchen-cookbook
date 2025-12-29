import { fetchRecipes, extractAllTags } from '$lib/utils/api';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, setHeaders }) => {
	const recipesIndex = await fetchRecipes(fetch);

	// Set cache headers - no-cache for HTML (revalidate with ETag), long cache for assets
	setHeaders({
		'Cache-Control': 'public, max-age=0, must-revalidate'
	});

	return {
		recipes: recipesIndex.recipes,
		allTags: extractAllTags(recipesIndex.recipes),
		lastUpdated: recipesIndex.last_updated
	};
};

import { error } from '@sveltejs/kit';
import { fetchRecipeByUuid } from '$lib/utils/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const recipe = await fetchRecipeByUuid(fetch, params.uuid);

	if (!recipe) {
		throw error(404, {
			message: 'Recipe not found'
		});
	}

	return {
		recipe
	};
};

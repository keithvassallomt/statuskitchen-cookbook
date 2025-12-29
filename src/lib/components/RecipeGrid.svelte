<script lang="ts">
	import type { RecipeIndexEntry } from '$lib/types/recipe';
	import RecipeCard from './RecipeCard.svelte';

	interface Props {
		recipes: RecipeIndexEntry[];
	}

	let { recipes }: Props = $props();
</script>

{#if recipes.length > 0}
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each recipes as recipe (recipe.uuid)}
			<RecipeCard {recipe} />
		{/each}
	</div>
{:else}
	<div class="text-center py-12">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-16 h-16 mx-auto mb-4 opacity-40"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
			/>
		</svg>
		<p class="text-lg opacity-75">No recipes found matching your criteria.</p>
		<p class="text-sm opacity-50 mt-2">Try adjusting your search or filters.</p>
	</div>
{/if}

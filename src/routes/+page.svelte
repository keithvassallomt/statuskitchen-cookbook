<script lang="ts">
	import { derived } from 'svelte/store';
	import TagFilter from '$lib/components/TagFilter.svelte';
	import RecipeGrid from '$lib/components/RecipeGrid.svelte';
	import HeroCarousel from '$lib/components/HeroCarousel.svelte';
	import { searchQuery, selectedTags } from '$lib/stores/filters';
	import { filterRecipes } from '$lib/utils/api';

	let { data } = $props();

	// Create a derived store for filtered recipes
	const filteredRecipes = derived([searchQuery, selectedTags], ([$query, $tags]) =>
		filterRecipes(data.recipes, $query, $tags)
	);
</script>

<svelte:head>
	<title>Status Kitchen Cookbook</title>
	<meta
		name="description"
		content="Browse and install Status Kitchen recipes for GNOME Shell extensions"
	/>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	{#if data.recipes.length > 0}
		<HeroCarousel recipes={data.recipes} />
	{/if}

	{#if data.allTags.length > 0}
		<div class="mb-6 flex justify-center">
			<TagFilter availableTags={data.allTags} />
		</div>
	{/if}

	<RecipeGrid recipes={$filteredRecipes} />

	{#if data.recipes.length === 0}
		<div class="text-center py-12">
			<p class="text-lg opacity-75">The cookbook is empty.</p>
			<p class="text-sm opacity-50 mt-2">Be the first to contribute a recipe!</p>
			<a
				href="https://github.com/keithvassallomt/statuskitchen-recipes"
				target="_blank"
				rel="noopener noreferrer"
				class="btn preset-filled-primary mt-4"
			>
				Contribute
			</a>
		</div>
	{/if}
</div>

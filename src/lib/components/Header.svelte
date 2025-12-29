<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import SearchBar from './SearchBar.svelte';
	import type { RecipeIndexEntry } from '$lib/types/recipe';

	interface Props {
		recipes?: RecipeIndexEntry[];
	}

	let { recipes = [] }: Props = $props();
</script>

<AppBar>
	{#snippet lead()}
		<a href="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
			<img src="/favicon.svg" alt="Status Kitchen" class="h-8 w-8 dark:invert" />
			<span class="text-xl font-bold hidden sm:inline">Status Kitchen Cookbook</span>
			<span class="text-xl font-bold sm:hidden">Cookbook</span>
		</a>
	{/snippet}

	<div class="flex-1 flex justify-center px-4 max-w-2xl mx-auto">
		<SearchBar {recipes} />
	</div>

	{#snippet trail()}
		<a
			href="https://statuskitchen.app"
			target="_blank"
			rel="noopener noreferrer"
			class="btn preset-tonal"
		>
			<span class="hidden sm:inline">Get Status Kitchen</span>
			<span class="sm:hidden">Get App</span>
		</a>
	{/snippet}
</AppBar>

<script lang="ts">
	import { searchQuery } from '$lib/stores/filters';
	import { goto } from '$app/navigation';
	import type { RecipeIndexEntry } from '$lib/types/recipe';

	interface Props {
		recipes?: RecipeIndexEntry[];
	}

	let { recipes = [] }: Props = $props();

	let value = $state('');
	let timeout: ReturnType<typeof setTimeout>;
	let inputElement: HTMLInputElement;
	let showDropdown = $state(false);
	let selectedIndex = $state(-1);

	// Filter recipes for autocomplete
	const suggestions = $derived.by(() => {
		if (!value.trim() || recipes.length === 0) return [];
		const query = value.toLowerCase();
		return recipes
			.filter(
				(r) =>
					r.name.toLowerCase().includes(query) ||
					r.description?.toLowerCase().includes(query) ||
					r.author.toLowerCase().includes(query)
			)
			.slice(0, 5);
	});

	function handleInput() {
		showDropdown = true;
		selectedIndex = -1;
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			searchQuery.set(value);
		}, 300);
	}

	function clear() {
		value = '';
		searchQuery.set('');
		showDropdown = false;
		inputElement?.focus();
	}

	function selectRecipe(recipe: RecipeIndexEntry) {
		value = '';
		showDropdown = false;
		searchQuery.set('');
		goto(`/recipe/${recipe.uuid}`);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === '/' && document.activeElement !== inputElement) {
			event.preventDefault();
			inputElement?.focus();
			return;
		}

		if (!showDropdown || suggestions.length === 0) return;

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, suggestions.length - 1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, -1);
		} else if (event.key === 'Enter' && selectedIndex >= 0) {
			event.preventDefault();
			selectRecipe(suggestions[selectedIndex]);
		} else if (event.key === 'Escape') {
			showDropdown = false;
			selectedIndex = -1;
		}
	}

	function handleBlur() {
		// Delay to allow click on suggestion
		setTimeout(() => {
			showDropdown = false;
			selectedIndex = -1;
		}, 150);
	}

	$effect(() => {
		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});
</script>

<div class="relative w-full">
	<input
		bind:this={inputElement}
		type="search"
		placeholder="Search recipes..."
		bind:value
		oninput={handleInput}
		onfocus={() => (showDropdown = true)}
		onblur={handleBlur}
		class="w-full px-4 py-2 rounded-full border border-surface-300 dark:border-surface-600 bg-surface-50 dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
	/>
	<div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
		{#if value}
			<button onclick={clear} aria-label="Clear search" class="opacity-60 hover:opacity-100 transition-opacity">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
				</svg>
			</button>
		{:else}
			<kbd class="px-1.5 py-0.5 text-xs font-mono bg-surface-200 dark:bg-surface-700 rounded border border-surface-300 dark:border-surface-600 opacity-60">/</kbd>
		{/if}
	</div>

	<!-- Autocomplete dropdown -->
	{#if showDropdown && suggestions.length > 0}
		<div class="absolute top-full left-0 right-0 mt-2 bg-surface-50 dark:bg-surface-800 border border-surface-300 dark:border-surface-600 rounded-lg shadow-lg overflow-hidden z-50">
			{#each suggestions as recipe, index}
				<button
					class="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors {selectedIndex === index ? 'bg-surface-200 dark:bg-surface-700' : ''}"
					onmousedown={() => selectRecipe(recipe)}
				>
					<img
						src={recipe.icon_url || '/favicon.svg'}
						alt=""
						class="w-8 h-8 rounded dark:invert flex-shrink-0"
						onerror={(e) => {
							(e.currentTarget as HTMLImageElement).src = '/favicon.svg';
						}}
					/>
					<div class="flex-1 min-w-0">
						<div class="font-medium truncate">{recipe.name}</div>
						<div class="text-sm opacity-60 truncate">by {recipe.author}</div>
					</div>
				</button>
			{/each}
		</div>
	{/if}
</div>

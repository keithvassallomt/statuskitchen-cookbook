<script lang="ts">
	import type { RecipeIndexEntry } from '$lib/types/recipe';

	interface Props {
		recipe: RecipeIndexEntry;
	}

	let { recipe }: Props = $props();

	// Sort GNOME versions numerically and format as range
	function formatGnomeVersions(versions: string[]): string {
		const sorted = [...versions].map(Number).sort((a, b) => a - b);
		if (sorted.length === 0) return '';
		if (sorted.length === 1) return sorted[0].toString();
		return `${sorted[0]}-${sorted[sorted.length - 1]}`;
	}
</script>

<a href="/recipe/{recipe.uuid}" class="block">
	<div class="card p-4 h-full hover:ring-2 ring-primary-500 transition-all border border-surface-300 dark:border-surface-600 rounded-lg bg-surface-50 dark:bg-surface-800 shadow-sm hover:shadow-lg hover:-translate-y-1">
		<header class="flex items-center gap-3 mb-3">
			<img
				src={recipe.icon_url || '/favicon.svg'}
				alt="{recipe.name} icon"
				class="w-12 h-12 rounded dark:invert"
				onerror={(e) => {
					(e.currentTarget as HTMLImageElement).src = '/favicon.svg';
				}}
			/>
			<div class="flex-1 min-w-0">
				<h3 class="h4 truncate">{recipe.name}</h3>
				<p class="text-sm opacity-75 truncate">by {recipe.author}</p>
			</div>
		</header>

		<p class="text-sm line-clamp-2 mb-3 opacity-80">{recipe.description || 'No description'}</p>

		{#if recipe.tags.length > 0}
			<div class="flex flex-wrap gap-1 mb-3">
				{#each recipe.tags.slice(0, 3) as tag}
					<span class="chip preset-outlined-surface text-xs">{tag}</span>
				{/each}
				{#if recipe.tags.length > 3}
					<span class="chip preset-outlined-surface text-xs">+{recipe.tags.length - 3}</span>
				{/if}
			</div>
		{/if}

		<footer class="flex justify-between items-center pt-2 border-t border-surface-500/20">
			<span class="text-xs opacity-60">v{recipe.version}</span>
			<span class="text-xs opacity-60">GNOME {formatGnomeVersions(recipe.gnome_shell_versions)}</span>
		</footer>
	</div>
</a>

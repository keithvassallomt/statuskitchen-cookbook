<script lang="ts">
	import InstallButton from '$lib/components/InstallButton.svelte';
	import { page } from '$app/stores';

	let { data } = $props();

	// Get lastUpdated from parent layout data
	const lastUpdated = $derived($page.data.lastUpdated);

	// Sort GNOME versions numerically
	function sortedGnomeVersions(versions: string[]): string[] {
		return [...versions].sort((a, b) => Number(a) - Number(b));
	}

	// Format date
	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{data.recipe.name} - Status Kitchen Cookbook</title>
	<meta name="description" content={data.recipe.description || `Install ${data.recipe.name} recipe`} />
	{#if data.recipe.screenshot_url}
		<meta property="og:image" content={data.recipe.screenshot_url} />
	{/if}
</svelte:head>

<!-- Hero Section with blurred screenshot background -->
<div class="relative overflow-hidden">
	<!-- Blurred background -->
	{#if data.recipe.screenshot_url}
		<div
			class="absolute inset-0 bg-cover bg-center scale-110"
			style="background-image: url({data.recipe.screenshot_url}); filter: blur(20px) brightness(0.4);"
		></div>
	{:else}
		<div class="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900"></div>
	{/if}

	<!-- Hero content -->
	<div class="relative container mx-auto px-4 py-12">
		<nav class="mb-8">
			<a href="/" class="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
				</svg>
				<span>Back to Recipes</span>
			</a>
		</nav>

		<div class="flex items-center gap-6">
			<img
				src={data.recipe.icon_url || '/favicon.svg'}
				alt="{data.recipe.name} icon"
				class="w-24 h-24 rounded-xl shadow-lg invert"
				onerror={(e) => {
					(e.currentTarget as HTMLImageElement).src = '/favicon.svg';
				}}
			/>
			<div>
				<h1 class="text-3xl md:text-4xl font-bold text-white mb-2">{data.recipe.name}</h1>
				<p class="text-white/80">
					by
					{#if data.recipe.author_url}
						<a
							href={data.recipe.author_url}
							target="_blank"
							rel="noopener noreferrer"
							class="underline hover:text-white transition-colors"
						>
							{data.recipe.author}
						</a>
					{:else}
						{data.recipe.author}
					{/if}
				</p>
			</div>
		</div>
	</div>
</div>

<div class="container mx-auto px-4 py-8">
	<div class="grid lg:grid-cols-2 gap-8">
		<!-- Screenshot Section -->
		<div class="card p-4 bg-surface-50 dark:bg-surface-800 border border-surface-300 dark:border-surface-600 rounded-lg">
			{#if data.recipe.screenshot_url}
				<img
					src={data.recipe.screenshot_url}
					alt="{data.recipe.name} screenshot"
					class="rounded w-full"
					onerror={(e) => {
						(e.currentTarget as HTMLImageElement).style.display = 'none';
					}}
				/>
			{:else}
				<div class="bg-surface-200 dark:bg-surface-700 rounded aspect-video flex items-center justify-center">
					<span class="opacity-50">No screenshot available</span>
				</div>
			{/if}
		</div>

		<!-- Details Section -->
		<div class="space-y-6">
			<p class="text-lg">{data.recipe.description || 'No description provided.'}</p>

			{#if data.recipe.tags.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each data.recipe.tags as tag}
						<span class="chip preset-outlined-primary">{tag}</span>
					{/each}
				</div>
			{/if}

			<div class="card bg-surface-50 dark:bg-surface-800 border border-surface-300 dark:border-surface-600 rounded-lg p-4 space-y-2">
				<div class="flex justify-between">
					<span class="opacity-75">Version</span>
					<span>{data.recipe.version}</span>
				</div>
				<div class="flex justify-between">
					<span class="opacity-75">License</span>
					<span>{data.recipe.license || 'Not specified'}</span>
				</div>
				<div class="flex justify-between">
					<span class="opacity-75">GNOME Shell</span>
					<span>{sortedGnomeVersions(data.recipe.gnome_shell_versions).join(', ')}</span>
				</div>
				{#if lastUpdated}
					<div class="flex justify-between">
						<span class="opacity-75">Last Updated</span>
						<span>{formatDate(lastUpdated)}</span>
					</div>
				{/if}
			</div>

			{#if data.recipe.gnome_extensions_url}
				<a
					href={data.recipe.gnome_extensions_url}
					target="_blank"
					rel="noopener noreferrer"
					class="card bg-success-500/10 border border-success-500/30 rounded-lg p-4 flex items-center gap-4 hover:bg-success-500/20 transition-colors"
				>
					<div class="bg-success-500 rounded-full p-2">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-white">
							<path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
						</svg>
					</div>
					<div class="flex-1">
						<p class="font-semibold text-success-700 dark:text-success-300">Available on extensions.gnome.org</p>
						<p class="text-sm opacity-75">Install directly without logout - click to view on e.g.o</p>
					</div>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 opacity-50">
						<path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z" clip-rule="evenodd" />
						<path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z" clip-rule="evenodd" />
					</svg>
				</a>
			{/if}

			<InstallButton downloadUrl={data.recipe.download_url} recipeName={data.recipe.name} />
		</div>
	</div>
</div>

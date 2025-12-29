<script lang="ts">
	import type { RecipeIndexEntry } from '$lib/types/recipe';

	interface Props {
		recipes: RecipeIndexEntry[];
	}

	let { recipes }: Props = $props();

	// Get 3 random recipes for the hero - use $derived to properly react to prop changes
	const heroRecipes = $derived.by(() => {
		if (recipes.length <= 3) return recipes;
		const shuffled = [...recipes].sort(() => Math.random() - 0.5);
		return shuffled.slice(0, 3);
	});

	// Gradient backgrounds that work well in dark mode
	const gradients = [
		'from-purple-900 via-purple-800 to-indigo-900',
		'from-emerald-900 via-teal-800 to-cyan-900',
		'from-orange-900 via-amber-800 to-yellow-900'
	];

	let currentSlide = $state(0);
	let autoplayInterval: ReturnType<typeof setInterval>;

	function nextSlide() {
		currentSlide = (currentSlide + 1) % heroRecipes.length;
	}

	function prevSlide() {
		currentSlide = (currentSlide - 1 + heroRecipes.length) % heroRecipes.length;
	}

	function goToSlide(index: number) {
		currentSlide = index;
	}

	// Autoplay
	$effect(() => {
		if (heroRecipes.length > 1) {
			autoplayInterval = setInterval(nextSlide, 5000);
			return () => clearInterval(autoplayInterval);
		}
	});
</script>

{#if heroRecipes.length > 0}
	<div class="relative w-full overflow-hidden rounded-xl mb-8">
		<!-- Slides container -->
		<div
			class="flex transition-transform duration-500 ease-in-out"
			style="transform: translateX(-{currentSlide * 100}%)"
		>
			{#each heroRecipes as recipe, index}
				<a
					href="/recipe/{recipe.uuid}"
					class="min-w-full bg-gradient-to-br {gradients[index % gradients.length]} p-8 md:p-12"
				>
					<div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
						<!-- Left side: Icon and text -->
						<div class="flex-1 text-center md:text-left">
							<img
								src={recipe.icon_url || '/favicon.svg'}
								alt="{recipe.name} icon"
								class="w-20 h-20 md:w-24 md:h-24 rounded-xl mx-auto md:mx-0 mb-4 invert"
								onerror={(e) => {
									(e.currentTarget as HTMLImageElement).src = '/favicon.svg';
								}}
							/>
							<h2 class="text-2xl md:text-3xl font-bold text-white mb-2">
								{recipe.name}
							</h2>
							<p class="text-white/80 text-lg mb-4 line-clamp-2">
								{recipe.description || 'A Status Kitchen recipe'}
							</p>
							<span class="text-white/60 text-sm">by {recipe.author}</span>
						</div>

						<!-- Right side: Screenshot -->
						{#if recipe.screenshot_url}
							<div class="flex-1 max-w-md">
								<img
									src={recipe.screenshot_url}
									alt="{recipe.name} screenshot"
									class="rounded-lg shadow-2xl w-full"
									onerror={(e) => {
										(e.currentTarget as HTMLImageElement).style.display = 'none';
									}}
								/>
							</div>
						{/if}
					</div>
				</a>
			{/each}
		</div>

		<!-- Navigation arrows -->
		{#if heroRecipes.length > 1}
			<button
				onclick={prevSlide}
				class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
				aria-label="Previous slide"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
				</svg>
			</button>
			<button
				onclick={nextSlide}
				class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
				aria-label="Next slide"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
				</svg>
			</button>

			<!-- Dots indicator -->
			<div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
				{#each heroRecipes as _, index}
					<button
						onclick={() => goToSlide(index)}
						class="w-2 h-2 rounded-full transition-colors {currentSlide === index
							? 'bg-white'
							: 'bg-white/40 hover:bg-white/60'}"
						aria-label="Go to slide {index + 1}"
					></button>
				{/each}
			</div>
		{/if}
	</div>
{/if}

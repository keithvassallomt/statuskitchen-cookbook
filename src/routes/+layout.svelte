<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';

	let { children, data } = $props();
</script>

<div class="min-h-screen flex flex-col">
	<Header recipes={data.recipes} />
	<main class="flex-1">
		{@render children()}
	</main>
	<footer class="p-4 text-center text-sm opacity-60 border-t border-surface-500/20">
		<p>
			Status Kitchen Cookbook &middot;
			<a
				href="https://github.com/keithvassallomt/statuskitchen-recipes"
				target="_blank"
				rel="noopener noreferrer"
				class="anchor"
			>
				Contribute a Recipe
			</a>
		</p>
	</footer>
</div>

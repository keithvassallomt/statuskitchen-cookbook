<script lang="ts">
	import { selectedTags, toggleTag } from '$lib/stores/filters';

	interface Props {
		availableTags: string[];
	}

	let { availableTags }: Props = $props();
</script>

{#if availableTags.length > 0}
	<div class="flex flex-wrap gap-2">
		{#each availableTags as tag}
			<button
				class="chip {$selectedTags.includes(tag) ? 'preset-filled-primary-500' : 'preset-outlined'}"
				onclick={() => toggleTag(tag)}
			>
				{tag}
			</button>
		{/each}
	</div>
{/if}

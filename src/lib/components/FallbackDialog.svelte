<script lang="ts">
	import { Modal } from '@skeletonlabs/skeleton-svelte';

	interface Props {
		recipeName: string;
		downloadUrl: string;
		open: boolean;
		onclose: () => void;
	}

	let { recipeName, downloadUrl, open, onclose }: Props = $props();
</script>

<Modal {open} onOpenChange={(e) => !e && onclose()}>
	<div class="card p-6 max-w-lg w-full">
		<header class="mb-4">
			<h3 class="h3">Install {recipeName}</h3>
		</header>

		<div class="space-y-4">
			<p>
				To install this recipe, you need
				<a
					href="https://github.com/keithvassallomt/status-kitchen"
					target="_blank"
					rel="noopener noreferrer"
					class="anchor"
				>
					Status Kitchen
				</a>
				installed on your GNOME desktop.
			</p>

			<aside class="alert preset-outlined-warning">
				<p class="text-sm">
					Status Kitchen is a Linux application for GNOME Shell. It is not available for Windows,
					macOS, or mobile devices.
				</p>
			</aside>

			<hr class="opacity-20" />

			<div>
				<p class="font-semibold mb-2">Manual Installation:</p>
				<ol class="list-decimal list-inside space-y-1 text-sm opacity-80">
					<li>Download the recipe file below</li>
					<li>Open Status Kitchen</li>
					<li>Click "Import Recipe"</li>
					<li>Select the downloaded .skr file</li>
				</ol>
			</div>

			<a href={downloadUrl} download class="btn preset-filled-secondary w-full">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-5 h-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
					/>
				</svg>
				<span>Download .skr File</span>
			</a>
		</div>

		<footer class="mt-6 flex justify-end">
			<button class="btn preset-tonal" onclick={onclose}>Close</button>
		</footer>
	</div>
</Modal>

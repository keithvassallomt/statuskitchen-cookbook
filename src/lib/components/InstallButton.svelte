<script lang="ts">
	import { browser } from '$app/environment';
	import { generateInstallUrl } from '$lib/utils/api';
	import FallbackDialog from './FallbackDialog.svelte';

	interface Props {
		downloadUrl: string;
		recipeName: string;
	}

	let { downloadUrl, recipeName }: Props = $props();

	let showFallback = $state(false);

	function handleInstall() {
		if (!browser) return;

		const installUrl = generateInstallUrl(downloadUrl);

		// Try to open the custom URL scheme using an iframe
		const iframe = document.createElement('iframe');
		iframe.style.display = 'none';
		iframe.src = installUrl;
		document.body.appendChild(iframe);

		// Set a timeout to show fallback if protocol handler isn't registered
		// If Status Kitchen opens, the page will lose focus or the iframe will work
		setTimeout(() => {
			document.body.removeChild(iframe);
			// If page is still visible after 2s, likely the handler wasn't found
			if (document.visibilityState === 'visible') {
				showFallback = true;
			}
		}, 2000);
	}
</script>

<button
	class="w-full sm:w-auto px-8 py-3 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
	style="background-color: rgb(249, 115, 22); color: white;"
	onmouseenter={(e) => (e.currentTarget.style.backgroundColor = 'rgb(234, 88, 12)')}
	onmouseleave={(e) => (e.currentTarget.style.backgroundColor = 'rgb(249, 115, 22)')}
	onclick={handleInstall}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
		class="w-5 h-5"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
		/>
	</svg>
	<span>Install</span>
</button>

<FallbackDialog {recipeName} {downloadUrl} open={showFallback} onclose={() => (showFallback = false)} />

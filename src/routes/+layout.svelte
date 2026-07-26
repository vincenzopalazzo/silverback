<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="shell">
	<Header />
	{@render children()}
	<Footer />
</div>

<style>
	.shell {
		min-height: 100vh;
		background: var(--paper);
	}
</style>

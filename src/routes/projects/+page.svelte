<script lang="ts">
	import { content } from '$lib/data/notion-content';

	const { copy, repos } = content;

	let filter = $state('All');
	const langs = ['All', ...new Set(repos.map((r) => r.lang))];
	let filtered = $derived(filter === 'All' ? repos : repos.filter((r) => r.lang === filter));
</script>

<svelte:head>
	<title>Projects — Silverback</title>
</svelte:head>

<main class="container">
	<section class="hero">
		<div class="label kicker">{copy.projects_kicker}</div>
		<h1 class="display hero-title">{copy.projects_title}</h1>
	</section>

	<div class="hairline filters">
		{#each langs as l (l)}
			<button class="filter mono" class:dim={l !== filter} onclick={() => (filter = l)}>{l}</button>
		{/each}
		<div class="spacer"></div>
	</div>

	<section class="list">
		{#each filtered as r (r.name)}
			<div class="row card-hover">
				<div class="cell-name">
					<div class="name mono">{r.name}</div>
					<div class="lang mono">{r.lang}</div>
				</div>
				<p class="desc">{r.desc}</p>
				<div class="meta mono">
					<span>★ {r.stars}</span>
					<span>{r.updated}</span>
				</div>
			</div>
		{/each}
	</section>
</main>

<style>
	.hero {
		padding: 120px 0 56px;
	}

	.kicker {
		margin-bottom: 40px;
	}

	.hero-title {
		font-size: clamp(40px, 5.2vw, 80px);
		max-width: 900px;
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 56px;
	}

	.filter {
		background: var(--paper);
		padding: 14px 22px;
		font-size: 12px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink);
	}

	.filter.dim {
		color: var(--graphite);
		opacity: 0.45;
	}

	.filter:hover {
		background: var(--hover-ground);
		opacity: 1;
	}

	.spacer {
		background: var(--paper);
		flex: 1;
		min-width: 120px;
	}

	.list {
		border-top: 1px solid var(--ink);
		margin-bottom: 140px;
	}

	.row {
		display: grid;
		grid-template-columns: minmax(0, 210px) minmax(0, 1fr) minmax(0, 150px);
		gap: 32px;
		padding: 32px 0;
		border-bottom: 1px solid var(--border);
		align-items: center;
		cursor: pointer;
	}

	.cell-name {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.name {
		font-size: 16px;
		font-weight: 500;
	}

	.lang {
		font-size: 11px;
		color: var(--silver);
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.desc {
		font-size: 17px;
		line-height: 1.5;
		margin: 0;
		max-width: 620px;
		text-wrap: pretty;
	}

	.meta {
		display: flex;
		gap: 20px;
		justify-content: flex-end;
		font-size: 12px;
		color: var(--graphite);
	}

	@media (max-width: 900px) {
		.hero {
			padding: 72px 0 40px;
		}

		.row {
			grid-template-columns: 1fr;
			gap: 12px;
		}

		.meta {
			justify-content: flex-start;
		}

		.list {
			margin-bottom: 96px;
		}
	}
</style>

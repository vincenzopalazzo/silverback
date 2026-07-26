<script lang="ts">
	import type { Repo } from '$lib/content';

	let { repo }: { repo: Repo } = $props();
</script>

<div class="card card-hover">
	<div class="top">
		<span class="name">{repo.name}</span>
		<span class="lang">{repo.lang}</span>
	</div>
	<p class="desc">{repo.desc}</p>
	<div class="meta">
		<span>★ {repo.stars}</span>
		<span>⑂ {repo.forks}</span>
		<span class="when">{repo.updated}</span>
	</div>
</div>

<style>
	.card {
		padding: 36px 32px 32px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		min-height: 250px;
		cursor: pointer;
	}

	.top {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 16px;
	}

	.name {
		font-family: var(--font-mono);
		font-size: 15px;
		font-weight: 500;
	}

	.lang {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--silver);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.desc {
		font-size: 16px;
		line-height: 1.55;
		margin: 0;
		flex: 1;
		text-wrap: pretty;
	}

	.meta {
		display: flex;
		gap: 24px;
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--graphite);
		letter-spacing: 0.06em;
		padding-top: 16px;
		border-top: 1px solid var(--border);
	}

	.when {
		margin-left: auto;
	}
</style>

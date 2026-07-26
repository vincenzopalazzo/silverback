<script lang="ts">
	import { content } from '$lib/data/notion-content';

	const { copy, timeline, governance, maintainers } = content;
</script>

<svelte:head>
	<title>About — Silverback</title>
</svelte:head>

<main class="container">
	<section class="hero">
		<div class="label kicker">{copy.about_kicker}</div>
		<h1 class="display hero-title">{copy.about_hero_title}</h1>
		<p class="hero-body">{copy.about_hero_body}</p>
	</section>

	<section class="block">
		<div class="split">
			<h2 class="subsection-title">{copy.about_history_title}</h2>
			<div>
				{#each timeline as t (t.year)}
					<div class="t-row">
						<div class="t-year mono">{t.year}</div>
						<div class="t-text">{t.text}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="block">
		<div class="split">
			<div>
				<h2 class="subsection-title gov-title">{copy.about_governance_title}</h2>
				<p class="body-copy">{copy.about_governance_body}</p>
			</div>
			<div class="hairline gov-grid">
				{#each governance as g (g.n)}
					<div class="gov-card">
						<div class="gov-n">{g.n}</div>
						<h3>{g.title}</h3>
						<p>{g.body}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="block last">
		<div class="split">
			<h2 class="subsection-title">{copy.about_maintainers_title}</h2>
			<div class="hairline m-grid">
				{#each maintainers as m (m.name)}
					<div class="m-card card-hover">
						<div class="m-initials mono">{m.initials}</div>
						<div>
							<div class="m-name">{m.name}</div>
							<div class="m-role mono">{m.role}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
</main>

<style>
	.hero {
		padding: 120px 0 100px;
		border-bottom: 1px solid var(--ink);
	}

	.kicker {
		margin-bottom: 40px;
	}

	.hero-title {
		font-size: clamp(40px, 5.6vw, 88px);
		max-width: 1000px;
		text-wrap: pretty;
	}

	.hero-body {
		font-size: 20px;
		line-height: 1.6;
		color: var(--graphite);
		max-width: 680px;
		margin: 48px 0 0;
	}

	.block {
		padding: 100px 0;
		border-bottom: 1px solid var(--border);
	}

	.block.last {
		padding-bottom: 140px;
		border-bottom: none;
	}

	.t-row {
		display: grid;
		grid-template-columns: minmax(0, 80px) minmax(0, 1fr);
		gap: 32px;
		padding: 28px 0;
		border-top: 1px solid var(--border);
	}

	.t-year {
		font-size: 13px;
		color: var(--silver);
	}

	.t-text {
		font-size: 17px;
		line-height: 1.55;
		max-width: 640px;
	}

	.gov-title {
		margin-bottom: 20px;
	}

	.gov-grid {
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
	}

	.gov-card {
		background: var(--paper);
		padding: 32px;
	}

	.gov-n {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--silver);
		margin-bottom: 14px;
	}

	.gov-card h3 {
		font-size: 19px;
		font-weight: 700;
		letter-spacing: -0.015em;
		margin: 0 0 12px;
	}

	.gov-card p {
		font-size: 15px;
		line-height: 1.6;
		color: var(--graphite);
		margin: 0;
	}

	.m-grid {
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
	}

	.m-card {
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.m-initials {
		width: 44px;
		height: 44px;
		background: var(--ink);
		color: var(--paper);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
	}

	.m-name {
		font-size: 15px;
		font-weight: 500;
	}

	.m-role {
		font-size: 11px;
		color: var(--silver);
		margin-top: 4px;
	}

	@media (max-width: 900px) {
		.hero {
			padding: 72px 0 64px;
		}

		.block {
			padding: 64px 0;
		}

		.block.last {
			padding-bottom: 96px;
		}
	}
</style>

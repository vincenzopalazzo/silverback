<script lang="ts">
	import { content } from '$lib/data/notion-content';
	import RepoCard from '$lib/components/RepoCard.svelte';

	const { site, copy, stats, principles, repos, activity } = content;
</script>

<svelte:head>
	<title>Silverback — {site.tagline}</title>
</svelte:head>

<main>
	<section class="dark-section hero">
		<div class="container">
			<div class="hero-grid">
				<div class="rise hero-logo">
					<img src="/assets/logo-full-white-c.png" alt="Silverback" />
				</div>
				<div class="rise-1">
					<div class="label kicker">{copy.home_hero_kicker}</div>
					<h1 class="display hero-title">{site.tagline}</h1>
					<p class="hero-sub">{site.subline}</p>
					<div class="hero-actions">
						<a class="btn btn-light" href="/contribute">{copy.home_hero_primary}</a>
						<a class="btn btn-outline-light" href="/projects">{copy.home_hero_secondary}</a>
					</div>
				</div>
			</div>
			<div class="stats">
				{#each stats as s (s.label)}
					<div class="stat">
						<div class="stat-value">{s.value}</div>
						<div class="stat-label">{s.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="container section">
		<div class="split">
			<div>
				<div class="label">{copy.home_principles_kicker}</div>
				<h2 class="section-title">{copy.home_principles_title}</h2>
			</div>
			<div class="principles">
				{#each principles as p (p.n)}
					<div class="principle">
						<div class="p-n mono">{p.n}</div>
						<div class="p-body">
							<h3>{p.title}</h3>
							<p>{p.body}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="container section">
		<div class="section-head">
			<div>
				<div class="label">{copy.home_featured_kicker}</div>
				<h2 class="section-title">{copy.home_featured_title}</h2>
			</div>
			<a class="btn-text" href="/projects">{copy.home_featured_all}</a>
		</div>
		<div class="hairline featured">
			{#each repos as r (r.name)}
				<RepoCard repo={r} />
			{/each}
		</div>
	</section>

	{#if site.showActivity}
		<section class="container section">
			<div class="split">
				<div>
					<div class="label">{copy.home_activity_kicker}</div>
					<h2 class="section-title">{copy.home_activity_title}</h2>
					<p class="body-copy activity-note">{copy.home_activity_body}</p>
				</div>
				<div class="activity">
					{#each activity as a (a.repo + a.what)}
						<div class="activity-row">
							<div class="avatar mono">{a.who}</div>
							<div class="activity-text">
								<div class="what">{a.what}</div>
								<div class="repo mono">{a.repo}</div>
							</div>
							<div class="when mono">{a.when}</div>
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<section class="dark-section cta">
		<div class="container cta-grid">
			<div>
				<h2 class="display cta-title">{copy.home_cta_title}</h2>
				<p class="cta-body">{copy.home_cta_body}</p>
			</div>
			<div class="cta-actions">
				<a class="btn btn-light btn-block" href="/contribute">{copy.home_cta_primary}</a>
				<a class="btn btn-outline-light btn-block" href="/about">{copy.home_cta_secondary}</a>
			</div>
		</div>
	</section>
</main>

<style>
	.hero {
		border-bottom: 1px solid var(--ink);
	}

	.hero-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
		gap: clamp(40px, 5vw, 80px);
		align-items: center;
		min-height: calc(100vh - 76px);
		padding: 80px 0;
	}

	.hero-logo {
		display: flex;
		justify-content: flex-start;
	}

	.hero-logo img {
		height: min(520px, 60vh);
		width: auto;
		display: block;
	}

	.kicker {
		margin-bottom: 32px;
	}

	.hero-title {
		font-size: clamp(48px, 6.4vw, 104px);
		line-height: 0.94;
		margin-bottom: 32px;
	}

	.hero-sub {
		font-size: 20px;
		line-height: 1.55;
		color: var(--silver);
		max-width: 520px;
		margin: 0 0 48px;
	}

	.hero-actions {
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		border-top: 1px solid var(--dark-divider);
	}

	.stat {
		padding: 36px 0;
		border-right: 1px solid var(--dark-divider);
	}

	.stat-value {
		font-size: 36px;
		font-weight: 700;
		letter-spacing: -0.03em;
		line-height: 1;
	}

	.stat-label {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--graphite);
		margin-top: 10px;
	}

	.section {
		padding-top: 140px;
	}

	.principles {
		border-top: 1px solid var(--ink);
	}

	.principle {
		display: grid;
		grid-template-columns: 48px minmax(0, 1fr);
		gap: 24px;
		padding: 40px 0;
		border-bottom: 1px solid var(--border);
		align-items: start;
	}

	.p-n {
		font-size: 12px;
		color: var(--silver);
		padding-top: 6px;
	}

	.p-body {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
		gap: 14px 40px;
		align-items: start;
	}

	.p-body h3 {
		font-size: 24px;
		font-weight: 700;
		letter-spacing: -0.02em;
		margin: 0;
		line-height: 1.2;
	}

	.p-body p {
		font-size: 16px;
		line-height: 1.6;
		color: var(--graphite);
		margin: 0;
	}

	.section-head {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 40px;
		padding-bottom: 32px;
		border-bottom: 1px solid var(--ink);
	}

	.featured {
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
		border-top: none;
	}

	.activity-note {
		margin-top: 24px;
	}

	.activity {
		border-top: 1px solid var(--ink);
	}

	.activity-row {
		display: grid;
		grid-template-columns: 38px minmax(0, 1fr) auto;
		gap: 20px;
		align-items: center;
		padding: 20px 0;
		border-bottom: 1px solid var(--border);
	}

	.avatar {
		width: 38px;
		height: 38px;
		border: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
	}

	.activity-text {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.what {
		font-size: 15px;
		line-height: 1.4;
	}

	.repo {
		font-size: 11px;
		color: var(--silver);
	}

	.when {
		font-size: 11px;
		color: var(--graphite);
	}

	.cta {
		margin-top: 140px;
	}

	.cta-grid {
		padding-top: 120px;
		padding-bottom: 120px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
		gap: clamp(40px, 5vw, 80px);
		align-items: center;
	}

	.cta-title {
		font-size: clamp(36px, 4.4vw, 64px);
		line-height: 1.02;
		margin-bottom: 24px;
		white-space: pre-line;
	}

	.cta-body {
		font-size: 18px;
		line-height: 1.6;
		color: var(--silver);
		max-width: 520px;
		margin: 0;
	}

	.cta-actions {
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-items: flex-start;
	}

	.btn-block {
		width: 100%;
		text-align: left;
	}

	@media (max-width: 900px) {
		.hero-grid {
			min-height: 0;
			padding: 56px 0;
		}

		.hero-logo img {
			height: min(190px, 40vh);
		}

		.stats {
			grid-template-columns: 1fr 1fr;
			gap: 1px;
			background: var(--dark-divider);
		}

		.stat {
			background: var(--ink);
			border-right: none;
			padding: 18px 0;
		}

		.stat-value {
			font-size: 24px;
		}

		.section {
			padding-top: 80px;
		}

		.cta {
			margin-top: 80px;
		}

		.cta-grid {
			padding-top: 72px;
			padding-bottom: 72px;
		}

		.principle {
			grid-template-columns: 1fr;
			gap: 8px;
			padding: 20px 0;
		}
	}
</style>

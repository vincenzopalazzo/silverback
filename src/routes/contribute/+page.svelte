<script lang="ts">
	import { base } from '$app/paths';
	import { content } from '$lib/data/notion-content';

	const { copy, steps, issues, channels } = content;

	const channelUrls: Record<string, string> = {
		Discussions: 'https://github.com/vincenzopalazzo/silverback/discussions',
		Matrix: 'https://matrix.to/#/#silverback:matrix.org'
	};

	const channelHref = (name: string): string => channelUrls[name] ?? '#';
</script>

<svelte:head>
	<title>Contribute — Silverback</title>
</svelte:head>

<main>
	<section class="dark-section hero">
		<div class="container hero-grid">
			<div>
				<div class="label kicker">{copy.contribute_kicker}</div>
				<h1 class="display hero-title">{copy.contribute_title}</h1>
				<p class="hero-body">{copy.contribute_body}</p>
			</div>
			<div class="hero-mark">
				<img src="{base}/assets/mark-white-c.png" alt="" />
			</div>
		</div>
	</section>

	<section class="container block">
		<div class="hairline steps">
			{#each steps as s (s.n)}
				<div class="step">
					<div class="step-n mono">{s.n}</div>
					<h3>{s.title}</h3>
					<p>{s.body}</p>
					<div class="step-link mono">{s.link} →</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="container block">
		<div class="section-head">
			<h2 class="issues-title">{copy.contribute_issues_title}</h2>
			<div class="updated">{copy.contribute_issues_updated}</div>
		</div>
		{#each issues as i (i.title)}
			<div class="issue-row card-hover">
				<div class="issue-title">{i.title}</div>
				<div class="issue-repo mono">{i.repo}</div>
				<div class="issue-label mono">{i.label}</div>
			</div>
		{/each}
	</section>

	<section class="container block last">
		<div class="split">
			<div>
				<h2 class="subsection-title talk-title">{copy.contribute_talk_title}</h2>
				<p class="body-copy">{copy.contribute_talk_body}</p>
			</div>
			<div class="hairline channels">
				{#each channels as c (c.name)}
					<!-- svelte-ignore a11y_invalid_attribute -->
					<a class="channel card-hover" href={channelHref(c.name)}>
						<div class="c-name">{c.name}</div>
						<div class="c-body">{c.body}</div>
						<div class="c-meta mono">{c.meta}</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
</main>

<style>
	.hero-grid {
		padding-top: 120px;
		padding-bottom: 120px;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
		gap: clamp(40px, 5vw, 80px);
		align-items: center;
	}

	.kicker {
		margin-bottom: 36px;
	}

	.hero-title {
		font-size: clamp(40px, 5.2vw, 80px);
		margin-bottom: 32px;
	}

	.hero-body {
		font-size: 20px;
		line-height: 1.6;
		color: var(--silver);
		max-width: 560px;
		margin: 0;
	}

	.hero-mark {
		display: flex;
		justify-content: center;
	}

	.hero-mark img {
		height: 280px;
		width: auto;
		display: block;
		opacity: 0.9;
	}

	.block {
		padding-top: 120px;
	}

	.block.last {
		padding-bottom: 140px;
	}

	.steps {
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
	}

	.step {
		background: var(--paper);
		padding: 40px 32px;
		display: flex;
		flex-direction: column;
		gap: 18px;
		min-height: 280px;
	}

	.step-n {
		font-size: 12px;
		color: var(--silver);
	}

	.step h3 {
		font-size: 24px;
		font-weight: 700;
		letter-spacing: -0.02em;
		margin: 0;
		line-height: 1.15;
	}

	.step p {
		font-size: 16px;
		line-height: 1.6;
		color: var(--graphite);
		margin: 0;
		flex: 1;
	}

	.step-link {
		font-size: 12px;
		border-top: 1px solid var(--border);
		padding-top: 16px;
	}

	.section-head {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 24px;
		padding-bottom: 32px;
		border-bottom: 1px solid var(--ink);
	}

	.issues-title {
		font-size: 36px;
		font-weight: 700;
		letter-spacing: -0.035em;
		margin: 0;
	}

	.updated {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--graphite);
	}

	.issue-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 150px) minmax(0, 140px);
		gap: 28px;
		padding: 26px 0;
		border-bottom: 1px solid var(--border);
		align-items: center;
		cursor: pointer;
	}

	.issue-title {
		font-size: 17px;
		line-height: 1.45;
	}

	.issue-repo {
		font-size: 12px;
		color: var(--graphite);
	}

	.issue-label {
		justify-self: end;
		border: 1px solid var(--border);
		padding: 6px 12px;
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.talk-title {
		margin-bottom: 20px;
	}

	.channels {
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
	}

	.channel {
		padding: 32px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		color: var(--ink);
	}

	.channel:hover {
		color: var(--ink);
	}

	.c-name {
		font-size: 19px;
		font-weight: 700;
		letter-spacing: -0.015em;
	}

	.c-body {
		font-size: 15px;
		line-height: 1.55;
		color: var(--graphite);
	}

	.c-meta {
		font-size: 11px;
		color: var(--silver);
		margin-top: 8px;
	}

	@media (max-width: 900px) {
		.hero-grid {
			padding-top: 72px;
			padding-bottom: 72px;
		}

		.block {
			padding-top: 72px;
		}

		.block.last {
			padding-bottom: 96px;
		}

		.issue-row {
			grid-template-columns: 1fr;
			gap: 10px;
		}

		.issue-label {
			justify-self: start;
		}
	}
</style>

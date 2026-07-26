<script lang="ts">
	import { content } from '$lib/data/notion-content';

	const { copy, site, stats, principles, repos, taglines } = content;
	const featuredMobile = repos.slice(0, 3);

	const palette = [
		{ hex: '#000000', name: 'Ink · type, fills, rules' },
		{ hex: '#FFFFFF', name: 'Paper · default ground' },
		{ hex: '#6E6E6E', name: 'Graphite · secondary text' },
		{ hex: '#A8A8A8', name: 'Silver · hover, accents' }
	];

	const typeScale = [
		{ spec: 'Display / 700 / -4.5%', cls: 't-display', text: 'Strength in the open' },
		{ spec: 'Section / 40 / 700', cls: 't-section', text: 'Three rules, held without exception' },
		{ spec: 'Card title / 24 / 700', cls: 't-card', text: 'Built to be read' },
		{
			spec: 'Body / 16–20 / 400',
			cls: 't-body',
			text: 'Code is a document. We optimise for the person who inherits it, not the one who wrote it.'
		},
		{ spec: 'Label / mono 11 / 20%', cls: 't-label', text: 'Featured work · 42 repositories' }
	];

	const sampleRepos = repos.slice(0, 2);
</script>

<svelte:head>
	<title>Design foundations — Silverback</title>
</svelte:head>

<main class="container">
	<section class="hero">
		<div class="label kicker">{copy.foundations_kicker}</div>
		<h1 class="display hero-title">{copy.foundations_title}</h1>
		<p class="hero-body">{copy.foundations_body}</p>
	</section>

	<section class="block first">
		<div class="split">
			<h2 class="subsection-title">{copy.foundations_palette_title}</h2>
			<div class="hairline swatches">
				{#each palette as p (p.hex)}
					<div class="swatch">
						<div class="chip" class:chip-paper={p.hex === '#FFFFFF'} style="background:{p.hex}"></div>
						<div class="swatch-text">
							<div class="mono hex">{p.hex}</div>
							<div class="swatch-name">{p.name}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="split extra">
			<div></div>
			<div class="extras mono">
				<span>Borders #E4E4E4</span>
				<span>Hover ground #FAFAFA</span>
				<span>Dark divider #262626</span>
				<span>Dark border #3A3A3A</span>
			</div>
		</div>
	</section>

	<section class="block">
		<div class="split">
			<div>
				<h2 class="subsection-title side-title">{copy.foundations_type_title}</h2>
				<p class="body-copy">{copy.foundations_type_body}</p>
			</div>
			<div>
				{#each typeScale as t (t.spec)}
					<div class="type-row">
						<div class="type-spec mono">{t.spec}</div>
						<div class={t.cls}>{t.text}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="block">
		<div class="split">
			<h2 class="subsection-title">{copy.foundations_components_title}</h2>
			<div class="showcase">
				<div>
					<div class="show-label">Buttons · 0 radius, 0 shadow</div>
					<div class="btn-row">
						<button class="cbtn cbtn-primary">Primary</button>
						<button class="cbtn cbtn-secondary">Secondary</button>
						<button class="cbtn cbtn-quiet">Quiet</button>
						<button class="btn-text">Text link →</button>
						<div class="onblack">
							<button class="cbtn cbtn-onblack">On black</button>
							<button class="cbtn cbtn-outlined">Outlined</button>
						</div>
					</div>
				</div>

				<div>
					<div class="show-label">Repo card · hairline grid, hover ground</div>
					<div class="hairline sample-repos">
						{#each sampleRepos as r (r.name)}
							<div class="sample-card card-hover">
								<div class="sample-top">
									<span class="mono s-name">{r.name}</span>
									<span class="mono s-lang">{r.lang}</span>
								</div>
								<p>{r.desc}</p>
								<div class="mono s-meta">
									<span>★ {r.stars}</span>
									<span>⑂ {r.forks}</span>
									<span class="s-when">{r.updated}</span>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<div>
					<div class="show-label">Tags, counters, avatars</div>
					<div class="tag-row">
						<span class="tag">good first issue</span>
						<span class="tag tag-dark-border">docs</span>
						<span class="tag tag-inverted">rfc open</span>
						<span class="counter mono">★ {site.stars}</span>
						<span class="av mono">NR</span>
						<span class="av av-inverted mono">KA</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="block">
		<div class="split">
			<div>
				<h2 class="subsection-title side-title">{copy.foundations_taglines_title}</h2>
				<p class="body-copy">{copy.foundations_taglines_body}</p>
			</div>
			<div class="taglines">
				{#each taglines as t (t.n)}
					<div class="tagline-row">
						<div class="tagline-n mono">{t.n}</div>
						<div class="tagline-body">
							<div class="tagline-line">{t.line}</div>
							<div class="tagline-note">{t.note}</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section class="block last">
		<div class="split">
			<div>
				<h2 class="subsection-title side-title">{copy.foundations_mobile_title}</h2>
				<p class="body-copy">{copy.foundations_mobile_body}</p>
			</div>
			<div class="frames">
				<div class="phone">
					<div class="ph-header">
						<div class="ph-brand">
							<img src="/assets/mark-black-c.png" alt="" />
							<span>SILVERBACK</span>
						</div>
						<div class="ph-burger"><span></span><span></span></div>
					</div>
					<div class="ph-hero">
						<img class="ph-logo" src="/assets/logo-full-white-c.png" alt="" />
						<div class="ph-kicker">Open-source collective</div>
						<h2>{site.tagline}</h2>
						<p>{site.subline}</p>
						<div class="ph-actions">
							<button class="ph-btn-light">{copy.home_hero_primary}</button>
							<button class="ph-btn-outline">{copy.home_hero_secondary}</button>
						</div>
						<div class="ph-stats">
							{#each stats as s (s.label)}
								<div class="ph-stat">
									<div class="ph-stat-value">{s.value}</div>
									<div class="ph-stat-label">{s.label}</div>
								</div>
							{/each}
						</div>
					</div>
					<div class="ph-section">
						<div class="ph-label">{copy.home_principles_kicker}</div>
						<h3>{copy.home_principles_title}</h3>
						<div class="ph-list">
							{#each principles as p (p.n)}
								<div class="ph-principle">
									<div class="ph-p-n mono">{p.n}</div>
									<div class="ph-p-title">{p.title}</div>
									<div class="ph-p-body">{p.body}</div>
								</div>
							{/each}
						</div>
					</div>
					<div class="ph-section flush-top">
						<div class="ph-featured-head">
							<h3>Featured work</h3>
							<span class="mono">All 42</span>
						</div>
						{#each featuredMobile as r (r.name)}
							<div class="ph-repo">
								<div class="ph-repo-top">
									<span class="mono ph-r-name">{r.name}</span>
									<span class="mono ph-r-lang">{r.lang}</span>
								</div>
								<div class="ph-r-desc">{r.desc}</div>
								<div class="mono ph-r-meta">
									<span>★ {r.stars}</span>
									<span>{r.updated}</span>
								</div>
							</div>
						{/each}
					</div>
					<div class="ph-cta">
						<h3>Your first patch can land this week.</h3>
						<p>No patch waits longer than 72 hours for a human answer.</p>
						<button class="ph-btn-light">Contributor guide →</button>
					</div>
					<div class="ph-footer">
						<div class="mono">MIT licensed · No trackers</div>
						<div class="ph-word">SILVERBACK</div>
					</div>
				</div>
			</div>
		</div>
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
		margin-bottom: 32px;
	}

	.hero-body {
		font-size: 19px;
		line-height: 1.6;
		color: var(--graphite);
		max-width: 680px;
		margin: 0;
	}

	.block {
		padding: 80px 0;
		border-top: 1px solid var(--border);
	}

	.block.first {
		border-top: 1px solid var(--ink);
	}

	.block.last {
		padding-bottom: 140px;
	}

	.side-title {
		margin-bottom: 20px;
	}

	.swatches {
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
	}

	.swatch {
		background: var(--paper);
	}

	.chip {
		height: 150px;
	}

	.chip-paper {
		border-bottom: 1px solid var(--border);
	}

	.swatch-text {
		padding: 20px;
	}

	.hex {
		font-size: 13px;
	}

	.swatch-name {
		font-size: 13px;
		color: var(--graphite);
		margin-top: 6px;
	}

	.extra {
		margin-top: 32px;
	}

	.extras {
		display: flex;
		gap: 32px;
		flex-wrap: wrap;
		font-size: 12px;
		color: var(--graphite);
	}

	.type-row {
		border-top: 1px solid var(--border);
		padding: 24px 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
		gap: 12px 40px;
		align-items: baseline;
	}

	.type-spec {
		font-size: 11px;
		color: var(--silver);
	}

	.t-display {
		font-size: clamp(34px, 3.6vw, 64px);
		font-weight: 700;
		letter-spacing: -0.045em;
		line-height: 1;
	}

	.t-section {
		font-size: 40px;
		font-weight: 700;
		letter-spacing: -0.035em;
	}

	.t-card {
		font-size: 24px;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.t-body {
		font-size: 17px;
		line-height: 1.6;
		max-width: 520px;
	}

	.t-label {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--graphite);
	}

	.showcase {
		display: flex;
		flex-direction: column;
		gap: 48px;
	}

	.show-label {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--silver);
		margin-bottom: 20px;
	}

	.btn-row {
		display: flex;
		gap: 16px;
		flex-wrap: wrap;
		align-items: center;
	}

	.cbtn {
		font-size: 15px;
		font-weight: 500;
		padding: 16px 28px;
		border: 1px solid transparent;
	}

	.cbtn-primary {
		background: var(--ink);
		color: var(--paper);
	}

	.cbtn-primary:hover {
		background: var(--silver);
		color: var(--ink);
	}

	.cbtn-secondary {
		border-color: var(--ink);
	}

	.cbtn-secondary:hover {
		border-color: var(--silver);
		color: var(--silver);
	}

	.cbtn-quiet {
		border-color: var(--border);
	}

	.cbtn-quiet:hover {
		border-color: var(--ink);
	}

	.onblack {
		background: var(--ink);
		padding: 20px 24px;
		display: flex;
		gap: 16px;
	}

	.cbtn-onblack {
		background: var(--paper);
		color: var(--ink);
	}

	.cbtn-onblack:hover {
		background: var(--silver);
	}

	.cbtn-outlined {
		color: var(--paper);
		border-color: var(--dark-border);
	}

	.cbtn-outlined:hover {
		border-color: var(--paper);
	}

	.sample-repos {
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
		max-width: 720px;
	}

	.sample-card {
		padding: 32px;
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.sample-top {
		display: flex;
		justify-content: space-between;
	}

	.s-name {
		font-size: 15px;
		font-weight: 500;
	}

	.s-lang {
		font-size: 11px;
		color: var(--silver);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.sample-card p {
		font-size: 16px;
		line-height: 1.55;
		margin: 0;
	}

	.s-meta {
		display: flex;
		gap: 24px;
		font-size: 11px;
		color: var(--graphite);
		border-top: 1px solid var(--border);
		padding-top: 16px;
	}

	.s-when {
		margin-left: auto;
	}

	.tag-row {
		display: flex;
		gap: 16px;
		align-items: center;
		flex-wrap: wrap;
	}

	.tag {
		border: 1px solid var(--border);
		padding: 7px 12px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.tag-dark-border {
		border-color: var(--ink);
	}

	.tag-inverted {
		background: var(--ink);
		color: var(--paper);
		border-color: var(--ink);
	}

	.counter {
		display: flex;
		align-items: center;
		gap: 10px;
		border: 1px solid var(--border);
		padding: 8px 14px;
		font-size: 12px;
	}

	.av {
		width: 38px;
		height: 38px;
		border: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 11px;
	}

	.av-inverted {
		background: var(--ink);
		color: var(--paper);
		border-color: var(--ink);
	}

	.taglines {
		border-top: 1px solid var(--border);
	}

	.tagline-row {
		display: grid;
		grid-template-columns: 40px minmax(0, 1fr);
		gap: 20px;
		padding: 24px 0;
		border-bottom: 1px solid var(--border);
		align-items: baseline;
	}

	.tagline-n {
		font-size: 11px;
		color: var(--silver);
	}

	.tagline-body {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
		gap: 10px 40px;
		align-items: baseline;
	}

	.tagline-line {
		font-size: 26px;
		font-weight: 700;
		letter-spacing: -0.03em;
	}

	.tagline-note {
		font-size: 14px;
		line-height: 1.55;
		color: var(--graphite);
	}

	.frames {
		display: flex;
		gap: 40px;
		flex-wrap: wrap;
	}

	.phone {
		width: 390px;
		max-width: 100%;
		border: 1px solid var(--ink);
		overflow: hidden;
	}

	.ph-header {
		height: 44px;
		border-bottom: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20px;
	}

	.ph-brand {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.ph-brand img {
		height: 20px;
		width: auto;
		display: block;
	}

	.ph-brand span {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.2em;
	}

	.ph-burger {
		display: flex;
		flex-direction: column;
		gap: 4px;
		width: 18px;
	}

	.ph-burger span {
		height: 1px;
		background: var(--ink);
		width: 100%;
	}

	.ph-hero {
		background: var(--ink);
		color: var(--paper);
		padding: 36px 24px 28px;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.ph-logo {
		height: 190px;
		width: auto;
		align-self: flex-start;
	}

	.ph-kicker {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--silver);
	}

	.ph-hero h2 {
		font-size: 44px;
		line-height: 0.96;
		letter-spacing: -0.04em;
		font-weight: 700;
		margin: 0;
	}

	.ph-hero p {
		font-size: 15px;
		line-height: 1.55;
		color: var(--silver);
		margin: 0;
	}

	.ph-actions {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.ph-btn-light {
		background: var(--paper);
		color: var(--ink);
		padding: 16px;
		font-size: 15px;
		font-weight: 500;
	}

	.ph-btn-outline {
		color: var(--paper);
		border: 1px solid var(--dark-border);
		padding: 16px;
		font-size: 15px;
		font-weight: 500;
	}

	.ph-stats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1px;
		background: var(--dark-divider);
		border-top: 1px solid var(--dark-divider);
		margin-top: 8px;
	}

	.ph-stat {
		background: var(--ink);
		padding: 18px 0;
	}

	.ph-stat-value {
		font-size: 24px;
		font-weight: 700;
		letter-spacing: -0.03em;
	}

	.ph-stat-label {
		font-family: var(--font-mono);
		font-size: 9px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--graphite);
		margin-top: 6px;
	}

	.ph-section {
		padding: 40px 24px;
	}

	.ph-section.flush-top {
		padding-top: 0;
	}

	.ph-label {
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--graphite);
		margin-bottom: 16px;
	}

	.ph-section h3 {
		font-size: 26px;
		font-weight: 700;
		letter-spacing: -0.03em;
		line-height: 1.1;
		margin: 0 0 24px;
		white-space: pre-line;
	}

	.ph-list {
		border-top: 1px solid var(--ink);
	}

	.ph-principle {
		padding: 20px 0;
		border-bottom: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.ph-p-n {
		font-size: 11px;
		color: var(--silver);
	}

	.ph-p-title {
		font-size: 19px;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.ph-p-body {
		font-size: 14px;
		line-height: 1.6;
		color: var(--graphite);
	}

	.ph-featured-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		border-bottom: 1px solid var(--ink);
		padding-bottom: 16px;
	}

	.ph-featured-head h3 {
		margin: 0;
	}

	.ph-featured-head span {
		font-size: 10px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--graphite);
	}

	.ph-repo {
		padding: 22px 0;
		border-bottom: 1px solid var(--border);
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.ph-repo-top {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.ph-r-name {
		font-size: 14px;
		font-weight: 500;
	}

	.ph-r-lang {
		font-size: 10px;
		color: var(--silver);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.ph-r-desc {
		font-size: 15px;
		line-height: 1.5;
	}

	.ph-r-meta {
		font-size: 10px;
		color: var(--graphite);
		display: flex;
		gap: 18px;
	}

	.ph-cta {
		background: var(--ink);
		color: var(--paper);
		padding: 44px 24px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.ph-cta h3 {
		font-size: 32px;
		line-height: 1.02;
		letter-spacing: -0.035em;
		font-weight: 700;
		margin: 0;
	}

	.ph-cta p {
		font-size: 15px;
		line-height: 1.55;
		color: var(--silver);
		margin: 0;
	}

	.ph-footer {
		padding: 32px 24px;
		display: flex;
		flex-direction: column;
		gap: 14px;
		border-top: 1px solid var(--border);
	}

	.ph-footer .mono {
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--silver);
	}

	.ph-word {
		font-size: 32px;
		font-weight: 700;
		letter-spacing: 0.06em;
		line-height: 1;
	}

	@media (max-width: 900px) {
		.hero {
			padding: 72px 0 40px;
		}

		.block {
			padding: 56px 0;
		}

		.block.last {
			padding-bottom: 96px;
		}
	}
</style>

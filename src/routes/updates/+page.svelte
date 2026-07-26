<script lang="ts">
	import { content } from '$lib/data/notion-content';

	const { copy, posts } = content;
</script>

<svelte:head>
	<title>Updates — Silverback</title>
</svelte:head>

<main class="container">
	<section class="hero">
		<div class="label kicker">{copy.updates_kicker}</div>
		<h1 class="display hero-title">{copy.updates_title}</h1>
	</section>

	<!-- svelte-ignore a11y_invalid_attribute -->
	<a class="featured" href="#">
		<div class="featured-text">
			<div class="featured-kicker">{copy.updates_featured_kicker}</div>
			<h2>{copy.updates_featured_title}</h2>
			<p>{copy.updates_featured_excerpt}</p>
			<div class="featured-cta mono">{copy.updates_featured_cta}</div>
		</div>
		<div class="featured-logo">
			<img src="/assets/logo-full-white-c.png" alt="" />
		</div>
	</a>

	<section class="list">
		{#each posts as p (p.title)}
			<!-- svelte-ignore a11y_invalid_attribute -->
			<a class="row card-hover" href="#">
				<div class="kind mono">{p.kind}</div>
				<div>
					<h3>{p.title}</h3>
					<p>{p.excerpt}</p>
				</div>
				<div class="date mono">{p.date}</div>
			</a>
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

	.featured {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
		border: 1px solid var(--border);
		margin-bottom: 80px;
		color: var(--ink);
	}

	.featured:hover {
		border-color: var(--ink);
		color: var(--ink);
	}

	.featured-text {
		padding: 56px 48px;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.featured-kicker {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--silver);
	}

	.featured-text h2 {
		font-size: 40px;
		font-weight: 700;
		letter-spacing: -0.035em;
		line-height: 1.08;
		margin: 0;
		text-wrap: pretty;
	}

	.featured-text p {
		font-size: 17px;
		line-height: 1.6;
		color: var(--graphite);
		margin: 0;
		max-width: 520px;
	}

	.featured-cta {
		font-size: 12px;
		margin-top: auto;
	}

	.featured-logo {
		background: var(--ink);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 48px;
	}

	.featured-logo img {
		height: 260px;
		width: auto;
		display: block;
	}

	.list {
		border-top: 1px solid var(--ink);
		margin-bottom: 140px;
	}

	.row {
		display: grid;
		grid-template-columns: minmax(0, 120px) minmax(0, 1fr) minmax(0, 120px);
		gap: 32px;
		padding: 36px 0;
		border-bottom: 1px solid var(--border);
		align-items: baseline;
		color: var(--ink);
	}

	.row:hover {
		color: var(--ink);
	}

	.kind {
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--silver);
	}

	.row h3 {
		font-size: 24px;
		font-weight: 700;
		letter-spacing: -0.025em;
		margin: 0 0 10px;
		line-height: 1.2;
	}

	.row p {
		font-size: 16px;
		line-height: 1.55;
		color: var(--graphite);
		margin: 0;
		max-width: 620px;
	}

	.date {
		font-size: 12px;
		color: var(--graphite);
		justify-self: end;
	}

	@media (max-width: 900px) {
		.hero {
			padding: 72px 0 40px;
		}

		.featured-text {
			padding: 40px 28px;
		}

		.featured-text h2 {
			font-size: 30px;
		}

		.featured-logo img {
			height: 160px;
		}

		.row {
			grid-template-columns: 1fr;
			gap: 12px;
		}

		.date {
			justify-self: start;
		}

		.list {
			margin-bottom: 96px;
		}
	}
</style>

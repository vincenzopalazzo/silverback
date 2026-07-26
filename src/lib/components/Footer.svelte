<script lang="ts">
	import { content } from '$lib/data/notion-content';

	const routes: Record<string, string> = {
		Core: '/projects',
		Forge: '/projects',
		Atlas: '/projects',
		Plinth: '/projects',
		'All repositories': '/projects',
		Contribute: '/contribute',
		Governance: '/about',
		Maintainers: '/about',
		'Office hours': '/contribute',
		'Code of conduct': '#',
		Documentation: '/updates',
		'RFC archive': '/updates',
		Updates: '/updates',
		'Open collective': '#',
		'Press kit': '#'
	};

	const href = (label: string): string => routes[label] ?? '#';

	const bottomLinks = ['Code of conduct', 'Security', 'Status', 'No trackers on this site'];
</script>

<footer class="dark-section">
	<div class="container inner">
		<div class="cols">
			<div class="intro">
				<img src="/assets/mark-white-c.png" alt="Silverback" />
				<p>{content.copy.footer_blurb}</p>
			</div>
			{#each content.footerCols as col (col.title)}
				<div class="col">
					<div class="col-title">{col.title}</div>
					{#each col.links as link (link)}
						<a href={href(link)}>{link}</a>
					{/each}
				</div>
			{/each}
		</div>
		<div class="wordmark">SILVERBACK</div>
		<div class="bottom">
			<span>{content.copy.footer_copyright}</span>
			<div class="bottom-links">
				<a href="/foundations">Design foundations</a>
				{#each bottomLinks as link (link)}
					<!-- svelte-ignore a11y_invalid_attribute -->
					<a href={href(link)}>{link}</a>
				{/each}
			</div>
		</div>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid var(--ink);
	}

	.inner {
		padding-top: 100px;
		padding-bottom: 48px;
	}

	.cols {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 190px), 1fr));
		gap: 48px;
		padding-bottom: 80px;
		border-bottom: 1px solid var(--dark-divider);
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: 24px;
		align-items: flex-start;
	}

	.intro img {
		height: 64px;
		width: auto;
		display: block;
	}

	.intro p {
		font-size: 16px;
		line-height: 1.6;
		color: var(--silver);
		max-width: 320px;
		margin: 0;
	}

	.col {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.col-title {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--graphite);
	}

	.col a {
		font-size: 15px;
		color: var(--paper);
	}

	.col a:hover {
		color: var(--silver);
	}

	.wordmark {
		padding: 56px 0 0;
		font-size: clamp(48px, 10.6vw, 150px);
		font-weight: 700;
		letter-spacing: 0.02em;
		line-height: 0.9;
		color: var(--paper);
	}

	.bottom {
		display: flex;
		justify-content: space-between;
		gap: 40px;
		flex-wrap: wrap;
		padding-top: 40px;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--graphite);
	}

	.bottom-links {
		display: flex;
		gap: 32px;
		flex-wrap: wrap;
	}

	.bottom-links a {
		color: var(--graphite);
	}

	.bottom-links a:hover {
		color: var(--paper);
	}
</style>

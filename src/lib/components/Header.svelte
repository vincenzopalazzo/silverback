<script lang="ts">
	import { page } from '$app/state';
	import { content } from '$lib/data/notion-content';

	const nav = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/contribute', label: 'Contribute' },
		{ href: '/updates', label: 'Updates' }
	];

	let open = $state(false);

	function isActive(href: string): boolean {
		const p = page.url.pathname;
		return href === '/' ? p === '/' : p.startsWith(href);
	}

	$effect(() => {
		// close the mobile menu on navigation
		page.url.pathname;
		open = false;
	});
</script>

<header>
	<div class="bar container">
		<a class="brand" href="/" aria-label="Silverback home">
			<img src="/assets/mark-black-c.png" alt="Silverback" />
			<span>SILVERBACK</span>
		</a>

		<nav class:open aria-label="Main">
			{#each nav as item (item.href)}
				<a class="nav-link" class:active={isActive(item.href)} href={item.href}>
					<span>{item.label}</span>
					<span class="underline"></span>
				</a>
			{/each}
		</nav>

		<div class="actions">
			<a class="stars" href="https://github.com/vincenzopalazzo/silverback" target="_blank" rel="noreferrer"><span>★</span><span>{content.site.stars}</span></a>
			<a class="join" href="/contribute">Join</a>
			<button class="burger" aria-label="Toggle menu" aria-expanded={open} onclick={() => (open = !open)}>
				<span></span>
				<span></span>
			</button>
		</div>
	</div>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: rgba(255, 255, 255, 0.92);
		backdrop-filter: blur(8px);
		border-bottom: 1px solid var(--border);
	}

	.bar {
		height: 76px;
		display: flex;
		align-items: center;
		gap: 32px;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-shrink: 0;
	}

	.brand img {
		height: 30px;
		width: auto;
		display: block;
	}

	.brand span {
		font-size: 14px;
		font-weight: 700;
		letter-spacing: 0.22em;
		color: var(--ink);
	}

	nav {
		display: flex;
		align-items: center;
		gap: 28px;
		margin-left: auto;
		flex-wrap: wrap;
		justify-content: flex-end;
		row-gap: 0;
	}

	.nav-link {
		font-size: 14px;
		font-weight: 500;
		letter-spacing: 0.01em;
		color: var(--ink);
		display: flex;
		flex-direction: column;
		gap: 6px;
		white-space: nowrap;
	}

	.nav-link:hover {
		color: var(--silver);
	}

	.underline {
		height: 1px;
		background: var(--ink);
		width: 100%;
		opacity: 0;
	}

	.nav-link.active .underline {
		opacity: 1;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-shrink: 0;
		white-space: nowrap;
	}

	.stars {
		display: flex;
		align-items: center;
		gap: 10px;
		border: 1px solid var(--border);
		padding: 9px 14px;
		font-family: var(--font-mono);
		font-size: 12px;
		color: var(--ink);
	}

	.stars:hover {
		border-color: var(--ink);
		color: var(--ink);
	}

	.join {
		background: var(--ink);
		color: var(--paper);
		padding: 12px 22px;
		font-size: 14px;
		font-weight: 500;
	}

	.join:hover {
		background: var(--silver);
		color: var(--ink);
	}

	.burger {
		display: none;
		flex-direction: column;
		gap: 4px;
		width: 18px;
	}

	.burger span {
		height: 1px;
		background: var(--ink);
		width: 100%;
	}

	@media (max-width: 900px) {
		nav {
			display: none;
		}

		nav.open {
			display: flex;
			position: absolute;
			top: 76px;
			left: 0;
			right: 0;
			background: var(--paper);
			border-bottom: 1px solid var(--border);
			flex-direction: column;
			align-items: flex-start;
			gap: 18px;
			padding: 20px 24px 28px;
		}

		.burger {
			display: flex;
		}
	}
</style>

#!/usr/bin/env node

/**
 * Fetch all site content from Notion and generate src/lib/data/notion-content.ts
 *
 * The website itself NEVER calls Notion at runtime. This script runs at
 * content-sync time and bakes everything into a typed TypeScript module that
 * the SvelteKit app imports statically — the same pattern as
 * github.com/hedwig-corp/mrvino-website.
 *
 * Usage:
 *   npm run fetch-content              # fetch from Notion + write the module
 *   npm run fetch-content -- --dry-run # print what would be written
 *
 * Every section whose database ID is not configured (or whose query fails)
 * falls back to the defaults in src/lib/content.ts, so the build never breaks
 * and sections can be migrated to Notion one at a time.
 */

import 'dotenv/config';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const OUT = new URL('../src/lib/data/notion-content.ts', import.meta.url);
const dryRun = process.argv.includes('--dry-run');

/* ---------------- Notion property readers ---------------- */

const title = (p) => (p?.title ?? []).map((t) => t.plain_text).join('');
const rich = (p) => (p?.rich_text ?? []).map((t) => t.plain_text).join('');
const sel = (p) => p?.select?.name ?? '';

/* ---------------- Section definitions ----------------
 *
 * Each entry maps one Notion database (env var with its ID) onto one key of
 * SiteContent. Property names must match the databases created by
 * scripts/setup-notion-databases.js.
 */

const sections = [
	{
		key: 'stats',
		env: 'NOTION_DB_STATS',
		map: (p) => ({ value: rich(p.Value), label: title(p.Label) })
	},
	{
		key: 'principles',
		env: 'NOTION_DB_PRINCIPLES',
		map: (p) => ({ n: rich(p.N), title: title(p.Title), body: rich(p.Body) })
	},
	{
		key: 'repos',
		env: 'NOTION_DB_REPOS',
		map: (p) => ({
			name: title(p.Name),
			lang: sel(p.Lang),
			desc: rich(p.Desc),
			stars: rich(p.Stars),
			forks: rich(p.Forks),
			updated: rich(p.Updated)
		})
	},
	{
		key: 'activity',
		env: 'NOTION_DB_ACTIVITY',
		map: (p) => ({ who: rich(p.Who), what: title(p.What), repo: rich(p.Repo), when: rich(p.When) })
	},
	{
		key: 'timeline',
		env: 'NOTION_DB_TIMELINE',
		map: (p) => ({ year: title(p.Year), text: rich(p.Text) })
	},
	{
		key: 'governance',
		env: 'NOTION_DB_GOVERNANCE',
		map: (p) => ({ n: rich(p.N), title: title(p.Title), body: rich(p.Body) })
	},
	{
		key: 'maintainers',
		env: 'NOTION_DB_MAINTAINERS',
		map: (p) => ({ initials: rich(p.Initials), name: title(p.Name), role: rich(p.Role) })
	},
	{
		key: 'steps',
		env: 'NOTION_DB_STEPS',
		map: (p) => ({ n: rich(p.N), title: title(p.Title), body: rich(p.Body), link: rich(p.Link) })
	},
	{
		key: 'issues',
		env: 'NOTION_DB_ISSUES',
		map: (p) => ({ title: title(p.Title), repo: rich(p.Repo), label: sel(p.Label) })
	},
	{
		key: 'channels',
		env: 'NOTION_DB_CHANNELS',
		map: (p) => ({ name: title(p.Name), body: rich(p.Body), meta: rich(p.Meta) })
	},
	{
		key: 'posts',
		env: 'NOTION_DB_POSTS',
		map: (p) => ({ kind: sel(p.Kind), title: title(p.Title), excerpt: rich(p.Excerpt), date: rich(p.Date) })
	},
	{
		key: 'taglines',
		env: 'NOTION_DB_TAGLINES',
		map: (p) => ({ n: rich(p.N), line: title(p.Line), note: rich(p.Note) })
	},
	{
		key: 'footerCols',
		env: 'NOTION_DB_FOOTER',
		map: (p) => ({
			title: title(p.Title),
			links: rich(p.Links)
				.split('\n')
				.map((l) => l.trim())
				.filter(Boolean)
		})
	}
];

/* ---------------- Fetching ---------------- */

async function queryDb(client, id) {
	const rows = [];
	let cursor;
	do {
		let res;
		try {
			res = await client.databases.query({
				database_id: id,
				start_cursor: cursor,
				sorts: [{ property: 'Order', direction: 'ascending' }]
			});
		} catch {
			// database without an Order property: fall back to natural order
			res = await client.databases.query({ database_id: id, start_cursor: cursor });
		}
		rows.push(...res.results);
		cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
	} while (cursor);
	return rows;
}

/* ---------------- Generation ---------------- */

async function main() {
	const token = process.env.NOTION_TOKEN;
	let client = null;

	if (!token) {
		console.log('NOTION_TOKEN not set — generating content from defaults only.');
	} else {
		const { Client } = await import('@notionhq/client');
		client = new Client({ auth: token });
	}

	/** @type {Record<string, string>} key -> TS expression */
	const expr = {};
	/** @type {string[]} per-section source for the file header */
	const sources = [];

	// site: single-row database, merged field-by-field over the defaults
	{
		const id = process.env.NOTION_DB_SITE;
		let overrides = null;
		if (client && id) {
			try {
				const rows = await queryDb(client, id);
				if (rows.length > 0) {
					const p = rows[0].properties;
					overrides = {};
					if (rich(p.Tagline)) overrides.tagline = rich(p.Tagline);
					if (rich(p.Subline)) overrides.subline = rich(p.Subline);
					if (rich(p.Stars)) overrides.stars = rich(p.Stars);
					if (p.Show_Activity?.checkbox !== undefined) overrides.showActivity = p.Show_Activity.checkbox;
				}
			} catch (e) {
				console.warn('WARN: site info fetch failed (' + e.message + ') — using defaults.');
			}
		}
		if (overrides && Object.keys(overrides).length > 0) {
			expr.site = '{ ...defaultContent.site, ...' + JSON.stringify(overrides, null, 2) + ' }';
			sources.push('site=notion');
		} else {
			expr.site = 'defaultContent.site';
			sources.push('site=defaults');
		}
	}

	// copy: key/value database, merged over the default copy
	{
		const id = process.env.NOTION_DB_COPY;
		let overrides = null;
		if (client && id) {
			try {
				const rows = await queryDb(client, id);
				overrides = {};
				for (const row of rows) {
					const key = title(row.properties.Key);
					const value = rich(row.properties.Text);
					if (key && value) overrides[key] = value;
				}
			} catch (e) {
				console.warn('WARN: page copy fetch failed (' + e.message + ') — using defaults.');
				overrides = null;
			}
		}
		if (overrides && Object.keys(overrides).length > 0) {
			expr.copy = '{ ...defaultContent.copy, ...' + JSON.stringify(overrides, null, 2) + ' }';
			sources.push('copy=notion(' + Object.keys(overrides).length + ' keys)');
		} else {
			expr.copy = 'defaultContent.copy';
			sources.push('copy=defaults');
		}
	}

	// list sections
	for (const s of sections) {
		const id = process.env[s.env];
		let items = null;
		if (client && id) {
			try {
				const rows = await queryDb(client, id);
				if (rows.length === 0) {
					console.warn('WARN: ' + s.key + ' database is empty — using defaults.');
				} else {
					items = rows.map((r) => s.map(r.properties));
				}
			} catch (e) {
				console.warn('WARN: ' + s.key + ' fetch failed (' + e.message + ') — using defaults.');
			}
		}
		if (items) {
			expr[s.key] = JSON.stringify(items, null, 2);
			sources.push(s.key + '=notion(' + items.length + ')');
		} else {
			expr[s.key] = 'defaultContent.' + s.key;
			sources.push(s.key + '=defaults');
		}
	}

	const order = ['site', 'copy', ...sections.map((s) => s.key)];
	const body = order.map((k) => '\t' + k + ': ' + expr[k]).join(',\n');

	const file =
		'/**\n' +
		' * Auto-generated site content from Notion\n' +
		' * DO NOT EDIT MANUALLY - this file is generated by scripts/fetch-notion-content.js\n' +
		' *\n' +
		' * The website never calls Notion at runtime; content is baked in at sync time.\n' +
		' *\n' +
		' * Last fetched: ' + new Date().toISOString() + '\n' +
		' * Sources: ' + sources.join(', ') + '\n' +
		' */\n\n' +
		"import { defaultContent, type SiteContent } from '$lib/content';\n\n" +
		'export const content: SiteContent = {\n' +
		body +
		'\n};\n';

	if (dryRun) {
		console.log('--- dry run, would write ' + OUT.pathname + ' ---');
		console.log(file);
		return;
	}

	mkdirSync(dirname(OUT.pathname), { recursive: true });
	writeFileSync(OUT.pathname, file);
	console.log('Wrote ' + OUT.pathname);
	console.log('Sources: ' + sources.join(', '));
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});

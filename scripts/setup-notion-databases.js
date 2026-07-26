#!/usr/bin/env node

/**
 * Create the Notion databases that power the site content, under a parent page.
 *
 * Usage:
 *   1. Create an integration at https://www.notion.so/my-integrations and copy
 *      its token into .env as NOTION_TOKEN.
 *   2. Create an empty page in Notion, share it with the integration, and put
 *      its ID into .env as NOTION_PARENT_PAGE_ID.
 *   3. npm run setup-notion
 *   4. Copy the printed database IDs into .env (see .env.example).
 *   5. Fill the databases, then run: npm run fetch-content
 *
 * The script is idempotent per run only — running it twice creates the
 * databases twice. Delete the created databases in Notion before re-running.
 */

import 'dotenv/config';

const token = process.env.NOTION_TOKEN;
const parentPageId = process.env.NOTION_PARENT_PAGE_ID;

if (!token || !parentPageId) {
	console.error('Set NOTION_TOKEN and NOTION_PARENT_PAGE_ID in .env first (see .env.example).');
	process.exit(1);
}

const { Client } = await import('@notionhq/client');
const notion = new Client({ auth: token });

const text = { rich_text: {} };
const order = { number: {} };

/** env var -> [database title, schema] */
const databases = {
	NOTION_DB_SITE: [
		'Silverback · Site Info',
		{
			Name: { title: {} },
			Tagline: text,
			Subline: text,
			Stars: text,
			Show_Activity: { checkbox: {} }
		}
	],
	NOTION_DB_COPY: ['Silverback · Page Copy', { Key: { title: {} }, Text: text }],
	NOTION_DB_STATS: ['Silverback · Stats', { Label: { title: {} }, Value: text, Order: order }],
	NOTION_DB_PRINCIPLES: [
		'Silverback · Principles',
		{ Title: { title: {} }, N: text, Body: text, Order: order }
	],
	NOTION_DB_REPOS: [
		'Silverback · Repos',
		{
			Name: { title: {} },
			Lang: { select: { options: ['Rust', 'TypeScript', 'Go', 'Python', 'C'].map((name) => ({ name })) } },
			Desc: text,
			Stars: text,
			Forks: text,
			Updated: text,
			Order: order
		}
	],
	NOTION_DB_ACTIVITY: [
		'Silverback · Activity',
		{ What: { title: {} }, Who: text, Repo: text, When: text, Order: order }
	],
	NOTION_DB_TIMELINE: ['Silverback · Timeline', { Year: { title: {} }, Text: text, Order: order }],
	NOTION_DB_GOVERNANCE: [
		'Silverback · Governance',
		{ Title: { title: {} }, N: text, Body: text, Order: order }
	],
	NOTION_DB_MAINTAINERS: [
		'Silverback · Maintainers',
		{ Name: { title: {} }, Initials: text, Role: text, Order: order }
	],
	NOTION_DB_STEPS: [
		'Silverback · Steps',
		{ Title: { title: {} }, N: text, Body: text, Link: text, Order: order }
	],
	NOTION_DB_ISSUES: [
		'Silverback · Issues',
		{
			Title: { title: {} },
			Repo: text,
			Label: {
				select: {
					options: ['good first issue', 'docs', 'papercut', 'help wanted'].map((name) => ({ name }))
				}
			},
			Order: order
		}
	],
	NOTION_DB_CHANNELS: [
		'Silverback · Channels',
		{ Name: { title: {} }, Body: text, Meta: text, Order: order }
	],
	NOTION_DB_POSTS: [
		'Silverback · Posts',
		{
			Title: { title: {} },
			Kind: { select: { options: ['Release', 'Community', 'Guide', 'Post-mortem', 'RFC'].map((name) => ({ name })) } },
			Excerpt: text,
			Date: text,
			Order: order
		}
	],
	NOTION_DB_TAGLINES: ['Silverback · Taglines', { Line: { title: {} }, N: text, Note: text, Order: order }],
	NOTION_DB_FOOTER: ['Silverback · Footer Columns', { Title: { title: {} }, Links: text, Order: order }]
};

console.log('Creating databases under page ' + parentPageId + '...\n');

for (const [env, [dbTitle, properties]] of Object.entries(databases)) {
	const db = await notion.databases.create({
		parent: { type: 'page_id', page_id: parentPageId },
		title: [{ type: 'text', text: { content: dbTitle } }],
		properties
	});
	console.log(env + '=' + db.id + '   (' + dbTitle + ')');
}

console.log('\nCopy the lines above into your .env, fill the databases, then run:');
console.log('  npm run fetch-content');

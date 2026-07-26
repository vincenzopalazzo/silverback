# Silverback — Open-Source Community Website

Static SvelteKit + TypeScript site for the Silverback open-source collective.
All content is managed in Notion and synced at build time — the site never
calls Notion at runtime (pattern adapted from
[hedwig-corp/mrvino-website](https://github.com/hedwig-corp/mrvino-website)).

## Develop

```sh
npm install
npm run dev
```

## Verify

```sh
npm run check    # svelte-check (types)
npm run build    # static build into build/
```

## Content (Notion)

```sh
cp .env.example .env   # add NOTION_TOKEN + database IDs
npm run setup-notion   # one-time: create the Notion databases
npm run fetch-content  # sync Notion -> src/lib/data/notion-content.ts
```

Without `.env`, `fetch-content` regenerates the module from the defaults in
`src/lib/content.ts`, so the build always works. See
[docs/NOTION_SETUP.md](docs/NOTION_SETUP.md).

## Structure

```
src/routes/            /, /about, /projects, /contribute, /updates, /foundations
src/lib/components/    Header, Footer, RepoCard
src/lib/content.ts     content model (types) + default copy
src/lib/data/          generated Notion content (do not edit by hand)
scripts/               fetch-notion-content.js, setup-notion-databases.js
static/assets/         logo and mark
```

Design system: Space Grotesk + JetBrains Mono, ink/paper/graphite/silver
palette, hairline borders, zero radius, zero shadow. Documented on the live
[/foundations](https://example.com/foundations) page.

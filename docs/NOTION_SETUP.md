# Notion Setup

All site content is managed in Notion and synced at build/content time. The
website itself **never calls Notion at runtime** — `npm run fetch-content`
bakes everything into `src/lib/data/notion-content.ts`, which the SvelteKit
app imports statically (same pattern as
[hedwig-corp/mrvino-website](https://github.com/hedwig-corp/mrvino-website)).

```
Notion databases ──npm run fetch-content──> src/lib/data/notion-content.ts ──import──> SvelteKit pages
```

## 1. Create a Notion integration

1. Go to <https://www.notion.so/my-integrations> → **New integration**
2. Name it "Silverback Website", enable **Read content**
3. Copy the token (`ntn_...`) into `.env` as `NOTION_TOKEN`

## 2. Create the databases

1. Create an empty page in Notion, share it with the integration
   (**··· → Connections → your integration**)
2. Put the page ID into `.env` as `NOTION_PARENT_PAGE_ID`
3. Run:

   ```sh
   npm run setup-notion
   ```

4. Copy the printed `NOTION_DB_*=...` lines into `.env`

## 3. Fill and sync

Enter content in the databases, then:

```sh
npm run fetch-content   # or -- --dry-run to preview
npm run build           # content is baked into the static site
```

Commit the regenerated `src/lib/data/notion-content.ts` together with any
deploy. A weekly cron (or a Notion webhook → CI job) can automate this.

## Fallback behaviour

Every section is independent: if a `NOTION_DB_*` variable is missing, the
query fails, or the database is empty, that section falls back to the defaults
in `src/lib/content.ts`. With no `.env` at all the site builds entirely from
defaults — Notion is strictly additive.

## Database reference

| Database | Key fields |
|---|---|
| Site Info (1 row) | `Tagline`, `Subline`, `Stars`, `Show_Activity` (checkbox) |
| Page Copy | `Key` (title), `Text` — free-form `section_field` strings, e.g. `home_cta_title` |
| Stats | `Label` (title), `Value`, `Order` |
| Principles / Governance / Steps | `Title` (title), `N`, `Body`, `Order` (+ `Link` for Steps) |
| Repos | `Name` (title), `Lang` (select), `Desc`, `Stars`, `Forks`, `Updated`, `Order` |
| Activity | `What` (title), `Who`, `Repo`, `When`, `Order` |
| Timeline | `Year` (title), `Text`, `Order` |
| Maintainers | `Name` (title), `Initials`, `Role`, `Order` |
| Issues | `Title` (title), `Repo`, `Label` (select), `Order` |
| Channels | `Name` (title), `Body`, `Meta`, `Order` |
| Posts | `Title` (title), `Kind` (select), `Excerpt`, `Date`, `Order` |
| Taglines | `Line` (title), `N`, `Note`, `Order` |
| Footer Columns | `Title` (title), `Links` (one per line), `Order` |

The featured post on Updates is part of Page Copy (`updates_featured_*` keys).
Default copy keys are listed in `src/lib/content.ts`.

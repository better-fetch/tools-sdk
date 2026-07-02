# @better-fetch/tools

SDK and CLI for building [Better Fetch](https://betterfetch.co) tools — define a tool once and it runs in three places, always metered through a Better Fetch API key:

- **Locally** — clone any tool repo, `bf-tool run` with your own key
- **On betterfetch.co** — the site playground on every tool page
- **Over MCP** — every live tool is a tool on the `https://betterfetch.co/api/mcp` connector

## The contract

A tool is a repo in the [better-fetch org](https://github.com/better-fetch) with:

1. **`betterfetch.tool.json`** — the manifest: name, version, schemas, examples.
2. **An entry module** that default-exports the handler:

```ts
import { defineTool } from "@better-fetch/tools";

export default defineTool<{ url: string }, { title: string }>(
  async (input, bf) => {
    const page = await bf.fetchText(input.url);
    return { title: page.title ?? "" };
  },
);
```

`bf` is the only capability a handler gets — a thin client over the engine's
`POST /v1/fetch` (`bf.fetch`, `bf.fetchText`, `bf.fetchJson`, `bf.screenshot`).
Every call costs one credit on the caller's key, locally and hosted alike.

Tools must be **pure JS**: no node builtins, no ambient network, no
filesystem. `bf-tool validate` enforces this (the hosted runner executes
bundles in an isolate where none of those exist).

Input/output schemas use a constrained JSON-Schema subset (flat objects of
scalars, arrays of scalars, one level of nesting — see `src/manifest.ts`).
The subset is what lets one manifest drive MCP registration, the playground
form, and docs.

## Run a tool locally

```sh
git clone https://github.com/better-fetch/extract-article
cd extract-article && npm ci
export BETTER_FETCH_API_KEY=bf_...   # https://betterfetch.co/keys
npx bf-tool run --input '{"url": "https://example.com"}'
```

## CLI

| Command | What it does |
|---|---|
| `bf-tool validate` | Manifest meta-schema + pure-JS bundle check (no network) |
| `bf-tool bundle`   | Write the runner-ready IIFE bundle + sha256 |
| `bf-tool run`      | Execute with `--input '{...}'` or `--example <name>` |
| `bf-tool test`     | Run every manifest example, assert `expect.outputMatches` |

## Publishing

Tools ship from CI: push to main in an org tool repo runs
validate → bundle → test against the live engine → publish to the Better
Fetch registry. Green CI on main **is** production. Start from
[tool-template](https://github.com/better-fetch/tool-template).

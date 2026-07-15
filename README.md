# `@better-fetch/tools`

SDK and CLI for building ready-made tools on the
[Better Fetch](https://betterfetch.co) web-data engine.

A tool is defined once and can run:

- locally with the author's Better Fetch key;
- on its page at `betterfetch.co/tools`;
- over MCP through `search_tools` and `run_tool`;
- through `POST /api/tools/{name}/run`.

The public catalogue is currently first-party. The SDK and template are public
so the authoring contract can stabilize in the open before third-party
publishing is enabled.

## Install

Until the package is published to npm, pin the current GitHub release:

```bash
npm install 'git+https://github.com/better-fetch/tools-sdk.git#v0.5.0'
```

Do not depend on the moving `main` branch in production tool repositories.

## Tool contract

Each tool contains:

1. `betterfetch.tool.json` — identity, version, category, full-colour SVG logo,
   SEO copy, credit estimate, schemas, and runnable examples.
2. An entry module that default-exports a handler:

```ts
import { defineTool } from "@better-fetch/tools";

export default defineTool<{ url: string }, { title: string }>(
  async (input, bf) => {
    const page = await bf.scrape({ url: input.url });
    return { title: page.title ?? "" };
  },
);
```

`bf` is the handler's only I/O capability. It exposes metered calls to the
Better Fetch engine (`fetch`, `fetchText`, `fetchJson`, `screenshot`, `scrape`,
`scrapeText`, `scrapeMarkdown`, `transcribe`, `ageGender`, and
`tiktokShopShowcase`). Use `fetch` for raw transport data,
`scrape` or its text/Markdown helpers for a clean page document, `transcribe` for
bounded public audio/video speech-to-text, and `ageGender` for the explicitly
limited local appearance estimate from a face-focused public image. The
`tiktokShopShowcase` capability uses Better Fetch's server-configured managed
provider; provider credentials are never accepted from or exposed to tools. Tool
code has no ambient network, filesystem, process, or Node built-ins because the
hosted runner executes bundles in an isolate.

Input/output schemas use a constrained JSON-Schema subset so one manifest can
drive MCP discovery, playground forms, examples, documentation, `llms.txt`, and
validation. Start from the
[`tool-template`](https://github.com/better-fetch/tool-template) rather than
recreating the contract by hand.

## CLI

| Command | Purpose |
|---|---|
| `bf-tool validate` | Validate the manifest, schema subset, bundle purity, and entry point without network calls. |
| `bf-tool bundle` | Produce a runner-ready IIFE bundle and SHA-256 digest. |
| `bf-tool run` | Run one input or named example with the caller's Better Fetch key. |
| `bf-tool test` | Run every manifest example and assert its declared output match. |

```bash
export BETTER_FETCH_API_KEY=bf_...
npx bf-tool validate
npx bf-tool test
```

## Publishing model

First-party tools live in
[`better-fetch/tools`](https://github.com/better-fetch/tools). CI validates,
bundles, runs examples against the production engine, and publishes to the
registry only after the production checks pass.

Third-party registry publishing is not open yet. Local tools can still use this
SDK and the hosted engine today.

## License

MIT

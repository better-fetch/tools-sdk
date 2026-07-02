// The Better Fetch tool contract. A tool is a repo in the better-fetch
// GitHub org containing a betterfetch.tool.json manifest and a TypeScript
// entry that default-exports `defineTool(async (input, bf) => output)`.
// The same handler runs locally (bf = createBf from your API key) and
// hosted (bf injected by the tool-runner) — every engine call is metered
// against the caller's key either way.
export {};

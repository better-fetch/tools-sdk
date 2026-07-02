// The Better Fetch tool contract. A tool is a repo in the better-fetch
// GitHub org containing a betterfetch.tool.json manifest and a TypeScript
// entry that default-exports `defineTool(async (input, bf) => output)`.
// The same handler runs locally (bf = createBf from your API key) and
// hosted (bf injected by the tool-runner) — every engine call is metered
// against the caller's key either way.

/** Constrained JSON Schema subset — see manifest.ts for the rules. */
export type JsonSchemaObject = {
  type: "object";
  properties: Record<string, unknown>;
  required?: string[];
  additionalProperties: false;
};

export interface ToolExample {
  name: string;
  input: unknown;
  /**
   * Loose assertions evaluated in CI against the live engine. Live-web
   * output is non-deterministic, so exact matching is deliberately not
   * supported — assert shape, not values.
   */
  expect?: {
    /** Dot-path → expected value, or for arrays: {minLength}. */
    outputMatches?: Record<string, unknown>;
  };
}

export interface ToolManifest {
  /** Must equal the repo name with dashes as underscores. */
  name: string;
  /** Semver. Bump on any behavior change; ingest enforces monotonicity. */
  version: string;
  title: string;
  description: string;
  category: string;
  /** Typical engine calls per run — display only; metering is per call. */
  creditsEstimate: number;
  /** Hard cap on engine calls per run in the hosted runner (default 20, max 50). */
  maxEngineCalls?: number;
  inputSchema: JsonSchemaObject;
  outputSchema?: JsonSchemaObject;
  examples: ToolExample[];
  /** Entry module, e.g. "src/index.ts". */
  entry: string;
}

/** Verbatim request surface of POST /v1/fetch. */
export interface FetchPayload {
  url: string;
  wait_until?: "load" | "domcontentloaded" | "networkidle" | "commit";
  wait_selector?: string;
  wait_ms?: number;
  timeout_ms?: number;
  cache_ttl_ms?: number;
  return_response_text?: boolean;
  include_html?: boolean;
  screenshot?: boolean;
  full_page?: boolean;
  country?: string;
  session?: string;
  geoip?: boolean;
  locale?: string;
  timezone?: string;
  user_agent?: string;
  extra_headers?: Record<string, string>;
  humanize?: boolean;
  return_cf_clearance?: boolean;
  return_datadome_cookie?: boolean;
  return_cookies?: boolean;
  cookies?: unknown[];
  capture_network?: boolean;
  network_resource_types?: string[];
  network_include_bodies?: boolean;
  network_include_headers?: boolean;
  network_max_entries?: number;
  network_max_body_bytes?: number;
  network_capture_streams?: boolean;
  network_stream_max_events?: number;
  network_stream_max_value_bytes?: number;
  json_mode?: boolean;
  strategy?: "auto" | "http" | "browser";
}

export interface FetchResult {
  ok: boolean;
  status?: number;
  final_url?: string;
  title?: string;
  html?: string;
  body_text?: string;
  content_type?: string;
  json_parse_ok?: boolean;
  json?: unknown;
  headers?: Record<string, string>;
  screenshot_b64?: string;
  blocked?: boolean;
  block_reason?: string;
  cookies?: unknown[];
  network?: unknown[];
  network_streams?: unknown[];
  transport?: string;
  timing_ms?: number;
  attempts?: number;
  /** Error envelope fields when ok is false. */
  error?: string;
  message?: string;
}

/** The only capability a tool handler receives. */
export interface Bf {
  fetch(payload: FetchPayload): Promise<FetchResult>;
  fetchText(
    url: string,
    opts?: Omit<FetchPayload, "url">,
  ): Promise<{ text: string; status?: number; final_url?: string; title?: string }>;
  fetchJson(
    url: string,
    opts?: Omit<FetchPayload, "url">,
  ): Promise<{ json: unknown; status?: number; final_url?: string }>;
  screenshot(
    url: string,
    opts?: Omit<FetchPayload, "url" | "screenshot">,
  ): Promise<{ png_b64: string; status?: number }>;
}

export type ToolRun<I = unknown, O = unknown> = (input: I, bf: Bf) => Promise<O>;

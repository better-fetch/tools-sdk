import type {
  AgeGenderPayload,
  AgeGenderResult,
  Bf,
  FetchPayload,
  FetchResult,
  ScrapePayload,
  ScrapeResult,
  TranscribePayload,
  TranscribeResult,
  TikTokShopShowcasePayload,
  TikTokShopShowcaseResult,
} from "./types.js";

export class BfError extends Error {
  code: string;
  status?: number;
  constructor(code: string, message: string, status?: number) {
    super(message);
    this.name = "BfError";
    this.code = code;
    this.status = status;
  }
}

export interface CreateBfOptions {
  apiKey: string;
  baseUrl?: string;
  /** Per-call timeout in ms. The engine itself caps navigation separately. */
  timeoutMs?: number;
}

/**
 * Host-side Bf client wrapping POST /v1/fetch. Used by the bf-tool CLI
 * (your own API key) and by the hosted tool-runner (the caller's key) —
 * every call is validated and metered by the engine.
 */
export function createBf(opts: CreateBfOptions): Bf {
  const baseUrl = (opts.baseUrl ?? "https://api.betterfetch.co").replace(/\/$/, "");
  const timeoutMs = opts.timeoutMs ?? 260_000;

  async function doFetch(payload: FetchPayload): Promise<FetchResult> {
    const res = await fetch(`${baseUrl}/v1/fetch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${opts.apiKey}`,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(timeoutMs),
    });
    let body: FetchResult;
    try {
      body = (await res.json()) as FetchResult;
    } catch {
      throw new BfError("bad_response", `engine returned non-JSON (HTTP ${res.status})`, res.status);
    }
    if (body.ok === false) {
      throw new BfError(body.error ?? "fetch_failed", body.message ?? "fetch failed", res.status);
    }
    return body;
  }

  async function doScrape(payload: ScrapePayload): Promise<ScrapeResult> {
    const res = await fetch(`${baseUrl}/v1/scrape`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${opts.apiKey}`,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(timeoutMs),
    });
    let body: ScrapeResult;
    try {
      body = (await res.json()) as ScrapeResult;
    } catch {
      throw new BfError("bad_response", `engine returned non-JSON (HTTP ${res.status})`, res.status);
    }
    if (body.ok === false) {
      throw new BfError(body.error ?? "scrape_failed", body.message ?? "scrape failed", res.status);
    }
    return body;
  }

  async function doTranscribe(payload: TranscribePayload): Promise<TranscribeResult> {
    const res = await fetch(`${baseUrl}/v1/transcribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${opts.apiKey}`,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(timeoutMs),
    });
    let body: TranscribeResult;
    try {
      body = (await res.json()) as TranscribeResult;
    } catch {
      throw new BfError("bad_response", `engine returned non-JSON (HTTP ${res.status})`, res.status);
    }
    if (body.ok === false) {
      throw new BfError(
        body.error ?? "transcription_failed",
        body.message ?? "transcription failed",
        res.status,
      );
    }
    return body;
  }

  async function doAgeGender(payload: AgeGenderPayload): Promise<AgeGenderResult> {
    const res = await fetch(`${baseUrl}/v1/age-gender`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${opts.apiKey}`,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(timeoutMs),
    });
    let body: AgeGenderResult;
    try {
      body = (await res.json()) as AgeGenderResult;
    } catch {
      throw new BfError("bad_response", `engine returned non-JSON (HTTP ${res.status})`, res.status);
    }
    if (body.ok === false) {
      throw new BfError(body.error ?? "vision_failed", body.message ?? "vision failed", res.status);
    }
    return body;
  }

  async function doTikTokShopShowcase(
    payload: TikTokShopShowcasePayload,
  ): Promise<TikTokShopShowcaseResult> {
    const res = await fetch(`${baseUrl}/v1/social/tiktok-shop/showcase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${opts.apiKey}`,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(timeoutMs),
    });
    let body: TikTokShopShowcaseResult;
    try {
      body = (await res.json()) as TikTokShopShowcaseResult;
    } catch {
      throw new BfError("bad_response", `engine returned non-JSON (HTTP ${res.status})`, res.status);
    }
    if (body.ok === false) {
      throw new BfError(
        body.error ?? "showcase_failed",
        body.message ?? "TikTok Shop showcase retrieval failed",
        res.status,
      );
    }
    return body;
  }

  return {
    fetch: doFetch,
    scrape: doScrape,
    transcribe: doTranscribe,
    ageGender: doAgeGender,
    tiktokShopShowcase: doTikTokShopShowcase,
    async scrapeText(url, opts2) {
      const document = await doScrape({ url, ...opts2 });
      return { text: document.text ?? "", document };
    },
    async scrapeMarkdown(url, opts2) {
      const document = await doScrape({ url, ...opts2 });
      return { markdown: document.markdown ?? "", document };
    },
    async fetchText(url, opts2) {
      const r = await doFetch({ url, return_response_text: true, ...opts2 });
      return {
        text: r.body_text ?? "",
        status: r.status,
        final_url: r.final_url,
        title: r.title,
      };
    },
    async fetchJson(url, opts2) {
      const r = await doFetch({ url, json_mode: true, ...opts2 });
      if (!r.json_parse_ok && r.json == null) {
        throw new BfError("not_json", `response from ${url} was not JSON`);
      }
      return { json: r.json, status: r.status, final_url: r.final_url };
    },
    async screenshot(url, opts2) {
      const r = await doFetch({ url, screenshot: true, ...opts2 });
      if (!r.screenshot_b64) {
        throw new BfError("no_screenshot", "engine returned no screenshot");
      }
      return { png_b64: r.screenshot_b64, status: r.status };
    },
  };
}

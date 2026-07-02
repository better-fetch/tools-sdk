export class BfError extends Error {
    code;
    status;
    constructor(code, message, status) {
        super(message);
        this.name = "BfError";
        this.code = code;
        this.status = status;
    }
}
/**
 * Host-side Bf client wrapping POST /v1/fetch. Used by the bf-tool CLI
 * (your own API key) and by the hosted tool-runner (the caller's key) —
 * every call is validated and metered by the engine.
 */
export function createBf(opts) {
    const baseUrl = (opts.baseUrl ?? "https://api.betterfetch.co").replace(/\/$/, "");
    const timeoutMs = opts.timeoutMs ?? 260_000;
    async function doFetch(payload) {
        const res = await fetch(`${baseUrl}/v1/fetch`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${opts.apiKey}`,
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(timeoutMs),
        });
        let body;
        try {
            body = (await res.json());
        }
        catch {
            throw new BfError("bad_response", `engine returned non-JSON (HTTP ${res.status})`, res.status);
        }
        if (body.ok === false) {
            throw new BfError(body.error ?? "fetch_failed", body.message ?? "fetch failed", res.status);
        }
        return body;
    }
    return {
        fetch: doFetch,
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

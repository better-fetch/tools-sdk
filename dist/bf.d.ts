import type { Bf } from "./types.js";
export declare class BfError extends Error {
    code: string;
    status?: number;
    constructor(code: string, message: string, status?: number);
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
export declare function createBf(opts: CreateBfOptions): Bf;

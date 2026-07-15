export type { AgeGenderPayload, AgeGenderResult, Bf, FetchPayload, FetchResult, ScrapeImage, ScrapeLink, ScrapePayload, ScrapeResult, TranscriptSegment, TranscribePayload, TranscribeResult, TikTokShopShowcasePayload, TikTokShopShowcaseProduct, TikTokShopShowcaseResult, JsonSchemaObject, ToolExample, ToolLogo, ToolManifest, ToolPopularity, ToolSeoContent, ToolRun, } from "./types.js";
export { BfError, createBf, type CreateBfOptions } from "./bf.js";
export { checkOutputMatches, ioSchema, manifestSchema, outputIoSchema, validateManifest, } from "./manifest.js";
import type { Bf, ToolRun } from "./types.js";
/**
 * Identity helper that pins the handler signature. Your tool's entry module
 * must `export default defineTool(async (input, bf) => output)`.
 */
export declare function defineTool<I, O>(run: (input: I, bf: Bf) => Promise<O>): ToolRun<I, O>;

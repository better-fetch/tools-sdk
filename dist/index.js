export { BfError, createBf } from "./bf.js";
export { checkOutputMatches, ioSchema, manifestSchema, outputIoSchema, validateManifest, } from "./manifest.js";
/**
 * Identity helper that pins the handler signature. Your tool's entry module
 * must `export default defineTool(async (input, bf) => output)`.
 */
export function defineTool(run) {
    return run;
}

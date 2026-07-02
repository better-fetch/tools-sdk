#!/usr/bin/env node
// bf-tool — validate, bundle, run, and test Better Fetch tools.
//
//   bf-tool validate                 manifest + bundle checks (no network)
//   bf-tool bundle [--out <file>]    write the runner-ready IIFE bundle
//   bf-tool run --input '{...}'      execute locally (BETTER_FETCH_API_KEY)
//   bf-tool run --example <name>     execute a manifest example
//   bf-tool test                     run every example, assert expectations
//
// Run from the tool repo root (the directory with betterfetch.tool.json).
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { buildSync } from "esbuild";
import { createBf } from "./bf.js";
import { checkOutputMatches, ioSchema, outputIoSchema, validateManifest } from "./manifest.js";
const MAX_BUNDLE_BYTES = 2 * 1024 * 1024;
function fail(message) {
    console.error(`bf-tool: ${message}`);
    process.exit(1);
}
function loadManifest() {
    let raw;
    try {
        raw = readFileSync(resolve("betterfetch.tool.json"), "utf8");
    }
    catch {
        fail("betterfetch.tool.json not found — run from the tool repo root");
    }
    try {
        return validateManifest(JSON.parse(raw));
    }
    catch (e) {
        fail(`invalid manifest: ${e instanceof Error ? e.message : String(e)}`);
    }
}
function bundle(manifest) {
    const result = buildSync({
        entryPoints: [resolve(manifest.entry)],
        bundle: true,
        write: false,
        format: "iife",
        globalName: "__tool",
        platform: "neutral",
        target: "es2022",
        // No externals: node builtins fail to resolve under platform:neutral,
        // which is exactly the purity guarantee the hosted isolate needs.
        logLevel: "silent",
    });
    if (result.errors.length) {
        fail(`bundle failed (tools must be pure JS — no node builtins):\n` +
            result.errors.map((e) => `  ${e.text}`).join("\n"));
    }
    const code = result.outputFiles[0].text;
    if (Buffer.byteLength(code) > MAX_BUNDLE_BYTES) {
        fail(`bundle is ${Buffer.byteLength(code)} bytes (max ${MAX_BUNDLE_BYTES})`);
    }
    return code;
}
function loadRun(code) {
    const mod = new Function(`${code}; return __tool;`)();
    if (typeof mod?.default !== "function") {
        fail("entry must `export default defineTool(async (input, bf) => ...)`");
    }
    return mod.default;
}
function bfFromEnv() {
    const apiKey = process.env.BETTER_FETCH_API_KEY;
    if (!apiKey) {
        fail("set BETTER_FETCH_API_KEY (get one at https://betterfetch.co/keys)");
    }
    return createBf({ apiKey, baseUrl: process.env.BETTER_FETCH_API_URL });
}
function arg(flag) {
    const i = process.argv.indexOf(flag);
    return i >= 0 ? process.argv[i + 1] : undefined;
}
async function main() {
    const command = process.argv[2];
    const manifest = loadManifest();
    switch (command) {
        case "validate": {
            ioSchema.parse(manifest.inputSchema);
            if (manifest.outputSchema)
                outputIoSchema.parse(manifest.outputSchema);
            const code = bundle(manifest);
            loadRun(code);
            console.log(`ok: ${manifest.name}@${manifest.version} (bundle ${Buffer.byteLength(code)} bytes, ` +
                `${manifest.examples.length} example${manifest.examples.length === 1 ? "" : "s"})`);
            break;
        }
        case "bundle": {
            const out = arg("--out") ?? "dist/bundle.mjs";
            const code = bundle(manifest);
            mkdirSync(dirname(resolve(out)), { recursive: true });
            writeFileSync(resolve(out), code);
            const sha = createHash("sha256").update(code).digest("hex");
            console.log(JSON.stringify({ out, bytes: Buffer.byteLength(code), sha256: sha }));
            break;
        }
        case "run": {
            const exampleName = arg("--example");
            const inputRaw = arg("--input");
            let input;
            if (exampleName) {
                const example = manifest.examples.find((e) => e.name === exampleName);
                if (!example)
                    fail(`no example named "${exampleName}"`);
                input = example.input;
            }
            else if (inputRaw) {
                try {
                    input = JSON.parse(inputRaw);
                }
                catch {
                    fail("--input must be valid JSON");
                }
            }
            else {
                fail("pass --input '{...}' or --example <name>");
            }
            const run = loadRun(bundle(manifest));
            const output = await run(input, bfFromEnv());
            console.log(JSON.stringify(output, null, 2));
            break;
        }
        case "test": {
            const run = loadRun(bundle(manifest));
            const bf = bfFromEnv();
            let failed = 0;
            for (const example of manifest.examples) {
                try {
                    const output = await run(example.input, bf);
                    const failures = example.expect?.outputMatches
                        ? checkOutputMatches(output, example.expect.outputMatches)
                        : [];
                    if (failures.length) {
                        failed++;
                        console.error(`FAIL ${example.name}\n${failures.map((f) => `  ${f}`).join("\n")}`);
                    }
                    else {
                        console.log(`PASS ${example.name}`);
                    }
                }
                catch (e) {
                    failed++;
                    console.error(`FAIL ${example.name}\n  threw: ${e instanceof Error ? e.message : e}`);
                }
            }
            if (failed)
                fail(`${failed}/${manifest.examples.length} examples failed`);
            console.log(`all ${manifest.examples.length} examples passed`);
            break;
        }
        default:
            fail("usage: bf-tool <validate|bundle|run|test>");
    }
}
main().catch((e) => fail(e instanceof Error ? e.message : String(e)));

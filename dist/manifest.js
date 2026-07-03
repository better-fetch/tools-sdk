import { z } from "zod";
// The constrained JSON-Schema subset for tool input/output schemas.
//
// This subset is the contract that makes one manifest drive three surfaces:
// it converts losslessly to zod for MCP registration, renders mechanically
// as a playground form, and validates cheaply in the runner. Property types
// allowed: string (enum/format/minLength/maxLength), number/integer
// (minimum/maximum), boolean, array of scalars, and ONE level of nested
// object whose properties are scalars. Anything richer is rejected at CI
// and at ingest — keep tool inputs flat.
//
// NOTE: frontend/lib/tool-manifest.ts in the better-fetch repo mirrors this
// schema (the platform revalidates independently). Change both together.
const scalarSchema = z.union([
    z.object({
        type: z.literal("string"),
        description: z.string().optional(),
        enum: z.array(z.string()).min(1).optional(),
        format: z.enum(["uri", "email", "date", "date-time"]).optional(),
        minLength: z.number().int().min(0).optional(),
        maxLength: z.number().int().min(1).optional(),
        default: z.string().optional(),
    }),
    z.object({
        type: z.enum(["number", "integer"]),
        description: z.string().optional(),
        minimum: z.number().optional(),
        maximum: z.number().optional(),
        default: z.number().optional(),
    }),
    z.object({
        type: z.literal("boolean"),
        description: z.string().optional(),
        default: z.boolean().optional(),
    }),
]);
const propertySchema = z.union([
    scalarSchema,
    z.object({
        type: z.literal("array"),
        description: z.string().optional(),
        items: scalarSchema,
        minItems: z.number().int().min(0).optional(),
        maxItems: z.number().int().min(1).optional(),
    }),
    z.object({
        type: z.literal("object"),
        description: z.string().optional(),
        properties: z.record(z.string(), scalarSchema),
        required: z.array(z.string()).optional(),
        additionalProperties: z.literal(false),
    }),
]);
export const ioSchema = z.object({
    type: z.literal("object"),
    properties: z.record(z.string(), propertySchema),
    required: z.array(z.string()).optional(),
    additionalProperties: z.literal(false),
});
// Output schemas are display- and assertion-only (never form-rendered or
// zod-converted for MCP), so they additionally allow arrays of
// object-of-scalars — the natural shape of results lists.
const objectOfScalars = z.object({
    type: z.literal("object"),
    description: z.string().optional(),
    properties: z.record(z.string(), scalarSchema),
    required: z.array(z.string()).optional(),
    additionalProperties: z.literal(false),
});
const outputPropertySchema = z.union([
    propertySchema,
    z.object({
        type: z.literal("array"),
        description: z.string().optional(),
        items: z.union([scalarSchema, objectOfScalars]),
        minItems: z.number().int().min(0).optional(),
        maxItems: z.number().int().min(1).optional(),
    }),
]);
export const outputIoSchema = z.object({
    type: z.literal("object"),
    properties: z.record(z.string(), outputPropertySchema),
    required: z.array(z.string()).optional(),
    additionalProperties: z.literal(false),
});
function safeInlineSvg(svg) {
    const trimmed = svg.trim();
    if (!/^<svg[\s>]/i.test(trimmed) || !/<\/svg>$/i.test(trimmed))
        return false;
    if (/<\s*(script|foreignObject|iframe|object|embed|link|style)\b/i.test(trimmed))
        return false;
    if (/\son[a-z]+\s*=/i.test(trimmed))
        return false;
    if (/\b(?:href|xlink:href|src)\s*=/i.test(trimmed))
        return false;
    if (/url\(\s*['"]?(?!#)/i.test(trimmed))
        return false;
    return true;
}
const toolLogoSchema = z.object({
    label: z.string().min(2).max(80),
    svg: z
        .string()
        .min(20)
        .max(20_000)
        .refine(safeInlineSvg, "logo.svg must be a safe inline <svg> without scripts, event handlers, href/src, or external references"),
    sourceUrl: z.string().url().optional(),
});
const seoSchema = z.object({
    title: z.string().min(20).max(90),
    description: z.string().min(80).max(320),
    intro: z.string().min(160).max(1200),
    useCases: z
        .array(z.object({
        title: z.string().min(3).max(80),
        description: z.string().min(40).max(320),
    }))
        .min(2)
        .max(6),
    faqs: z
        .array(z.object({
        question: z.string().min(10).max(140),
        answer: z.string().min(40).max(500),
    }))
        .min(2)
        .max(6),
    keywords: z.array(z.string().min(2).max(60)).min(3).max(16),
});
const popularitySchema = z
    .object({
    rank: z.number().int().min(1).max(10_000).optional(),
    score: z.number().min(0).max(1_000_000_000).optional(),
    source: z.string().min(2).max(80).optional(),
    sourceUrl: z.string().url().optional(),
    benchmarkedAgainst: z.string().min(2).max(120).optional(),
})
    .refine((value) => value.rank !== undefined || value.score !== undefined, {
    message: "popularity must include rank or score",
});
export const manifestSchema = z.object({
    name: z.string().regex(/^[a-z][a-z0-9_]{2,63}$/),
    version: z.string().regex(/^\d+\.\d+\.\d+$/),
    title: z.string().min(3).max(80),
    description: z.string().min(20).max(500),
    category: z.string().regex(/^[a-z][a-z0-9-]{1,31}$/),
    logo: toolLogoSchema,
    seo: seoSchema,
    popularity: popularitySchema.optional(),
    creditsEstimate: z.number().int().min(1).max(50),
    maxEngineCalls: z.number().int().min(1).max(50).optional(),
    inputSchema: ioSchema,
    outputSchema: outputIoSchema.optional(),
    examples: z
        .array(z.object({
        name: z.string().min(1),
        input: z.unknown(),
        expect: z
            .object({ outputMatches: z.record(z.string(), z.unknown()).optional() })
            .optional(),
    }))
        .min(1),
    entry: z.string().regex(/^src\/.+\.(ts|js)$/),
});
export function validateManifest(raw) {
    return manifestSchema.parse(raw);
}
/**
 * Assert `output` against an example's outputMatches map.
 * Keys are dot-paths into the output; values compare by strict equality,
 * except objects of the form {minLength: n} which assert array length.
 * Returns a list of failure messages (empty = pass).
 */
export function checkOutputMatches(output, outputMatches) {
    const failures = [];
    for (const [path, expected] of Object.entries(outputMatches)) {
        const actual = path
            .split(".")
            .reduce((v, k) => v != null && typeof v === "object" ? v[k] : undefined, output);
        if (expected != null &&
            typeof expected === "object" &&
            "minLength" in expected) {
            const min = expected.minLength;
            if (!Array.isArray(actual) || actual.length < min) {
                failures.push(`${path}: expected array with >= ${min} items`);
            }
        }
        else if (actual !== expected) {
            failures.push(`${path}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
        }
    }
    return failures;
}

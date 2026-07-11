import { z } from "zod";
import type { ToolManifest } from "./types.js";
export declare const ioSchema: z.ZodObject<{
    type: z.ZodLiteral<"object">;
    properties: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodUnion<readonly [z.ZodObject<{
        type: z.ZodLiteral<"string">;
        description: z.ZodOptional<z.ZodString>;
        enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
        format: z.ZodOptional<z.ZodEnum<{
            date: "date";
            uri: "uri";
            email: "email";
            "date-time": "date-time";
        }>>;
        minLength: z.ZodOptional<z.ZodNumber>;
        maxLength: z.ZodOptional<z.ZodNumber>;
        default: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodEnum<{
            number: "number";
            integer: "integer";
        }>;
        description: z.ZodOptional<z.ZodString>;
        minimum: z.ZodOptional<z.ZodNumber>;
        maximum: z.ZodOptional<z.ZodNumber>;
        default: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"boolean">;
        description: z.ZodOptional<z.ZodString>;
        default: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>]>, z.ZodObject<{
        type: z.ZodLiteral<"array">;
        description: z.ZodOptional<z.ZodString>;
        items: z.ZodUnion<readonly [z.ZodObject<{
            type: z.ZodLiteral<"string">;
            description: z.ZodOptional<z.ZodString>;
            enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
            format: z.ZodOptional<z.ZodEnum<{
                date: "date";
                uri: "uri";
                email: "email";
                "date-time": "date-time";
            }>>;
            minLength: z.ZodOptional<z.ZodNumber>;
            maxLength: z.ZodOptional<z.ZodNumber>;
            default: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodEnum<{
                number: "number";
                integer: "integer";
            }>;
            description: z.ZodOptional<z.ZodString>;
            minimum: z.ZodOptional<z.ZodNumber>;
            maximum: z.ZodOptional<z.ZodNumber>;
            default: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"boolean">;
            description: z.ZodOptional<z.ZodString>;
            default: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>]>;
        minItems: z.ZodOptional<z.ZodNumber>;
        maxItems: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"object">;
        description: z.ZodOptional<z.ZodString>;
        properties: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodObject<{
            type: z.ZodLiteral<"string">;
            description: z.ZodOptional<z.ZodString>;
            enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
            format: z.ZodOptional<z.ZodEnum<{
                date: "date";
                uri: "uri";
                email: "email";
                "date-time": "date-time";
            }>>;
            minLength: z.ZodOptional<z.ZodNumber>;
            maxLength: z.ZodOptional<z.ZodNumber>;
            default: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodEnum<{
                number: "number";
                integer: "integer";
            }>;
            description: z.ZodOptional<z.ZodString>;
            minimum: z.ZodOptional<z.ZodNumber>;
            maximum: z.ZodOptional<z.ZodNumber>;
            default: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"boolean">;
            description: z.ZodOptional<z.ZodString>;
            default: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>]>>;
        required: z.ZodOptional<z.ZodArray<z.ZodString>>;
        additionalProperties: z.ZodLiteral<false>;
    }, z.core.$strip>]>>;
    required: z.ZodOptional<z.ZodArray<z.ZodString>>;
    additionalProperties: z.ZodLiteral<false>;
}, z.core.$strip>;
export declare const outputIoSchema: z.ZodObject<{
    type: z.ZodLiteral<"object">;
    properties: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodUnion<readonly [z.ZodUnion<readonly [z.ZodObject<{
        type: z.ZodLiteral<"string">;
        description: z.ZodOptional<z.ZodString>;
        enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
        format: z.ZodOptional<z.ZodEnum<{
            date: "date";
            uri: "uri";
            email: "email";
            "date-time": "date-time";
        }>>;
        minLength: z.ZodOptional<z.ZodNumber>;
        maxLength: z.ZodOptional<z.ZodNumber>;
        default: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodEnum<{
            number: "number";
            integer: "integer";
        }>;
        description: z.ZodOptional<z.ZodString>;
        minimum: z.ZodOptional<z.ZodNumber>;
        maximum: z.ZodOptional<z.ZodNumber>;
        default: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"boolean">;
        description: z.ZodOptional<z.ZodString>;
        default: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>]>, z.ZodObject<{
        type: z.ZodLiteral<"array">;
        description: z.ZodOptional<z.ZodString>;
        items: z.ZodUnion<readonly [z.ZodObject<{
            type: z.ZodLiteral<"string">;
            description: z.ZodOptional<z.ZodString>;
            enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
            format: z.ZodOptional<z.ZodEnum<{
                date: "date";
                uri: "uri";
                email: "email";
                "date-time": "date-time";
            }>>;
            minLength: z.ZodOptional<z.ZodNumber>;
            maxLength: z.ZodOptional<z.ZodNumber>;
            default: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodEnum<{
                number: "number";
                integer: "integer";
            }>;
            description: z.ZodOptional<z.ZodString>;
            minimum: z.ZodOptional<z.ZodNumber>;
            maximum: z.ZodOptional<z.ZodNumber>;
            default: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"boolean">;
            description: z.ZodOptional<z.ZodString>;
            default: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>]>;
        minItems: z.ZodOptional<z.ZodNumber>;
        maxItems: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"object">;
        description: z.ZodOptional<z.ZodString>;
        properties: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodObject<{
            type: z.ZodLiteral<"string">;
            description: z.ZodOptional<z.ZodString>;
            enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
            format: z.ZodOptional<z.ZodEnum<{
                date: "date";
                uri: "uri";
                email: "email";
                "date-time": "date-time";
            }>>;
            minLength: z.ZodOptional<z.ZodNumber>;
            maxLength: z.ZodOptional<z.ZodNumber>;
            default: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodEnum<{
                number: "number";
                integer: "integer";
            }>;
            description: z.ZodOptional<z.ZodString>;
            minimum: z.ZodOptional<z.ZodNumber>;
            maximum: z.ZodOptional<z.ZodNumber>;
            default: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"boolean">;
            description: z.ZodOptional<z.ZodString>;
            default: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>]>>;
        required: z.ZodOptional<z.ZodArray<z.ZodString>>;
        additionalProperties: z.ZodLiteral<false>;
    }, z.core.$strip>]>, z.ZodObject<{
        type: z.ZodLiteral<"array">;
        description: z.ZodOptional<z.ZodString>;
        items: z.ZodUnion<readonly [z.ZodUnion<readonly [z.ZodObject<{
            type: z.ZodLiteral<"string">;
            description: z.ZodOptional<z.ZodString>;
            enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
            format: z.ZodOptional<z.ZodEnum<{
                date: "date";
                uri: "uri";
                email: "email";
                "date-time": "date-time";
            }>>;
            minLength: z.ZodOptional<z.ZodNumber>;
            maxLength: z.ZodOptional<z.ZodNumber>;
            default: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodEnum<{
                number: "number";
                integer: "integer";
            }>;
            description: z.ZodOptional<z.ZodString>;
            minimum: z.ZodOptional<z.ZodNumber>;
            maximum: z.ZodOptional<z.ZodNumber>;
            default: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"boolean">;
            description: z.ZodOptional<z.ZodString>;
            default: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>]>, z.ZodObject<{
            type: z.ZodLiteral<"object">;
            description: z.ZodOptional<z.ZodString>;
            properties: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodObject<{
                type: z.ZodLiteral<"string">;
                description: z.ZodOptional<z.ZodString>;
                enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
                format: z.ZodOptional<z.ZodEnum<{
                    date: "date";
                    uri: "uri";
                    email: "email";
                    "date-time": "date-time";
                }>>;
                minLength: z.ZodOptional<z.ZodNumber>;
                maxLength: z.ZodOptional<z.ZodNumber>;
                default: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodEnum<{
                    number: "number";
                    integer: "integer";
                }>;
                description: z.ZodOptional<z.ZodString>;
                minimum: z.ZodOptional<z.ZodNumber>;
                maximum: z.ZodOptional<z.ZodNumber>;
                default: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodLiteral<"boolean">;
                description: z.ZodOptional<z.ZodString>;
                default: z.ZodOptional<z.ZodBoolean>;
            }, z.core.$strip>]>>;
            required: z.ZodOptional<z.ZodArray<z.ZodString>>;
            additionalProperties: z.ZodLiteral<false>;
        }, z.core.$strip>]>;
        minItems: z.ZodOptional<z.ZodNumber>;
        maxItems: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
    required: z.ZodOptional<z.ZodArray<z.ZodString>>;
    additionalProperties: z.ZodLiteral<false>;
}, z.core.$strip>;
export declare const manifestSchema: z.ZodObject<{
    name: z.ZodString;
    version: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    category: z.ZodString;
    logo: z.ZodObject<{
        label: z.ZodString;
        svg: z.ZodString;
        sourceUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    seo: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodString;
        intro: z.ZodString;
        useCases: z.ZodArray<z.ZodObject<{
            title: z.ZodString;
            description: z.ZodString;
        }, z.core.$strip>>;
        faqs: z.ZodArray<z.ZodObject<{
            question: z.ZodString;
            answer: z.ZodString;
        }, z.core.$strip>>;
        keywords: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
    popularity: z.ZodOptional<z.ZodObject<{
        rank: z.ZodOptional<z.ZodNumber>;
        score: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    creditsEstimate: z.ZodNumber;
    maxEngineCalls: z.ZodOptional<z.ZodNumber>;
    inputSchema: z.ZodObject<{
        type: z.ZodLiteral<"object">;
        properties: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodUnion<readonly [z.ZodObject<{
            type: z.ZodLiteral<"string">;
            description: z.ZodOptional<z.ZodString>;
            enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
            format: z.ZodOptional<z.ZodEnum<{
                date: "date";
                uri: "uri";
                email: "email";
                "date-time": "date-time";
            }>>;
            minLength: z.ZodOptional<z.ZodNumber>;
            maxLength: z.ZodOptional<z.ZodNumber>;
            default: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodEnum<{
                number: "number";
                integer: "integer";
            }>;
            description: z.ZodOptional<z.ZodString>;
            minimum: z.ZodOptional<z.ZodNumber>;
            maximum: z.ZodOptional<z.ZodNumber>;
            default: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"boolean">;
            description: z.ZodOptional<z.ZodString>;
            default: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>]>, z.ZodObject<{
            type: z.ZodLiteral<"array">;
            description: z.ZodOptional<z.ZodString>;
            items: z.ZodUnion<readonly [z.ZodObject<{
                type: z.ZodLiteral<"string">;
                description: z.ZodOptional<z.ZodString>;
                enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
                format: z.ZodOptional<z.ZodEnum<{
                    date: "date";
                    uri: "uri";
                    email: "email";
                    "date-time": "date-time";
                }>>;
                minLength: z.ZodOptional<z.ZodNumber>;
                maxLength: z.ZodOptional<z.ZodNumber>;
                default: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodEnum<{
                    number: "number";
                    integer: "integer";
                }>;
                description: z.ZodOptional<z.ZodString>;
                minimum: z.ZodOptional<z.ZodNumber>;
                maximum: z.ZodOptional<z.ZodNumber>;
                default: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodLiteral<"boolean">;
                description: z.ZodOptional<z.ZodString>;
                default: z.ZodOptional<z.ZodBoolean>;
            }, z.core.$strip>]>;
            minItems: z.ZodOptional<z.ZodNumber>;
            maxItems: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"object">;
            description: z.ZodOptional<z.ZodString>;
            properties: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodObject<{
                type: z.ZodLiteral<"string">;
                description: z.ZodOptional<z.ZodString>;
                enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
                format: z.ZodOptional<z.ZodEnum<{
                    date: "date";
                    uri: "uri";
                    email: "email";
                    "date-time": "date-time";
                }>>;
                minLength: z.ZodOptional<z.ZodNumber>;
                maxLength: z.ZodOptional<z.ZodNumber>;
                default: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodEnum<{
                    number: "number";
                    integer: "integer";
                }>;
                description: z.ZodOptional<z.ZodString>;
                minimum: z.ZodOptional<z.ZodNumber>;
                maximum: z.ZodOptional<z.ZodNumber>;
                default: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodLiteral<"boolean">;
                description: z.ZodOptional<z.ZodString>;
                default: z.ZodOptional<z.ZodBoolean>;
            }, z.core.$strip>]>>;
            required: z.ZodOptional<z.ZodArray<z.ZodString>>;
            additionalProperties: z.ZodLiteral<false>;
        }, z.core.$strip>]>>;
        required: z.ZodOptional<z.ZodArray<z.ZodString>>;
        additionalProperties: z.ZodLiteral<false>;
    }, z.core.$strip>;
    outputSchema: z.ZodOptional<z.ZodObject<{
        type: z.ZodLiteral<"object">;
        properties: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodUnion<readonly [z.ZodUnion<readonly [z.ZodObject<{
            type: z.ZodLiteral<"string">;
            description: z.ZodOptional<z.ZodString>;
            enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
            format: z.ZodOptional<z.ZodEnum<{
                date: "date";
                uri: "uri";
                email: "email";
                "date-time": "date-time";
            }>>;
            minLength: z.ZodOptional<z.ZodNumber>;
            maxLength: z.ZodOptional<z.ZodNumber>;
            default: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodEnum<{
                number: "number";
                integer: "integer";
            }>;
            description: z.ZodOptional<z.ZodString>;
            minimum: z.ZodOptional<z.ZodNumber>;
            maximum: z.ZodOptional<z.ZodNumber>;
            default: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"boolean">;
            description: z.ZodOptional<z.ZodString>;
            default: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strip>]>, z.ZodObject<{
            type: z.ZodLiteral<"array">;
            description: z.ZodOptional<z.ZodString>;
            items: z.ZodUnion<readonly [z.ZodObject<{
                type: z.ZodLiteral<"string">;
                description: z.ZodOptional<z.ZodString>;
                enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
                format: z.ZodOptional<z.ZodEnum<{
                    date: "date";
                    uri: "uri";
                    email: "email";
                    "date-time": "date-time";
                }>>;
                minLength: z.ZodOptional<z.ZodNumber>;
                maxLength: z.ZodOptional<z.ZodNumber>;
                default: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodEnum<{
                    number: "number";
                    integer: "integer";
                }>;
                description: z.ZodOptional<z.ZodString>;
                minimum: z.ZodOptional<z.ZodNumber>;
                maximum: z.ZodOptional<z.ZodNumber>;
                default: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodLiteral<"boolean">;
                description: z.ZodOptional<z.ZodString>;
                default: z.ZodOptional<z.ZodBoolean>;
            }, z.core.$strip>]>;
            minItems: z.ZodOptional<z.ZodNumber>;
            maxItems: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"object">;
            description: z.ZodOptional<z.ZodString>;
            properties: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodObject<{
                type: z.ZodLiteral<"string">;
                description: z.ZodOptional<z.ZodString>;
                enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
                format: z.ZodOptional<z.ZodEnum<{
                    date: "date";
                    uri: "uri";
                    email: "email";
                    "date-time": "date-time";
                }>>;
                minLength: z.ZodOptional<z.ZodNumber>;
                maxLength: z.ZodOptional<z.ZodNumber>;
                default: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodEnum<{
                    number: "number";
                    integer: "integer";
                }>;
                description: z.ZodOptional<z.ZodString>;
                minimum: z.ZodOptional<z.ZodNumber>;
                maximum: z.ZodOptional<z.ZodNumber>;
                default: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodLiteral<"boolean">;
                description: z.ZodOptional<z.ZodString>;
                default: z.ZodOptional<z.ZodBoolean>;
            }, z.core.$strip>]>>;
            required: z.ZodOptional<z.ZodArray<z.ZodString>>;
            additionalProperties: z.ZodLiteral<false>;
        }, z.core.$strip>]>, z.ZodObject<{
            type: z.ZodLiteral<"array">;
            description: z.ZodOptional<z.ZodString>;
            items: z.ZodUnion<readonly [z.ZodUnion<readonly [z.ZodObject<{
                type: z.ZodLiteral<"string">;
                description: z.ZodOptional<z.ZodString>;
                enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
                format: z.ZodOptional<z.ZodEnum<{
                    date: "date";
                    uri: "uri";
                    email: "email";
                    "date-time": "date-time";
                }>>;
                minLength: z.ZodOptional<z.ZodNumber>;
                maxLength: z.ZodOptional<z.ZodNumber>;
                default: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodEnum<{
                    number: "number";
                    integer: "integer";
                }>;
                description: z.ZodOptional<z.ZodString>;
                minimum: z.ZodOptional<z.ZodNumber>;
                maximum: z.ZodOptional<z.ZodNumber>;
                default: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodLiteral<"boolean">;
                description: z.ZodOptional<z.ZodString>;
                default: z.ZodOptional<z.ZodBoolean>;
            }, z.core.$strip>]>, z.ZodObject<{
                type: z.ZodLiteral<"object">;
                description: z.ZodOptional<z.ZodString>;
                properties: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodObject<{
                    type: z.ZodLiteral<"string">;
                    description: z.ZodOptional<z.ZodString>;
                    enum: z.ZodOptional<z.ZodArray<z.ZodString>>;
                    format: z.ZodOptional<z.ZodEnum<{
                        date: "date";
                        uri: "uri";
                        email: "email";
                        "date-time": "date-time";
                    }>>;
                    minLength: z.ZodOptional<z.ZodNumber>;
                    maxLength: z.ZodOptional<z.ZodNumber>;
                    default: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>, z.ZodObject<{
                    type: z.ZodEnum<{
                        number: "number";
                        integer: "integer";
                    }>;
                    description: z.ZodOptional<z.ZodString>;
                    minimum: z.ZodOptional<z.ZodNumber>;
                    maximum: z.ZodOptional<z.ZodNumber>;
                    default: z.ZodOptional<z.ZodNumber>;
                }, z.core.$strip>, z.ZodObject<{
                    type: z.ZodLiteral<"boolean">;
                    description: z.ZodOptional<z.ZodString>;
                    default: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>]>>;
                required: z.ZodOptional<z.ZodArray<z.ZodString>>;
                additionalProperties: z.ZodLiteral<false>;
            }, z.core.$strip>]>;
            minItems: z.ZodOptional<z.ZodNumber>;
            maxItems: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>]>>;
        required: z.ZodOptional<z.ZodArray<z.ZodString>>;
        additionalProperties: z.ZodLiteral<false>;
    }, z.core.$strip>>;
    examples: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        input: z.ZodUnknown;
        expect: z.ZodOptional<z.ZodObject<{
            outputMatches: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    entry: z.ZodString;
}, z.core.$strip>;
export declare function validateManifest(raw: unknown): ToolManifest;
/**
 * Assert `output` against an example's outputMatches map.
 * Keys are dot-paths into the output; values compare by strict equality,
 * except objects of the form {minLength: n} which assert array length.
 * Returns a list of failure messages (empty = pass).
 */
export declare function checkOutputMatches(output: unknown, outputMatches: Record<string, unknown>): string[];

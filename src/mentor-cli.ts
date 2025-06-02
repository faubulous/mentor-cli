#!/usr/bin/env node

import { Command } from "commander";
import { VocabularyGenerator } from "./vocabulary-generator";

const program = new Command();
const generator = new VocabularyGenerator();

program
    .name("mentor-cli")
    .description("CLI for generating TypeScript vocabularies from RDF files")
    .version("1.0.0");

program
    .command("generate")
    .description("Generate TypeScript vocabulary files from RDF files")
    .option("--input <pattern>", "Glob pattern for input RDF files (e.g., src/ontologies/*.(ttl|n3))")
    .option("--output-extension <ext>", "Output file extension (default: .ts)", ".ts")
    .option("--create-index-ts", "Also generate an index.ts file", false)
    .option("--create-src-ts", "Also generate a src.ts file", false)
    .action(async (options) => {
        console.log("Starting vocabulary generation...");

        if (options.input) {
            const files = await generator.parseDirectory(options.inputDirectory, options.createIndexTs, options.createSrcTs);

            if (files.length > 0) {
                console.log(`Generated files:`);

                for (const file of files) {
                    console.log(file);
                }
            } else {
                throw new Error(`No files matched the pattern: ${options.inputDirectory}`);
            }
        } else {
            console.error("You must specify --input.");

            program.help({ error: true });
        }
    });

program.parseAsync(process.argv).catch((err) => {
    console.error("Error:", err);
    process.exit(1);
});
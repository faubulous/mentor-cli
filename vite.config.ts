import { builtinModules } from "module";
import { defineConfig } from "vitest/config";

export default defineConfig({
    build: {
        target: "node20",
        outDir: "out",
        sourcemap: true,
        minify: false,
        lib: {
            entry: {
                "index": "src/index.ts",
                "mentor-cli": "src/mentor-cli.ts"
            },
            formats: ["cjs"]
        },
        rollupOptions: {
            // Dependencies are installed with the package; only the source is bundled.
            external: [
                ...builtinModules,
                ...builtinModules.map(m => `node:${m}`),
                "commander",
                "glob",
                "n3"
            ],
            output: {
                entryFileNames: "[name].js",
                chunkFileNames: "[name].js"
            }
        }
    },
    test: {
        globals: true,
        environment: "node"
    }
});

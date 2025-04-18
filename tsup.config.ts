import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  clean: true,
  minify: true,
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".mjs" : ".js"
    }
  },
})

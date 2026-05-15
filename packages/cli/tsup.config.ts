import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  outDir: "dist",
  banner: {
    js: "#!/usr/bin/env node",
  },
  clean: true,
})

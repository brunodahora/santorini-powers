import path from "path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary"],
      exclude: [
        "src/components/ui/**",
        "src/test/**",
        "src/router.ts",
        "src/main.tsx",
      ],
      thresholds: {
        branches: 80,
      },
    },
  },
});

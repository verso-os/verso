import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        setupFiles: ["./src/test/init.setup.ts", "./src/test/reset.setup.ts"],
        poolOptions: {
            threads: {
                singleThread: true,
                isolate: false,
            },
            forks: {
                singleFork: true,
                isolate: false,
            },
        },
    },
});

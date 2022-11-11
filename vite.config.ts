import { fileURLToPath, URL } from "url";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import nodePolyfills from "rollup-plugin-node-polyfills";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import inject from "@rollup/plugin-inject";
import autoprefixer from "autoprefixer";

export default ({ mode }: { mode: string }) => {
  return defineConfig({
    base: "",
    define: {
      global: "globalThis",
      "process.env": { ...process.env, ...loadEnv(mode, process.cwd(), "") },
    },
    plugins: [vue(), eslintPlugin()],
    css: {
      postcss: {
        plugins: [autoprefixer()],
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        stream: "rollup-plugin-node-polyfills/polyfills/stream",
        http: "rollup-plugin-node-polyfills/polyfills/http",
        url: "rollup-plugin-node-polyfills/polyfills/url",
        https: "rollup-plugin-node-polyfills/polyfills/http",
        querystring: "rollup-plugin-node-polyfills/polyfills/qs",
        // @TODO: Complete events polyfill import.
        // events: 'rollup-plugin-node-polyfills/polyfills/events',
        assert: "assert",
        crypto: "crypto-browserify",
        util: "util",
      },
    },
    build: {
      target: "esnext",
      rollupOptions: {
        plugins: [
          inject({ Buffer: ["buffer", "Buffer"] }),
          nodePolyfills({ crypto: true }) as never,
        ],
      },
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    server: {
      hmr: {
        port: 3001,
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "esnext",
        // Node.js global to browser globalThis
        define: {
          global: "globalThis",
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true,
          }),
        ],
      },
    },
  });
};

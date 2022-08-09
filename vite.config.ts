import { fileURLToPath, URL } from "url";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import inject from "@rollup/plugin-inject";

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  define: {
    global: "globalThis",
    "process.env": {},
  },
  plugins: [vue(), eslintPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      include: ["node_modules/@walletconnect/**"],
      plugins: [inject({ Buffer: ["buffer", "Buffer"] })],
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
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
});

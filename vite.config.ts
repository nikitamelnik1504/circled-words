import { fileURLToPath, URL } from "url";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import inject from "@rollup/plugin-inject";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
// @ts-ignore
export default ({ mode }) => {
  return defineConfig({
    base: "",
    define: {
      global: "globalThis",
      "process.env": { ...process.env, ...loadEnv(mode, process.cwd(), "") },
    },
    plugins: [vue(), eslintPlugin()],
    css: {
      postcss: {
        plugins: [
            autoprefixer()
        ],
      }
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      target: "es2020",
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
        target: "es2020",
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
};

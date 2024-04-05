import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import polyfillNode from "rollup-plugin-polyfill-node";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), polyfillNode()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      target: "esnext",
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  resolve: {
    alias: {
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
    },
  },
  build: {
    target: "esnext",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("lodash")) {
            return "lodash";
          }
        },
      },
    },
    minify: false, // Ensure esbuild is used for minification
  },
  server: {
    host: "localhost",
    port: 3001,
    hmr: {
      overlay: true,
    },
  },
});

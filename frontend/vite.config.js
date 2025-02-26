import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // nodePolyfills({
    // }),
  ],
  resolve: {
    alias: {
      // Add any path aliases here if needed
    },
  },
  server: {
    port: 3000, // Match the default CRA port
    open: true,
  },
  build: {
    outDir: "build", // Match CRA's output directory
  },
});

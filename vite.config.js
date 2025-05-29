// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    warmup: {
      clientFiles: ["./src/main.jsx", "./src/App.jsx"],
    },
  },

  build: {
    chunkSizeWarningLimit: 1000,
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), imagetools(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[hash][extname]",
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitro/plugin-react";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  plugins: [react(), imagetools()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[hash][extname]",
      },
    },
  },
});

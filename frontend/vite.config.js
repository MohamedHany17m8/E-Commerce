import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Validate that VITE_BACKEND_URL is set
  if (!env.VITE_BACKEND_URL) {
    throw new Error("VITE_BACKEND_URL must be set in .env file");
  }

  return {
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
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
          configure: (proxy, _options) => {
            proxy.on("error", (err, _req, _res) => {
              console.log("Proxy Error:", err);
            });
          },
        },
      },
    },
  };
});

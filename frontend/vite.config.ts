import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), envCompatible()],
  server: {
    proxy: {
      "/api": {
        changeOrigin: true,
        target: "http://localhost:3000",
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});

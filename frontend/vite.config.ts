// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import envCompatible from "vite-plugin-env-compatible";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), envCompatible()],
//   server: {
//     proxy: {
//       "/api": {
//         changeOrigin: true,
//         target: "http://localhost:3001",
//         rewrite: (path) => path.replace(/^\/api/, "/api"),
//       },
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    envCompatible(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "Skilltastic",
        short_name: "Skilltastic",
        description: "A platform to manage your skills and courses.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: true,
      },
      // Ensure the correct source directory and filename for the service worker
      srcDir: "src",
      filename: "sw.ts",
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        changeOrigin: true,
        target: "http://localhost:3001",
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});

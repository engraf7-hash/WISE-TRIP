import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/WISE-TRIP/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "icons/icon-192.png", "icons/icon-512.png"],
      manifest: {
        name: "Wise Trip — Aprenda Inglês",
        short_name: "Wise Trip",
        description: "Seu passaporte para o inglês: frases, expressões e vocabulário técnico.",
        theme_color: "#7B2FF7",
        background_color: "#F5F3FF",
        display: "standalone",
        start_url: "/WISE-TRIP/",
        scope: "/WISE-TRIP/",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
        ]
      }
    })
  ]
});

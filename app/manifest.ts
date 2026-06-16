import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "../lib/site";

// Web App Manifest — Next.js автоматично добавя <link rel="manifest"> и
// сервира /manifest.webmanifest. Дава име/икона/цвят при „Add to Home Screen".
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Dana Vitan",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0c",
    theme_color: "#0b0b0c",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

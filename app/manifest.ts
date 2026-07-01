import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Meridian",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f7",
    theme_color: "#8B1E24",
    categories: ["finance", "banking"],
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

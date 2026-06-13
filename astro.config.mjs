import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

export default defineConfig({
  site: "https://nanograf31415926535.github.io",
  base: "/artem-sakhniuk.github.io",
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});

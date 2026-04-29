import { defineConfig } from "@tanstack/react-start/config";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig({
  server: {
    preset: "vercel",
  },
  deployment: {
    preset: "vercel",
  },
  vite: {
    plugins: [
      tanstackRouter(),
      tsconfigPaths(),
      tailwindcss(),
    ],
  },
});

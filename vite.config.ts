import { defineConfig } from "vite";
import { TanStackRouterVite as tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tanstackRouter(),
    tanstackStart({
      deployment: {
        preset: "vercel",
      },
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});

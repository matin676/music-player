import { defineConfig } from "vite";
// Config reload trigger
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/music-player/", // Assuming GH-pages repo name is music-player based on homepage in package.json
  server: {
    open: true,
  },
});

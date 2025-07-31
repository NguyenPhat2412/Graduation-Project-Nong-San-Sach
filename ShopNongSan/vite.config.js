import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// https://vite.dev/config/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1500,
  },
  // Hook sau khi build để copy static.json vào dist
  closeBundle: () => {
    const srcPath = path.resolve(__dirname, "static.json");
    const destPath = path.resolve(__dirname, "dist", "static.json");
    fs.copyFileSync(srcPath, destPath);
  },
  base: "/",
});

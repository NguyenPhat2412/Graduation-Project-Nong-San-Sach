import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    {
      name: "copy-static-json",
      closeBundle() {
        const srcPath = path.resolve(__dirname, "static.json");
        const destPath = path.resolve(__dirname, "dist", "static.json");
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, destPath);
          console.log("✅ Đã copy static.json vào dist/");
        } else {
          console.warn("⚠️ Không tìm thấy static.json");
        }
      },
    },
  ],
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1500,
  },
  base: "/",
});

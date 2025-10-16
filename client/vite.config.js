import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // ✅ Add React plugin
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(), // ✅ React plugin is required
    tailwindcss(),
  ],
  base: "/", // ✅ Critical for Render deployment
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});

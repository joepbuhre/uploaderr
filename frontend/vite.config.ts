import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        outDir: "../dist/frontend",
    },
    envDir: "../",
    server: {
        port: 5173,
        proxy: {
            "/env.js": "http://localhost:5174/",
            "/api": "http://localhost:8080",
        },
    },
});

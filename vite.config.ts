import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // Rutas relativas: el sitio funciona igual en la raíz de un dominio que en una
  // subcarpeta (GitHub Pages lo publica en usuario.github.io/nombre-del-repositorio/).
  base: './',
  server: {
    host: "localhost",
    port: 5173,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

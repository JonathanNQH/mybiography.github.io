import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ command }) => {
  const base = command === 'build' ? '/YOUR_REPO_NAME/' : '/'; // IMPORTANT: Replace YOUR_REPO_NAME with your actual GitHub repository name (e.g., 'my-portfolio-site')

  return {
    base: base,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [dyadComponentTagger(), react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
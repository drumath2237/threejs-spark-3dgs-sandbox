import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  return {
    base: mode === "production" ? "/threejs-spark-3dgs-sandbox/" : undefined,
  };
});

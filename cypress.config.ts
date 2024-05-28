import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    baseUrl: "http://localhost:4173"
  },
  component: {
    specPattern: "src/**/__tests__/*.{cy,spec}.{js,ts}",
    devServer: {
      framework: "vue",
      bundler: "vite"
    }
  }
})

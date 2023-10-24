import { defineConfig } from 'vite'

export default defineConfig({
  base: '/gdp-bar-chart/',
  esbuild: {
    supported: {
      'top-level-await': true //browsers can handle top-level-await features
    }
  }
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/netflixgpt/', // 👈 VERY IMPORTANT for GitHub Pages
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
})

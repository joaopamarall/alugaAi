import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
  alias: {
    '@': fileURLToPath(new URL('.', import.meta.url)),
  },
  modules: [
    // '@nuxt/content',
    // '@nuxt/eslint',
    // '@nuxt/fonts',
    // '@nuxt/icon',
    // '@nuxt/image',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  css: ['@/assets/css/main.css'],
  typescript: {
    typeCheck: true
  }
});
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/test-utils',
  ],
  ssr: false,
  components: {
    dirs: [],
  },
  devtools: { enabled: true },
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  sourcemap: {
    server: true,
    client: true,
  },
  compatibilityDate: '2025-07-15',
  nitro: {
    preset: 'static',
  },
  vite: {
    plugins: [
      vuetify({ autoImport: false }),
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})

import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: true,
  srcDir: 'src',
  app: {
    rootId: '__something__',
    buildAssetsDir: '/something/',
    head: {
      htmlAttrs: {
        lang: 'ja',
        prefix: 'og: http://ogp.me/ns#',
      },
      title: '',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'manifest', href: '/manifest.webmanifest' }],
    },
  },
  imports: {
    autoImport: false,
  },
  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },

    prerender: {
      crawlLinks: true,
      failOnError: false,
    },
  },
  telemetry: false,
  modules: ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module'],
  devtools: { enabled: true },
  runtimeConfig: {},
})

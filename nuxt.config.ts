import { defineNuxtConfig } from 'nuxt/config'

const isDev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
  ssr: true,
  srcDir: 'src',
  devtools: { enabled: true },
  debug: isDev,
  telemetry: false,
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja',
        prefix: 'og: http://ogp.me/ns#',
      },
      title: '',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    buildAssetsDir: `${isDev ? '_nuxt' : 'assets'}`,
    // baseURL: isDev ? '' : '/lp', // TODO: デプロイ先がルートディレクトリでない場合、必ず指定しなければならない
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
  css: ['@/assets/scss/style.scss'],
  modules: ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module', '@nuxt/image', '@nuxtjs/device', '@vee-validate/nuxt'],
  runtimeConfig: {
    public: {
      CONTACT_FORM_URL: process.env.CONTACT_FORM_URL,
    },
  },
  image: {
    dir: 'assets/images',
    quality: 80,
  },
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
})

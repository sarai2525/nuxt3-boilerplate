import { defineNuxtConfig } from 'nuxt/config'

const isDev = process.env.NODE_ENV === 'development'
let moduleList: string[] = [
  '@nuxtjs/eslint-module',
  '@nuxtjs/stylelint-module',
  '@nuxt/image',
  '@nuxtjs/device',
  '@vee-validate/nuxt',
  '@nuxt/test-utils/module',
  '@nuxtjs/tailwindcss',
]
const modules = isDev
  ? moduleList
  : (moduleList = [...moduleList, '@nuxtjs/sitemap', 'nuxt-gtag', '@zadigetvoltaire/nuxt-gtm'])

const productionConfig = {
  site: {
    url: process.env.SITE_URL,
  },
  gtag: {
    id: process.env.GA_ID,
  },
  gtm: {
    id: process.env.GTM_ID,
  },
}
const config = defineNuxtConfig({
  ssr: true,
  srcDir: 'src',
  devtools: { enabled: isDev },
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
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/var/index.scss" as var;',
        },
      },
    },
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
  modules,
  runtimeConfig: {
    public: {
      CONTACT_FORM_URL: process.env.CONTACT_FORM_URL,
      SITE_URL: process.env.SITE_URL,
      APP_ENV: process.env.NODE_ENV,
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

const configProduction = { ...config, ...productionConfig }

export default isDev ? config : configProduction

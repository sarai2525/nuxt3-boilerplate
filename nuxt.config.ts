import { defineNuxtConfig } from 'nuxt/config'

const isDev = process.env.APP_ENV === 'dev'
let moduleList: string[] = [
  '@nuxt/eslint',
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
  debug: process.env.NODE_ENV === 'development',
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
    buildAssetsDir: isDev ? '_nuxt' : 'assets',
    // baseURL: isDev ? '' : '/lp', // TODO: デプロイ先がルートディレクトリでない場合、必ず指定しなければならない
  },
  vite: {
    build: {
      target: 'esnext',
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/variables.scss";',
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
      APP_ENV: process.env.APP_ENV,
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
  ignore: ['**/*.test.*', '**/*.spec.*', '**/tests/**'],
  eslint: {
    config: {
      stylistic: {
        semi: false,
        quotes: 'single',
      },
    },
  },
})

const configProduction = { ...config, ...productionConfig }

export default isDev ? config : configProduction

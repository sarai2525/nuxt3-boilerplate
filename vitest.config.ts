import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const r = (p: string) => resolve(__dirname, p)

export default defineConfig({
  resolve: {
    alias: {
      '~': r('./src'),
      '@': r('./src'),
    },
  },
  test: {
    // サーバーサイドテスト向けの環境設定
    environment: 'node',

    // グローバルなテスト設定
    globals: true,

    // テストのタイムアウト設定（ミリ秒）
    testTimeout: 10000,

    // 並列実行の設定
    // threads: true,

    // カバレッジの設定
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/**', '.nuxt/**', 'dist/**', 'test/**', '**/*.d.ts', '**/*.vue'],
      include: ['server/**/*.ts'],
    },

    // テスト実行時に除外するファイル
    exclude: ['**/node_modules/**', '**/.nuxt/**', '**/dist/**'],

    // テスト実行時に含めるファイル - サーバーディレクトリに焦点
    include: ['./src/**/*.{test,spec}.ts'],

    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL('.', import.meta.url)),
        mock: {},
      },
    },

    setupFiles: ['reflect-metadata'],
  },
})

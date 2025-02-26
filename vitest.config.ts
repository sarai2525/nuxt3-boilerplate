import { defineVitestConfig } from '@nuxt/test-utils/config'
import { fileURLToPath } from 'node:url'

export default defineVitestConfig({
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
    include: ['server/**/*.{test,spec}.{js,ts}'],

    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL('.', import.meta.url)),
        mock: {},
      },
    },
  },
})

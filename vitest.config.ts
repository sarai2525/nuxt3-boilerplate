import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { defineVitestConfig } from '@nuxt/test-utils/config'

const r = (p: string) => resolve(__dirname, p)

export default defineVitestConfig({
  resolve: {
    alias: {
      '~': r('./src'),
      '@': r('./src'),
    },
  },
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        rootDir: fileURLToPath(new URL('./src', import.meta.url)),
        mock: {},
      },
    },
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/**', '.nuxt/**', 'dist/**', 'test/**', '**/*.d.ts', '**/*.vue'],
      include: ['src/**/*.{test,spec}.ts'],
    },
    exclude: ['**/node_modules/**', '**/.nuxt/**', '**/dist/**'],
    include: ['./src/**/*.{test,spec}.ts'],
  },
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
      },
    },
  },
})

module.exports = {
  extends: ['stylelint-config-recommended-vue'],
  ignoreFiles: ['**/node_modules/**', '**/.nuxt/**', '**/dist/**'],
  rules: {},
  customSyntax: 'postcss-scss',
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
}

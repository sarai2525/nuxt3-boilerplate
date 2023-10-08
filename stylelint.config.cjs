module.exports = {
  extends: ['stylelint-config-recommended-vue'],
  ignoreFiles: ['**/node_modules/**'],
  rules: {},
  customSyntax: 'postcss-scss',
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
}

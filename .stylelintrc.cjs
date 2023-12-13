module.exports = {
  root: true,
  plugins: ['stylelint-declaration-strict-value'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-html/vue',
    'stylelint-config-recess-order',
  ],
  customSyntax: 'postcss-html',
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
  overrides: [
    {
      files: ['*.less'],
      customSyntax: 'postcss-less',
    },
  ],
  rules: {
    // https://github.com/AndyOGo/stylelint-declaration-strict-value
    'scale-unlimited/declaration-strict-value': [
      '/color$/',
      {
        disableFix: true,
        // https://github.com/AndyOGo/stylelint-declaration-strict-value#autofix-support
        // "autoFixFunc": "./auto-fix-func.js"
      },
    ],
    'property-no-vendor-prefix': null,
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['v-bind', 'deep'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep', 'v-bind'],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],
  },
}

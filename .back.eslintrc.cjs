/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')
// @ts-check
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    './.eslintrc-auto-import.json',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  plugins: ['simple-import-sort'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  globals: {
    defineOptions: 'readonly',
  },
  rules: {
    // Prettier
    'prettier/prettier': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    // TS
    '@typescript-eslint/no-empty-function': 'off',
    // vue
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'error',
    'vue/require-explicit-emits': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: { void: 'always', normal: 'always', component: 'always' },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/attributes-order': 'error',
    'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
    // "script-setup", "composition", "composition-vue2", or "options"
    'vue/component-api-style': ['error', ['script-setup', 'composition']],

    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      { registeredComponentsOnly: true, ignores: [] },
    ],
    'vue/define-macros-order': [
      'error',
      { order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'] },
    ],
  },
})

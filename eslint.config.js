import { sxzz } from '@sxzz/eslint-config'

export default sxzz(
  [
    {
      plugins: {},
      rules: {
        'no-restricted-syntax': [
          'error',

          { selector: 'WithStatement', message: 'not use WithStatement' },
          { selector: 'LabeledStatement', message: 'not use LabeledStatement' },
        ],
        'no-console': 'off',
        // TS
        '@typescript-eslint/no-empty-function': 'off',
        // Prettier
        'prettier/prettier': 'error',
        'import/order': 'off',
        'sort-imports': 'off',
        'vue/attributes-order': 'error',
        'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
        'vue/component-api-style': ['error', ['script-setup', 'composition']],
        'vue/component-name-in-template-casing': [
          'error',
          'PascalCase',
          { ignores: [], registeredComponentsOnly: true },
        ],
        'vue/define-macros-order': [
          'error',
          { order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'] },
        ],
        'vue/html-self-closing': [
          'error',
          {
            html: { component: 'always', normal: 'always', void: 'always' },
            math: 'always',
            svg: 'always',
          },
        ],
        'vue/multi-word-component-names': 'off',
        // vue
        'vue/no-v-html': 'off',

        'vue/require-default-prop': 'error',
        'vue/require-explicit-emits': 'off',
      },
    },
  ],
  {
    prettier: true,
    sortKeys: true,
    vue: true,
  }
)

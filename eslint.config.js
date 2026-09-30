import { sxzz } from '@sxzz/eslint-config'

export default sxzz(
  {
    prettier: true,
    vue: true,
  },
  [
    {
      // 插件生成的类型声明，文件头自带 eslint-disable
      ignores: [
        'types/auto-imports.d.ts',
        'types/components.d.ts',
        'types/svg-component.d.ts',
        'types/svg-component-global.d.ts',
        'types/typed-router.d.ts',
      ],
    },
    {
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
        // axios/alova 实例在模块作用域注册拦截器属于预期写法
        'unicorn/no-top-level-side-effects': 'off',
      },
    },
    {
      files: ['**/*.vue'],
      rules: {
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
  ]
)

/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  plugins: ['import'],
  env: {
    browser: true,
    serviceworker: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:import/errors',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: 'tsconfig.app.json',
      },
    },
  },
  rules: {
    'import/first': 2,
    'import/newline-after-import': 2,
    'import/order': [
      2,
      {
        'pathGroups': [
          {
            pattern: '@*/**',
            group: 'parent',
          },
          {
            pattern: '.*/**',
            group: 'sibling',
          },
          {
            pattern: '../../**',
            group: 'sibling',
          },
        ],
        'newlines-between': 'always',
      },
    ],

    'prefer-const': 2,
    'no-else-return': 2,
    'no-return-await': 2,
    'camelcase': 2,
    'no-return-assign': 2,
    'prefer-destructuring': [
      2,
      {
        object: true,
        array: false,
      },
    ],
    'curly': [2, 'all'],
    'no-unused-expressions': 2,
    'object-shorthand': [
      2,
      'always',
      {
        avoidQuotes: true,
        avoidExplicitReturnArrows: true,
      },
    ],
    'no-await-in-loop': 2,
    'no-loss-of-precision': 2,
    'no-promise-executor-return': 2,
    'no-useless-backreference': 2,
    'no-throw-literal': 2,
    'array-callback-return': 2,
    'consistent-return': 2,
    'dot-notation': 2,
    'no-extend-native': 2,
    'no-lone-blocks': 2,
    'no-multi-str': 2,
    'no-proto': 2,
    'require-await': 2,
    'prefer-template': 2,
    'prefer-arrow-callback': 2,
    'arrow-body-style': 2,
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['multiline-block-like', 'multiline-const', 'multiline-let'],
      },
      {
        blankLine: 'always',
        prev: ['multiline-block-like', 'multiline-const', 'multiline-let'],
        next: '*',
      },
      {
        blankLine: 'always',
        prev: 'export',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'export',
      },
      {
        blankLine: 'always',
        prev: 'singleline-const',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: 'singleline-let',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'singleline-const',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'singleline-let',
      },
      {
        blankLine: 'any',
        prev: 'singleline-let',
        next: 'singleline-let',
      },
      {
        blankLine: 'any',
        prev: 'singleline-const',
        next: 'singleline-const',
      },
    ],

    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/attributes-order': 2,
    'vue/order-in-components': 2,
    'vue/no-empty-component-block': 2,
    'vue/max-attributes-per-line': 0,
    'vue/singleline-html-element-content-newline': 0,
  },
}

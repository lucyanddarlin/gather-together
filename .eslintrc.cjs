/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    '@sxzz',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 0,
    'no-unused-vars': 1,
    'no-undef': 0,
    'vue/html-self-closing': [
      0,
      {
        html: {
          void: 'never',
          normal: 'any',
          component: 'any',
        },
      },
    ],
  },
}

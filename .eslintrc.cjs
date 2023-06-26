module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  extends: ['standard-with-typescript', 'plugin:vue/vue3-essential'],
  parser: 'vue-eslint-parser',
  parserOptions: { parser: '@typescript-eslint/parser' },
  plugins: ['vue'],
  rules: {
    'space-before-function-paren': 0,
    'comma-dangle': 'off',
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'func-call-spacing': 'off',
    'vue/multi-word-component-names': 'off',
  },
}

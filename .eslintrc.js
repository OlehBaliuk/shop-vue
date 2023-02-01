module.exports = {
  root: true,

  env: {
    node: true,
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 0,
    'arrow-parens': 0,
    'max-len': ['off', { code: 120, tabWidth: 4 }],
    'linebreak-style': 0,
    camelcase: 0,
    'no-trailing-spaces': 0,
    'object-curly-newline': 0,
    'vuejs-accessibility/label-has-for': 'off',
    'vue/no-mutating-props': 0,
    'newline-per-chained-call': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    // 'class-methods-use-this': 0,
    // 'no-unused-vars': 0,
  },

  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],

  extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/typescript'],
};

// module.exports = {
//   root: true,
//   env: {
//     node: true,
//     'cypress/globals': true,
//   },
//   extends: ['plugin:vue/recommended', '@vue/typescript'],
//   rules: {
//     'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
//     indent: ['error', 4],
//     'function-paren-newline': ['warn', { minItems: 5 }],
//     'comma-dangle': ['error', 'always-multiline'],
//     quotes: ['warn', 'single'],
//     'vue/html-indent': ['error', 4],
//     'vuetify/no-deprecated-classes': 'error',
//     'vuetify/no-legacy-grid': 'warn',
//     'vuetify/grid-unknown-attributes': 'warn',
//   },
//   plugins: [
//     'vuetify',
//     'cypress',
//   ],
//   parserOptions: {
//     parser: '@typescript-eslint/parser',
//   },
// };

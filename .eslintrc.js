module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: ['plugin:vue/essential', '@vue/airbnb'],

  parserOptions: {
    parser: '@babel/eslint-parser',
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
  },

  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};

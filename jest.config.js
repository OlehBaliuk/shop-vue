module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  clearMocks: true,
  transform: {
    'vee-validate/dist/rules': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!vee-validate/dist/rules)'],
};

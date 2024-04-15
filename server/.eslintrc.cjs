module.exports = {
  parser: '@babel/eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier', 'import', 'promise'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  root: true,
  env: {
    node: true,
    es6: true,
    amd: true,
  },
  rules: {
    'no-undef': 1,
    'global-strict': 0,
    'no-extra-semi': 1,
    'no-underscore-dangle': 0,
    'no-console': 1,
    'no-unused-vars': 1,
    'prefer-const': 1,
    'prefer-arrow-callback': 1,
    'prefer-template': 1,
    'no-var': 1,
    'object-shorthand': 1,
    'no-return-await': 2,
    'require-atomic-updates': 1,
    'promise/prefer-await-to-then': 1,
  },
  overrides: [
    {
      files: ['*.test.js', '*.test.ts', '*.spec.ts'],
      plugins: ['jest', 'prettier']
    }
  ],
};

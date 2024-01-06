module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    mocha: true,
  },
  extends: 'eslint:recommended',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'no-unused-vars': ['warn'],
  },
}

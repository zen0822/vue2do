module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    'browser': true,
    'node': true,
    'jasmine': true
  },
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  globals: {
    'document': true,
    'window': true,
    '$': true
  },
  'rules': {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'indent': 0,
    'space-before-function-paren': 0,
    'no-unused-vars': 0,
    'no-multiple-empty-lines': 0,
    'no-useless-escape': 0,
    'import/no-webpack-loader-syntax': 0,
    'no-trailing-spaces': ['error', { 'skipBlankLines': true }]
  }
}

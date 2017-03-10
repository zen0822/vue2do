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
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  globals: {
    'document': true,
    'window': true,
    '$': true
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'indent': 0,
    'space-before-function-paren': 0,
    'no-unused-vars': 0,
    'no-multiple-empty-lines': 0,
    'no-useless-escape': 0
  }
}

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    'browser': true,
    'node': true,
    'jasmine': true,
    'es6': true
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 2,
        '@typescript-eslint/no-var-requires': 2,
        '@typescript-eslint/no-this-alias': 2
      }
    }
  ],
  parserOptions: {
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'html',
    'json',
    'promise',
    'import',
    'node',
  ],
  globals: {
    'document': true,
    'window': true,
    '$': true,
    'exit': true,
    'workbox': true
  },
  'rules': {
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-this-alias': 0,
    'quotes': ['error', 'single', {
      'allowTemplateLiterals': true
    }],
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 0,
    'no-multiple-empty-lines': 0,
    'no-useless-escape': 0,
    'no-async-promise-executor': 0,
    'import/no-webpack-loader-syntax': 0,
    indent: ['error', 2, {
      SwitchCase: 1
    }],
    'no-trailing-spaces': ['error', {
      'skipBlankLines': true
    }],
    'no-template-curly-in-string': 0,
    'operator-linebreak': 0
  }
}

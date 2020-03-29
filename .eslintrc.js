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
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    },
    extraFileExtensions: ['.json'],
    project: [
      './tsconfig.json',
      './tsconfig.eslint.json',
      './app/mock/server/sw/tsconfig.json',
      './package/component/tsconfig.json',
      './package/mock/tsconfig.json',
      './package/test/tsconfig.json'
    ],
    sourceType: 'module',
    tsconfigRootDir: './'
  },
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
  plugins: [
    '@typescript-eslint',
    'html',
    'json',
    'jsx',
    'promise',
    'import',
    'node'
  ],
  globals: {
    'document': true,
    'window': true,
    '$': true,
    'exit': true,
    'workbox': true
  },
  rules: {
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/no-unused-expressions': [2, {
      'allowShortCircuit': true,
      'allowTernary': true,
      'allowTaggedTemplates': true
    }],
    '@typescript-eslint/prefer-optional-chain': 2,
    'jsx/uses-factory': [1, { 'pragma': 'JSX' }],
    'jsx/factory-in-scope': [0, { 'pragma': 'JSX' }],
    'jsx/mark-used-vars': 1,
    'jsx/no-undef': 0,
    'quotes': ['error', 'single', {
      'allowTemplateLiterals': true
    }],
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 0,
    'no-multiple-empty-lines': 0,
    'no-useless-escape': 0,
    'no-unused-expressions': 0,
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
  },
  settings: {
    'import/resolver': 'node',
    'import/internal-regex': [
      /^@app/, 
      /^@package/
    ]
  }
}

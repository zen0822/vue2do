module.exports = {
  'env': {
    'testing': {
      'plugins': ['istanbul']
    }
  },
  presets: [
    '@vue/babel-preset-jsx',
    ['@babel/env', {
      modules: false,
      targets: {
        browsers: ['last 2 versions', 'ie >= 10', 'iOS >= 8']
      }
    }]
  ],
  plugins: [
    '@babel/syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    ['transform-object-rest-spread', {
      useBuiltIns: true
    }]
  ]
}

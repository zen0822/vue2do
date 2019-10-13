module.exports = {
  extends: [
    'stylelint-config-standard'
  ],
  plugins: [
    'stylelint-scss'
  ],
  rules: {
    indentation: 2,
    'at-rule-empty-line-before': ['always', {
      ignoreAtRules: ['import']
    }]
  }
}

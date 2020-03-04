module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'references-empty': [0],
    'subject-empty': [0],
    'type-empty': [0]
  },
  parserPreset: {
    parserOpts: {
      issuePrefixes: ['act2do-']
    }
  }
}

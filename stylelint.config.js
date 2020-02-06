module.exports = {
  extends: [
    'stylelint-config-standard'
  ],
  plugins: [
    'stylelint-scss'
  ],
  rules: {
    'scss/at-else-empty-line-before': 'never',
    'scss/at-rule-no-unknown': true,
    indentation: 2,
    'at-rule-no-unknown': null,
    'at-rule-empty-line-before': ['always', {
      ignore: [
        'after-comment',
        'blockless-after-same-name-blockless',
        'blockless-after-blockless'
      ],
      ignoreAtRules: [
        'each',
        'else',
        'extend',
        'function',
        'if',
        'import',
        'include',
        'keyframes',
        'mixin',
        'media',
        'return'
      ],
      except: [
        'first-nested'
      ]
    }],
    'block-closing-brace-newline-after': ['always', {
      ignoreAtRules: ['if', 'else']
    }],
    'font-family-no-missing-generic-family-keyword': true,
    'rule-empty-line-before': ['always', {
      except: [
        'inside-block-and-after-rule'
      ],
      ignore: [
        'after-comment',
        'inside-block',
        'first-nested'
      ]
    }]
  }
}

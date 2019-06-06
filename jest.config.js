module.exports = {
  verbose: true,
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
    'tsx',
    'scss'
  ],
  'moduleNameMapper': {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  testURL: 'http://localhost:5701/',
  testRegex: '(/__tests__/.*|/__tests__/(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**'
  ],
  coverageReporters: [
    'html',
    'text-summary'
  ],
  snapshotSerializers: [
    'jest-serializer-vue'
  ]
}

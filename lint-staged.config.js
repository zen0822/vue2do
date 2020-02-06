const micromatch = require('micromatch')

module.exports = {
  'app/**/*.{js,jsx,ts,tsx}': (files) => {
    const match = micromatch.not(files, ['dist', 'tsDist'])

    return match.map((file) => {
      return `eslint ${file} --fix`
    })
  },
  'package/**/*.{ts,tsx}': (files) => {
    const match = micromatch.not(files, ['dist', 'tsDist'])

    return match.map((file) => {
      return `eslint ${file} --fix`
    })
  }
}

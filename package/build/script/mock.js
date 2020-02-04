/**
 * @param appName { string } - project name
 * @param opt { Object } - the options that start the development project
 */
module.exports = function ({
  appName
}) {
  const optimist = require('optimist')

  if (!appName) {
    console.warn('argv app must alive!')

    return false
  }

  const config = require('./config')({
    appName
  })

  const server = require('express')()
  const mockPort = config.dev.mockPort

  server.listen(mockPort, function () {
    console.log(`Api path listening on port ${mockPort}!`)
  })

  require(`../app/${appName}/mock`)(server)
}

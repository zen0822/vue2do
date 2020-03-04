/**
 * Start GraphQL server
 *
 * configPath {string} - 配置文件路径
 */
function gql({
  configPath
} = {}) {
  require('./tsDist/script/gql')({
    projectConfigPath: configPath
  })
}

exports = module.exports = function mock() {
  return {
    gql
  }
}

exports.gql = gql

module.exports = function (PnpWebpackPlugin) {
  class WrapPnpWebpackPlugin {
    apply(...args) {
      return PnpWebpackPlugin.apply(...args)
    }
  }

  WrapPnpWebpackPlugin.moduleLoader = function (module) {
    return class WrapPnpWebpackPluginModuleLoader {
      apply(...args) {
        return PnpWebpackPlugin.moduleLoader(module).apply(...args)
      }
    }
  }

  WrapPnpWebpackPlugin.forkTsCheckerOptions = PnpWebpackPlugin.forkTsCheckerOptions
  WrapPnpWebpackPlugin.tsLoaderOptions = PnpWebpackPlugin.tsLoaderOptions

  return WrapPnpWebpackPlugin
}

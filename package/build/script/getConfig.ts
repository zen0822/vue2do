/**
 * Get configuration
 */

import getConf from '../config'
import getBaseConf from '../config/base.webpack.conf'
import getDevBaseConf from '../config/dev.webpack.conf'
import getProdBaseConf from '../config/prod.webpack.conf'

type TOpt = {
  projectConfig: any
  projectConfigPath?: string
}

export default function ({
  projectConfig = {},
  projectConfigPath
}: TOpt): any {
  const config = getConf({
    projectConfig,
    projectConfigPath
  })
  const baseWebpackChain = getBaseConf({
    config
  })
  const devWebpackChain = getDevBaseConf({
    config
  })
  const prodWebpackChain = getProdBaseConf({
    config
  })

  return {
    base: baseWebpackChain,
    dev: devWebpackChain,
    prod: prodWebpackChain
  }
}

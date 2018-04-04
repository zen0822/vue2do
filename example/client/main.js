/**
 * the main file that the client of app
 */

// import 'font-awesome-sass-loader'
import './common'

import Vue from 'vue'
import {
  createApp
} from './app'

const {
  app,
  router
} = createApp()

router.onReady(() => {
  app.$mount('#app')
})

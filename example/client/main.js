/**
 * the main file that the client of app
 */

// import 'font-awesome-sass-loader'
import './common'

import Vue from 'vue'
import {
  createApp
} from './app'

if (process.env.NODE_ENV === 'production') {
  window._hmt = window._hmt || []

  var hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?25a6196bf29fc95bf16136b45038ae6a'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
}

const {
  app,
  router
} = createApp()

router.onReady(() => {
  app.$mount('#app')
})

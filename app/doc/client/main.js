/**
 * the main file that the client of app
 */

// import 'font-awesome-sass-loader'

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import '@vue2do/component/dist/util.css'
import './scss/main.scss'

import {
  createApp
} from './app'

if (process.env.NODE_ENV === 'production') {
  window._hmt = window._hmt || []

  const hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?25a6196bf29fc95bf16136b45038ae6a'
  const s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
}

const {
  app,
  router
} = createApp()

router.onReady(() => {
  app.$mount('#app')
})

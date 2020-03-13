/**
 * the main file that the client of app
 */

// import 'font-awesome-sass-loader'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

import '@vue2do/component/dist/util.css'
import './scss/main.scss'
// import './sw/main'

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

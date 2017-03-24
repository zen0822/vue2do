/**
 * the main file that the client of app
 */

// import 'font-awesome-sass-loader'
import './common'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import routes from './route/route'
import appComp from './app/app'
import vue2do from 'vue2do'
// import { set as setConfig } from 'vue2do'
import enLang from 'src/language/en.json'

Vue.use(vue2do, {
  prefix: 'z'
})
Vue.use(VueRouter)
// setConfig.lang(enLang)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

const app = new Vue(Object.assign(appComp, {
  router
})).$mount('#app')

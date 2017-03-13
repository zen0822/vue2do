/**
 * the main file that the client of app
 */

import './common'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import routes from './route/route'
import appComp from './app/app'
import { set as setConfig } from 'src/config'
import enLang from 'src/language/en.json'

Vue.use(VueRouter)
setConfig.lang(enLang)

const router = new VueRouter({
  routes
})

const app = new Vue(Object.assign(appComp, {
  router
})).$mount('#app')

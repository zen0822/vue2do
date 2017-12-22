/**
 * the main file that the client of app
 */

// import 'font-awesome-sass-loader'
import './common'

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './route/route'
import App from './App/App'
import vue2do, {
  set as setVue2do
} from 'vue2do'
import enLang from 'src/language/en.json'

Vue.use(vue2do, {
  prefix: 'z'
})
Vue.use(VueRouter)

const vue2doLang = setVue2do.lang(enLang)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

const app = new Vue({
  ...App,
  i18n: vue2doLang,
  router
}).$mount('#app')

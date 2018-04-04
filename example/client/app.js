import Vue from 'vue'
import VueI18n from 'vue-i18n'

import {
  createRouter
} from './router'
import App from './App/App'

import vue2do, {
  set as setVue2do
} from 'vue2do'
import enLang from 'src/language/en-US.json'

Vue.use(vue2do, {
  prefix: 'z'
})
Vue.use(VueI18n)

const vue2doLang = new VueI18n({
  locale: Object.keys(enLang)[0],
  messages: enLang
})

export function createApp() {
  const router = createRouter()

  router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
  })

  const app = new Vue({
    ...App,
    i18n: vue2doLang,
    router
  })

  return {
    app,
    router
  }
}

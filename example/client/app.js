import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import VueCompositionApi from '@vue/composition-api'

import {
  createRouter
} from './router'
import App from './App/App'

import vue2do, {
  set as setVue2do
} from 'vue2do'
import enLang from 'src/language/en-US.json'

Vue.use(VueI18n)
Vue.use(VueApollo)
Vue.use(VueCompositionApi)
Vue.use(vue2do, {
  prefix: 'z'
})

const vue2doLang = new VueI18n({
  locale: Object.keys(enLang)[0],
  messages: enLang
})
const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: 'http://localhost:5168/gql'
  })
})

export function createApp() {
  const router = createRouter()

  router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
  })

  const app = new Vue({
    ...App,
    apolloProvider,
    i18n: vue2doLang,
    router
  })

  return {
    app,
    router
  }
}

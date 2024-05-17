import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
import VueCompositionApi from '@vue/composition-api'
import VueRouter from 'vue-router'

import App from './App/App'
import routeConfig from './route/route'
import enLang from '@vue2do/component/language/en-US.json'

Vue.use(VueRouter)
Vue.use(VueI18n)
Vue.use(VueApollo)
Vue.use(VueCompositionApi)

const vue2doLang = new VueI18n({
  locale: Object.keys(enLang)[0],
  messages: enLang
})
const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri: 'http://localhost:5168'
  })
})
const router = new VueRouter({
  routes: routeConfig
})

export function createApp(): any {
  router.beforeEach((to, _from, next) => {
    document.title = to.meta.title
    next()
  })

  const app = new Vue({
    ...(App as any),
    apolloProvider,
    i18n: vue2doLang,
    router
  })

  return {
    app,
    router
  }
}

export const useLang = (): any => vue2doLang
export const useApollo = (): any => apolloProvider
export const useRoute = (): any => router
export const useRouter = (): any => router

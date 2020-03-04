import Vue from 'vue'
import Router from 'vue-router'
import routes from './route/route'

Vue.use(Router)
const router = new Router({
  routes
})

export function createRouter () {
  return router
}

export function useRouter() {
  return router
}

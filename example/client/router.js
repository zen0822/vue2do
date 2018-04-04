import Vue from 'vue'
import Router from 'vue-router'
import routes from './route/route'

Vue.use(Router)

export function createRouter () {
  return new Router({
    routes
  })
}

import notFoundPage from '../component/404/404'
import welcome from '../component/page/welcome/welcome'
import component from '../component/page/component/component'
import total from '../component/page/component/total/total'
import btn from '../component/page/component/btn/btn'

export default [
  {
    path: '/component',
    component: component,
    beforeEnter(to, from, next) {
      document.title = '组件'
      next()
    },
    children: [{
      path: '/',
      component: total,
      beforeEnter(to, from, next) {
        document.title = '全部组件'
        next()
      }
    }, {
      path: '/btn',
      component: btn,
      beforeEnter(to, from, next) {
        document.title = '按钮组件'
        next()
      }
    }]
  },
  {
    path: '/',
    title: 'welcome to zenAdminer',
    component: welcome
  },
  {
    path: '*',
    'title': 'page not found',
    'component': notFoundPage
  }
]

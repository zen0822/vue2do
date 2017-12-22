import notFoundPage from '../component/404/404'
import welcome from '../component/page/Welcome/Welcome'

import component from '../component/page/Component/Component'
import componentChildren from './componentChildren'

export default [
  {
    path: '/component',
    component: component,
    children: componentChildren
  },
  {
    path: '/',
    component: welcome,
    meta: {
      title: '主页'
    }
  },
  {
    path: '*',
    component: notFoundPage,
    meta: {
      title: '404'
    }
  }
]

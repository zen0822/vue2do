import notFoundPage from '../component/404/404'
import welcome from '../component/page/Welcome/Welcome'
import PageBuild from '../component/page/Build/Build'
import PageAbout from '../component/page/About/About'

import component from '../component/page/Component/Component'
import componentChildren from './componentChildren'

export default [
  {
    path: '/',
    component: welcome,
    meta: {
      title: '主页'
    }
  },
  {
    path: '/build',
    component: PageBuild,
    meta: {
      title: '构建'
    }
  },
  {
    path: '/about',
    component: PageAbout,
    meta: {
      title: '构建'
    }
  },
  {
    path: '/component',
    component: component,
    children: componentChildren
  },
  {
    path: '*',
    component: notFoundPage,
    meta: {
      title: '404'
    }
  }
]

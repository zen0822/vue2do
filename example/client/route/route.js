import componentChildren from './componentChildren'

export default [{
  path: '/',
  component: () => import('../component/page/Welcome/Welcome'),
  meta: {
    title: '主页'
  }
}, {
  path: '/build',
  component: () => import('../component/page/Build/Build'),
  meta: {
    title: '构建'
  }
}, {
  path: '/about',
  component: () => import('../component/page/About/About'),
  meta: {
    title: '构建'
  }
}, {
  path: '/component',
  component: () => import('../component/page/Component/Component'),
  children: componentChildren
}, {
  path: '*',
  component: () => import('../component/404/404'),
  meta: {
    title: '404'
  }
}]

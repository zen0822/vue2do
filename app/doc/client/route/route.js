import componentChildren from './componentChildren'

// const routerLazyLoad = (filename) => {
//   return () => {
//     try {
//       return import(/* webpackChunkName: "[request]" */`../component/page${filename}`)
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

export default [{
  path: '/',
  component: () => import('../component/page/Welcome/Welcome'),
  meta: {
    title: '主页'
  }
}, {
  path: '/hello',
  component: () => import('../component/page/Hello/Hello'),
  meta: {
    title: 'soulemate'
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
  path: '/blog',
  component: () => import('../component/page/Blog/Blog'),
  meta: {
    title: '文章'
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

export default [{
  path: '/',
  component: () => import('../component/page/Mock/Mock'),
  meta: {
    title: 'Min Mock'
  }
}, {
  path: '*',
  component: () => import('../component/404/404'),
  meta: {
    title: '404'
  }
}]

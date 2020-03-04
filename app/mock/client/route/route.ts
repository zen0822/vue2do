export default [{
  path: '/',
  component: (): Promise<any> => import('../component/page/Mock/Mock'),
  meta: {
    title: 'Min Mock'
  }
}, {
  path: '*',
  component: (): Promise<any> => import('../component/404/404'),
  meta: {
    title: '404'
  }
}]

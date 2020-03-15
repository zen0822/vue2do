// const routerLazyLoad = (filename: string) => {
//   return (): Promise<any> | undefined => {
//     try {
//       return import(/* webpackChunkName: "[request]" */`../page${filename}`)
//     } catch (error) {
//       console.error(error)
//     }
//   }
// }

export default [{
  path: '/',
  component: (): Promise<any> => import(/* webpackChunkName: "page-mock" */ '../page/Mock/Mock'),
  meta: {
    title: 'Min Mock'
  }
}, {
  path: '*',
  component: (): Promise<any> => import(/* webpackChunkName: "page-404" */ '../page/404/404'),
  meta: {
    title: '404'
  }
}]

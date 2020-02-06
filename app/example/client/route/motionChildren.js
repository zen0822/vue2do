export default [{
  path: 'zoom',
  component: () => import('../component/page/Component/Motion/Zoom/Zoom'),
  meta: {
    title: '缩放过渡组件'
  }
}, {
  path: 'slide',
  component: () => import('../component/page/Component/Motion/Slide/Slide'),
  meta: {
    title: '滑动过渡组件'
  }
}, {
  path: 'fade',
  component: () => import('../component/page/Component/Motion/Fade/Fade'),
  meta: {
    title: '淡淡过渡组件'
  }
}, {
  path: 'fold',
  component: () => import('../component/page/Component/Motion/Fold/Fold'),
  meta: {
    title: '折叠过渡组件'
  }
}, {
  path: 'rip',
  component: () => import('../component/page/Component/Motion/Rip/Rip'),
  meta: {
    title: '涟漪过渡组件'
  }
}]

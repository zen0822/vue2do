import ZoomMotion from '../component/page/component/Motion/Zoom/Zoom'
import SlideMotion from '../component/page/component/Motion/Slide/Slide'
import FadeMotion from '../component/page/component/Motion/Fade/Fade'
import RipMotion from '../component/page/component/Motion/Rip/Rip'
import FoldMotion from '../component/page/component/Motion/Fold/Fold'

export default [{
  path: 'zoom',
  component: ZoomMotion,
  meta: {
    title: '缩放过渡组件'
  }
}, {
  path: 'slide',
  component: SlideMotion,
  meta: {
    title: '滑动过渡组件'
  }
}, {
  path: 'fade',
  component: FadeMotion,
  meta: {
    title: '淡淡过渡组件'
  }
}, {
  path: 'fold',
  component: FoldMotion,
  meta: {
    title: '折叠过渡组件'
  }
}, {
  path: 'rip',
  component: RipMotion,
  meta: {
    title: '涟漪过渡组件'
  }
}]

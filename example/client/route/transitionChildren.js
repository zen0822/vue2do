import TransitionPage from '../component/page/component/Transition/Transition'
import ZoomTransition from '../component/page/component/Transition/Zoom/Zoom'
import SlideTransition from '../component/page/component/Transition/Slide/Slide'
import FadeTransition from '../component/page/component/Transition/Fade/Fade'
import RipTransition from '../component/page/component/Transition/Rip/Rip'
import FoldTransition from '../component/page/component/Transition/Fold/Fold'

export default [{
  path: 'zoom',
  component: ZoomTransition,
  meta: {
    title: '缩放过渡组件'
  }
}, {
  path: 'slide',
  component: SlideTransition,
  meta: {
    title: '滑动过渡组件'
  }
}, {
  path: 'fade',
  component: FadeTransition,
  meta: {
    title: '淡淡过渡组件'
  }
}, {
  path: 'fold',
  component: FoldTransition,
  meta: {
    title: '折叠过渡组件'
  }
}, {
  path: 'rip',
  component: RipTransition,
  meta: {
    title: '涟漪过渡组件'
  }
}]

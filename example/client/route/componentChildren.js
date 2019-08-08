import motionChildren from './motionChildren.js'

export default [{
  path: '',
  component: () => import('../component/page/Component/total/total'),
  meta: {
    title: '全部组件'
  }
}, {
  path: 'start',
  component: () => import('../component/page/Component/Start/Start'),
  meta: {
    title: '开始使用'
  }
}, {
  path: 'btn',
  component: () => import('../component/page/Component/form/Btn/Btn'),
  meta: {
    title: '按钮组件'
  }
}, {
  path: 'check',
  component: () => import('../component/page/Component/form/Check/Check'),
  meta: {
    title: '选择组件'
  }
}, {
  path: 'select',
  component: () => import('../component/page/Component/form/Select/Select'),
  meta: {
    title: '下拉框组件'
  }
}, {
  path: 'input',
  component: () => import('../component/page/Component/form/Input/Input'),
  meta: {
    title: '输入组件'
  }
}, {
  path: 'upload',
  component: () => import('../component/page/Component/form/Upload/Upload'),
  meta: {
    title: '上传组件'
  }
}, {
  path: 'form',
  component: () => import('../component/page/Component/form/Form/Form'),
  meta: {
    title: '表单组件'
  }
}, {
  path: 'icon',
  component: () => import('../component/page/Component/style&layout/Icon/Icon'),
  meta: {
    title: '图标组件'
  }
}, {
  path: 'modal',
  component: () => import('../component/page/Component/message/Modal/Modal'),
  meta: {
    title: '弹窗组件'
  }
}, {
  path: 'omit',
  component: () => import('../component/page/Component/other/Omit/Omit'),
  meta: {
    title: '省略组件'
  }
}, {
  path: 'pop',
  component: () => import('../component/page/Component/other/Pop/Pop'),
  meta: {
    title: '弹出组件'
  }
}, {
  path: 'tip',
  component: () => import('../component/page/Component/message/Tip/Tip'),
  meta: {
    title: '提示组件'
  }
}, {
  path: 'table',
  component: () => import('../component/page/Component/data/Table/Table'),
  meta: {
    title: '表格组件'
  }
}, {
  path: 'list',
  component: () => import('../component/page/Component/data/List/List'),
  meta: {
    title: '列表组件'
  }
}, {
  path: 'pager',
  component: () => import('../component/page/Component/data/Page/Page'),
  meta: {
    title: '分页组件'
  }
}, {
  path: 'grid',
  component: () => import('../component/page/Component/style&layout/Grid/Grid'),
  meta: {
    title: '表格布局组件'
  }
}, {
  path: 'scroller',
  component: () => import('../component/page/Component/other/Scroller/Scroller'),
  meta: {
    title: '滚动条组件'
  }
}, {
  path: 'tab',
  component: () => import('../component/page/Component/other/Tab/Tab'),
  meta: {
    title: '选项卡组件'
  }
}, {
  path: 'menu',
  component: () => import('../component/page/Component/other/Menu/Menu'),
  meta: {
    title: '菜单组件'
  }
}, {
  path: 'loading',
  component: () => import('../component/page/Component/activity/Loading/Loading'),
  meta: {
    title: '加载组件'
  }
}, {
  path: 'capture',
  component: () => import('../component/page/Component/other/Capture/Capture'),
  meta: {
    title: '拍照组件'
  }
}, {
  path: 'img',
  component: () => import('../component/page/Component/data/Img/Img'),
  meta: {
    title: '图像组件'
  }
}, {
  path: 'motion',
  component: () => import('../component/page/Component/Motion/Motion'),
  children: motionChildren
}]

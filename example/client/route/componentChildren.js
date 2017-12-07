import total from '../component/page/component/total/total'
import btnPage from '../component/page/component/form/btn/btn'
import startPage from '../component/page/component/start/start'
import selectPage from '../component/page/component/form/select/select'
import checkPage from '../component/page/component/form/check/check'
import inputPage from '../component/page/component/form/input/input'
import modalPage from '../component/page/component/message/modal/modal'
import PageOmit from '../component/page/component/other/Omit/Omit'
import popPage from '../component/page/component/other/pop/pop'
import tipPage from '../component/page/component/message/tip/tip'
import tablePage from '../component/page/component/data/table/table'
import PageTab from '../component/page/component/other/Tab/Tab'
import listPage from '../component/page/component/data/list/list'
import pagerPage from '../component/page/component/data/page/page'
import gridPage from '../component/page/component/layout/grid/grid'
import scrollerPage from '../component/page/component/other/scroller/scroller'
import TransitionPage from '../component/page/component/Transition/Transition'

import transitionChildren from './transitionChildren.js'

export default [{
  path: '',
  component: total,
  meta: {
    title: '全部组件'
  }
}, {
  path: 'start',
  component: startPage,
  meta: {
    title: '开始使用'
  }
}, {
  path: 'btn',
  component: btnPage,
  meta: {
    title: '按钮组件'
  }
}, {
  path: 'check',
  component: checkPage,
  meta: {
    title: '按钮组件'
  }
}, {
  path: 'select',
  component: selectPage,
  meta: {
    title: '下拉框组件'
  }
}, {
  path: 'input',
  component: inputPage,
  meta: {
    title: '输入组件'
  }
}, {
  path: 'check',
  component: checkPage,
  meta: {
    title: '选择框组件'
  }
}, {
  path: 'modal',
  component: modalPage,
  meta: {
    title: '弹窗组件'
  }
}, {
  path: 'omit',
  component: PageOmit,
  meta: {
    title: '省略组件'
  }
}, {
  path: 'pop',
  component: popPage,
  meta: {
    title: '弹出组件'
  }
}, {
  path: 'tip',
  component: tipPage,
  meta: {
    title: '提示组件'
  }
}, {
  path: 'table',
  component: tablePage,
  meta: {
    title: '表格组件'
  }
}, {
  path: 'list',
  component: listPage,
  meta: {
    title: '列表组件'
  }
}, {
  path: 'pager',
  component: pagerPage,
  meta: {
    title: '分页组件'
  }
}, {
  path: 'grid',
  component: gridPage,
  meta: {
    title: '表格布局组件'
  }
}, {
  path: 'scroller',
  component: scrollerPage,
  meta: {
    title: '滚动条组件'
  }
}, {
  path: 'tab',
  component: PageTab,
  meta: {
    title: '选项卡组件'
  }
}, {
  path: 'transition',
  component: TransitionPage,
  children: transitionChildren
}]

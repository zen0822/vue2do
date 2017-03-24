import total from '../component/page/component/total/total'
import btnPage from '../component/page/component/form/btn/btn'
import selectPage from '../component/page/component/form/select/select'
import checkPage from '../component/page/component/form/check/check'
import inputPage from '../component/page/component/form/input/input'

export default [{
  path: '',
  component: total,
  meta: {
    title: '全部组件'
  }
}, {
  path: 'btn',
  component: btnPage,
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
}]

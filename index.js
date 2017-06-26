import './src/lib/directive/directive.js'
import './src/scss/transition/transition.scss'
import './src/scss/common/box.scss'
import './src/scss/common/main.scss'
import './src/scss/common/common.scss'

import './src/asset/icon/iconfont.svg.js'

import pluginInstall from './src'
import cnLang from './src/language/zh-cn.json'
import { set as setConfig } from './src/config'

import btn from './src/component/base/btn/btn'
import check from './src/component/base/check/check'
import form from './src/component/base/form/form'
import fold from './src/component/base/fold/fold'
import input from './src/component/base/input/input'

import icon from './src/component/base/icon/icon'
import loading from './src/component/base/loading/loading'
import nav from './src/component/common/nav/nav'
import page from './src/component/base/page/page'
import search from './src/component/common/search/search'

import pop from './src/component/base/pop/pop'
import modal from './src/component/base/modal/modal'
import alert from './src/component/base/modal/alert'
import confirm from './src/component/base/modal/confirm'
import message from './src/component/base/message/message'
import tip from './src/component/base/message/tip'

import scroller from './src/component/base/scroller/scroller'
import list from './src/component/common/list/list'
import {
  tableComp as table,
  tableColComp as tableCol,
  tableRowComp as tableRow
} from './src/component/common/table/table'

import menu from './src/component/base/menu/menu'
import menuEle from './src/component/base/menu/menu-ele'

import shift from './src/component/base/shift/shift'
import shiftEle from './src/component/base/shift/shift-ele'

import tab from './src/component/base/tab/tab'
import tabEle from './src/component/base/tab/tab-ele'

import col from './src/component/common/layout/col/col'
import row from './src/component/common/layout/row/row'

setConfig.lang(cnLang)

export default pluginInstall

export {
  alert,
  confirm,
  modal,
  message,
  pop,
  tip,

  btn,
  check,
  fold,
  form,
  input,

  icon,
  loading,
  nav,
  page,
  scroller,
  search,

  list,
  table,
  tableCol,
  tableRow,

  menu,
  menuEle,

  shift,
  shiftEle,

  tab,
  tabEle,

  col,
  row,

  setConfig as set
}

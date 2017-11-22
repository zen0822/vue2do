import './src/lib/directive/directive.js'
import './src/scss/transition/transition.scss'
import './src/scss/common/box.scss'
import './src/scss/common/main.scss'
import './src/scss/common/common.scss'

import pluginInstall from './src'
import cnLang from './src/language/zh-cn.json'
import { set as setConfig } from './src/config'

import btn from './src/component/btn/btn'
import check from './src/component/check/check'
import form from './src/component/form/form'
import fold from './src/component/fold/fold'
import input from './src/component/input/input'

import icon from './src/component/icon/icon'
import loading from './src/component/loading/loading'
import nav from './src/component/nav/nav'
import page from './src/component/page/page'
import search from './src/component/search/search'

import bubble from './src/component/bubble/bubble'
import pop from './src/component/pop/pop'
import modal from './src/component/modal/modal'
import alert from './src/component/modal/alert'
import confirm from './src/component/modal/confirm'
import message from './src/component/message/message'
import tip from './src/component/message/tip'
import toast from './src/component/message/toast'

import scroller from './src/component/scroller/scroller'
import list from './src/component/list/list'
import {
  tableComp as table,
  tableColComp as tableCol,
  tableRowComp as tableRow
} from './src/component/table/table'

import menu from './src/component/menu/menu'
import menuEle from './src/component/menu/menu-ele'

import shift from './src/component/shift/shift'
import shiftEle from './src/component/shift/shift-ele'

import tab from './src/component/tab/tab'
import tabEle from './src/component/tab/tab-ele'

import col from './src/component/col/col'
import row from './src/component/row/row'

import fadeTransition from './src/component/transition/fade'
import foldTransition from './src/component/transition/fold'
import slideTransition from './src/component/transition/slide'
import ripTransition from './src/component/transition/rip'
import zoomTransition from './src/component/transition/zoom'

setConfig.lang(cnLang)

export default pluginInstall

export {
  alert,
  bubble,
  confirm,
  modal,
  message,
  pop,
  tip,
  toast,

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

  fadeTransition,
  foldTransition,
  ripTransition,
  slideTransition,
  zoomTransition,

  setConfig as set
}

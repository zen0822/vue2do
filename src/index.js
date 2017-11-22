import btn from './component/btn/btn'
import check from './component/check/check'
import form from './component/form/form'
import input from './component/input/input'
import icon from './component/icon/icon'

import bubble from './component/bubble/bubble'
import modal from './component/modal/modal'
import pop from './component/pop/pop'
import message from './component/message/message'

import code from './component/code/code'
import loading from './component/loading/loading'
import nav from './component/nav/nav'

import page from './component/page/page'
import scroller from './component/scroller/scroller'
import search from './component/search/search'

import {
  foldComp as fold,
  foldTitleComp as foldTitle,
  foldContentComp as foldContent
} from './component/fold/fold'

import list from './component/list/list'
import {
  tableComp as table,
  tableColComp as tableCol,
  tableRowComp as tableRow
} from './component/table/table'

import menu from './component/menu/menu'
import menuEle from './component/menu/menu-ele'

import shift from './component/shift/shift'
import shiftEle from './component/shift/shift-ele'

import tab from './component/tab/tab'
import tabEle from './component/tab/tab-ele'

import col from './component/col/col'
import row from './component/row/row'

import fadeTransition from './component/transition/fade'
import foldTransition from './component/transition/fold'
import slideTransition from './component/transition/slide'
import ripTransition from './component/transition/rip'
import zoomTransition from './component/transition/zoom'

const compHub = [
  btn,
  bubble,
  check,
  code,
  form,
  fold,
  foldTitle,
  foldContent,
  modal,
  message,
  nav,
  input,
  icon,
  list,
  loading,
  pop,
  page,
  menu,
  menuEle,
  scroller,
  shift,
  shiftEle,
  search,
  tab,
  tabEle,
  col,
  row,
  table,
  tableRow,
  tableCol,

  fadeTransition,
  foldTransition,
  ripTransition,
  slideTransition,
  zoomTransition
]

const component = {
  install(Vue, { prefix = 'z' } = {}) {
    compHub.forEach((item) => {
      Vue.component(`${prefix}-${item.name}`, item)
    })
  }
}

export default component

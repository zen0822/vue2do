import btn from 'src/component/base/btn/btn'
import check from 'src/component/base/check/check'
import form from 'src/component/base/form/form'
import input from 'src/component/base/input/input'
import icon from 'src/component/base/icon/icon'
import loading from 'src/component/base/loading/loading'
import menu from 'src/component/common/menu/menu'
import page from 'src/component/base/page/page'
import pop from 'src/component/base/pop/pop'
import scroller from 'src/component/base/scroller/scroller'

import {
  foldComp as fold,
  foldTitleComp as foldTitle,
  foldContentComp as foldContent
} from 'src/component/base/fold/fold'

import list from 'src/component/common/list/list'
import {
  tableComp as table,
  tableColComp as tableCol,
  tableRowComp as tableRow
} from 'src/component/common/table/table'

import select from 'src/component/base/select/select'
import selectEle from 'src/component/base/select/select-ele'

import shift from 'src/component/base/shift/shift'
import shiftEle from 'src/component/base/shift/shift-ele'

import tab from 'src/component/base/tab/tab'
import tabEle from 'src/component/base/tab/tab-ele'

import col from 'src/component/common/layout/col/col'
import row from 'src/component/common/layout/row/row'

const compHub = [
  btn,
  check,
  form,
  fold,
  foldTitle,
  foldContent,
  menu,
  input,
  icon,
  list,
  loading,
  pop,
  select,
  selectEle,
  scroller,
  shift,
  shiftEle,
  tab,
  tabEle,
  col,
  row,
  table,
  tableRow,
  tableCol
]

const component = {
  install(Vue, opt) {
    compHub.forEach((item) => {
      Vue.component(`${opt.prefix}-${item.name}`, item)
    })
  }
}

export default component

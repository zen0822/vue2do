import './src/lib/directive/directive.js'
import './src/scss/transition/transition.scss'
import './src/scss/common/box.scss'
import './src/scss/common/main.scss'
import './src/scss/common/common.scss'

import pluginInstall from './src'
import cnLang from './src/language/zh-cn.json'
import { set as setConfig } from './src/config'

import alert from './src/component/Modal/alert'
import confirm from './src/component/Modal/confirm'
import tip from './src/component/Message/tip'
import toast from './src/component/Message/toast'

import Btn from './src/component/Btn/Btn'
import Check from './src/component/Check/Check'
import Form from './src/component/Form/Form'

import Fold from './src/component/Fold/Fold'
import FoldTitle from './src/component/Fold/FoldTitle'
import FoldContent from './src/component/Fold/FoldContent'

import Input from './src/component/Input/Input'
import Icon from './src/component/Icon/Icon'
import Loading from './src/component/Loading/Loading'
import Nav from './src/component/Nav/Nav'
import Page from './src/component/Page/Page'
import Search from './src/component/Search/Search'

import Bubble from './src/component/Bubble/Bubble'
import Pop from './src/component/Pop/Pop'
import Modal from './src/component/Modal/Modal'
import Message from './src/component/Message/Message'

import Scroller from './src/component/Scroller/Scroller'
import List from './src/component/List/List'

import Table from './src/component/Table/Table'
import TableRow from './src/component/Table/TableRow'
import TableCol from './src/component/Table/TableCol'

import Menu from './src/component/Menu/Menu'
import MenuEle from './src/component/Menu/MenuEle'

import Shift from './src/component/Shift/Shift'
import ShiftEle from './src/component/Shift/ShiftEle'

import Tab from './src/component/Tab/Tab'
import TabEle from './src/component/Tab/TabEle'

import Col from './src/component/Col/Col'
import Row from './src/component/Row/Row'

import TransitionFade from './src/component/transition/fade'
import TransitionFold from './src/component/transition/fold'
import TransitionSlide from './src/component/transition/slide'
import TransitionRip from './src/component/transition/rip'
import TransitionZoom from './src/component/transition/zoom'

setConfig.lang(cnLang)

export default pluginInstall

export {
  alert,
  confirm,
  tip,
  toast,

  Bubble,
  Modal,
  Message,
  Pop,

  Btn,
  Check,

  Fold,
  FoldTitle,
  FoldContent,

  Form,
  Input,

  Icon,
  Loading,
  Nav,
  Page,
  Scroller,
  Search,

  List,
  Table,
  TableCol,
  TableRow,

  Menu,
  MenuEle,

  Shift,
  ShiftEle,

  Tab,
  TabEle,

  Col,
  Row,

  TransitionFade,
  TransitionFold,
  TransitionRip,
  TransitionSlide,
  TransitionZoom,

  setConfig as set
}

import './lib/directive/directive.js'
import './scss/transition.scss'
import './scss/common/main.scss'
import './scss/util.scss'
import './scss/grid.scss'

import { set as setConfig } from './config'

import alert from './module/Modal/alert'
import confirm from './module/Modal/confirm'
import tip from './module/Message/tip'
import toast from './module/Message/toast'
import tooltip from './module/Bubble/tooltip'

import Btn from './module/Btn/Btn'
import Check from './module/Check/Check'
import Form from './module/Form/Form'
import Input from './module/Input/Input'
import Icon from './module/Icon/Icon'
import Img from './module/Img/Img'
import Upload from './module/Upload/Upload'

import Bubble from './module/Bubble/Bubble'
import Modal from './module/Modal/Modal'
import Pop from './module/Pop/Pop'
import Message from './module/Message/Message'

import Fold from './module/Fold/Fold'
import FoldTitle from './module/Fold/FoldTitle'
import FoldContent from './module/Fold/FoldContent'

import Table from './module/Table/Table'
import TableRow from './module/Table/TableRow'
import TableCol from './module/Table/TableCol'

import Menu from './module/Menu/Menu'
import MenuEle from './module/Menu/MenuEle'

import Shift from './module/Shift/Shift'
import ShiftEle from './module/Shift/ShiftEle'

import Select from './module/Select/Select'
import SelectEle from './module/Select/SelectEle'

import Tab from './module/Tab/Tab'
import TabEle from './module/Tab/TabEle'

import Col from './module/Col/Col'
import Row from './module/Row/Row'

import Capture from './module/Capture/Capture'
import Code from './module/Code/Code'
import Crop from './module/Crop/Crop'
import Loading from './module/Loading/Loading'
import List from './module/List/List'
import Nav from './module/Nav/Nav'
import Omit from './module/Omit/Omit'
import Page from './module/Page/Page'
import Scroller from './module/Scroller/Scroller'
import Search from './module/Search/Search'

import MotionFade from './module/MotionFade/MotionFade'
import MotionFold from './module/MotionFold/MotionFold'
import MotionRip from './module/MotionRip/MotionRip'
import MotionSlide from './module/MotionSlide/MotionSlide'
import MotionZoom from './module/MotionZoom/MotionZoom'

const compHub = [
  Btn,
  Bubble,
  Capture,
  Check,
  Code,
  Crop,
  Form,
  Fold,
  FoldTitle,
  FoldContent,
  Icon,
  Img,
  Input,
  List,
  Loading,
  Omit,
  Pop,
  Page,
  Message,
  Menu,
  Modal,
  MenuEle,
  MotionFade,
  MotionFold,
  MotionRip,
  MotionSlide,
  MotionZoom,
  Nav,
  Scroller,
  Search,
  Select,
  SelectEle,
  Shift,
  ShiftEle,
  Tab,
  TabEle,
  Col,
  Row,
  Table,
  TableRow,
  TableCol,
  Upload
]

const install = (Vue, {
  prefix = 'z'
} = {}) => {
  compHub.forEach((item) => {
    let compName = ''

    // FlodEle -> -fold-ele
    if (item.name) {
      compName = item.name.replace(/([A-Z])/g, '-$1').toLowerCase()
    }

    Vue.component(`${prefix}${compName}`, item)
  })
}

export {
  alert,
  confirm,
  tip,
  toast,
  tooltip,

  Bubble,
  Btn,
  Capture,
  Check,
  Col,
  Crop,
  Form,
  FoldTitle,
  FoldContent,
  Input,
  Icon,
  Loading,
  List,
  Message,
  Menu,
  MenuEle,
  Modal,
  Nav,
  Omit,
  Page,
  Pop,
  Fold,
  Row,
  Scroller,
  Search,
  Select,
  SelectEle,
  Shift,
  ShiftEle,
  Tab,
  TabEle,
  Table,
  TableCol,
  TableRow,
  Upload,

  MotionFade,
  MotionFold,
  MotionRip,
  MotionSlide,
  MotionZoom,

  setConfig as set,
  install
}

export default install

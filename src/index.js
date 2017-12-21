import Btn from './component/Btn/Btn'
import Check from './component/Check/Check'
import Form from './component/Form/Form'
import Input from './component/Input/Input'
import Icon from './component/Icon/Icon'

import Bubble from './component/Bubble/Bubble'
import Modal from './component/Modal/Modal'
import Pop from './component/Pop/Pop'
import Message from './component/Message/Message'

import Code from './component/Code/Code'
import Loading from './component/Loading/Loading'
import Nav from './component/Nav/Nav'

import Omit from './component/Omit/Omit'
import Page from './component/Page/Page'
import Scroller from './component/Scroller/Scroller'
import Search from './component/Search/Search'

import Fold from './component/Fold/Fold'
import FoldTitle from './component/Fold/FoldTitle'
import FoldContent from './component/Fold/FoldContent'

import List from './component/List/List'

import Table from './component/Table/Table'
import TableRow from './component/Table/TableRow'
import TableCol from './component/Table/TableCol'

import Menu from './component/Menu/Menu'
import MenuEle from './component/Menu/MenuEle'

import Shift from './component/Shift/Shift'
import ShiftEle from './component/Shift/ShiftEle'

import Tab from './component/Tab/Tab'
import TabEle from './component/Tab/TabEle'

import Col from './component/Col/Col'
import Row from './component/Row/Row'

import MotionFade from './component/MotionFade/MotionFade'
import MotionFold from './component/MotionFold/MotionFold'
import MotionRip from './component/MotionRip/MotionRip'
import MotionSlide from './component/MotionSlide/MotionSlide'
import MotionZoom from './component/MotionZoom/MotionZoom'

const compHub = [
  Btn,
  Bubble,
  Check,
  Code,
  Form,
  Fold,
  FoldTitle,
  FoldContent,
  Input,
  Icon,
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
  Shift,
  ShiftEle,
  Search,
  Tab,
  TabEle,
  Col,
  Row,
  Table,
  TableRow,
  TableCol
]

const component = {
  install(Vue, {
    prefix = 'z'
  } = {}) {
    compHub.forEach((item) => {
      Vue.component(`${prefix}-${item.name}`, item)
    })
  }
}

export default component

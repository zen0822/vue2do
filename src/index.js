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

import Page from './component/Page/Page'
import Scroller from './component/Scroller/Scroller'
import Search from './component/Search/Search'

import Fold from './src/component/Fold/Fold'
import FoldTitle from './src/component/Fold/FoldTitle'
import FoldContent from './src/component/Fold/FoldContent'

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

import TransitionFade from './component/transition/fade'
import TransitionFold from './component/transition/fold'
import TransitionSlide from './component/transition/slide'
import TransitionRip from './component/transition/rip'
import TransitionZoom from './component/transition/zoom'

const compHub = [
  Btn,
  Bubble,
  Check,
  Code,
  Form,
  Fold,
  FoldTitle,
  FoldContent,
  Modal,
  Message,
  Nav,
  Input,
  Icon,
  List,
  Loading,
  Pop,
  Page,
  Menu,
  MenuEle,
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
  TableCol,
  TransitionFade,
  TransitionFold,
  TransitionRip,
  TransitionSlide,
  TransitionZoom
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

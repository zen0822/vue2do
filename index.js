import './src/lib/directive/directive.js'
import './src/scss/transition.scss'
import './src/scss/common/main.scss'
import './src/scss/util.scss'
import './src/scss/grid.scss'

import pluginInstall from './src'
import { set as setConfig } from './src/config'

import alert from './src/component/Modal/alert'
import confirm from './src/component/Modal/confirm'
import tip from './src/component/Message/tip'
import toast from './src/component/Message/toast'
import tooltip from './src/component/Bubble/tooltip'

import Btn from './src/component/Btn/Btn'
import Bubble from './src/component/Bubble/Bubble'
import Col from './src/component/Col/Col'
import Check from './src/component/Check/Check'
import Form from './src/component/Form/Form'
import Fold from './src/component/Fold/Fold'
import FoldTitle from './src/component/Fold/FoldTitle'
import FoldContent from './src/component/Fold/FoldContent'
import Input from './src/component/Input/Input'
import Icon from './src/component/Icon/Icon'
import List from './src/component/List/List'
import Loading from './src/component/Loading/Loading'
import Message from './src/component/Message/Message'
import Menu from './src/component/Menu/Menu'
import MenuEle from './src/component/Menu/MenuEle'
import Modal from './src/component/Modal/Modal'
import Nav from './src/component/Nav/Nav'
import Omit from './src/component/Omit/Omit'
import Page from './src/component/Page/Page'
import Pop from './src/component/Pop/Pop'
import Row from './src/component/Row/Row'
import Scroller from './src/component/Scroller/Scroller'
import Search from './src/component/Search/Search'
import Select from './src/component/Select/Select'
import SelectEle from './src/component/Select/SelectEle'
import Shift from './src/component/Shift/Shift'
import ShiftEle from './src/component/Shift/ShiftEle'
import Tab from './src/component/Tab/Tab'
import TabEle from './src/component/Tab/TabEle'
import Table from './src/component/Table/Table'
import TableRow from './src/component/Table/TableRow'
import TableCol from './src/component/Table/TableCol'
import Upload from './src/component/Upload/Upload'

import MotionFade from './src/component/MotionFade/MotionFade'
import MotionFold from './src/component/MotionFold/MotionFold'
import MotionRip from './src/component/MotionRip/MotionRip'
import MotionSlide from './src/component/MotionSlide/MotionSlide'
import MotionZoom from './src/component/MotionZoom/MotionZoom'

export default pluginInstall

export {
  alert,
  confirm,
  tip,
  toast,
  tooltip,

  Bubble,
  Btn,
  Check,
  Col,
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
  pluginInstall as install
}

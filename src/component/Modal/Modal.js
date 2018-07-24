/**
 * modal 模态框组件
 *
 * @prop commit - 当是 full 类型的时候，
 *                不用确认直接提交的模态框，默认为否
 * @prop header - 弹窗头部标题
 * @prop message - 模态框信息
 * @prop size - 模态框宽度尺寸（S | M | L）
 *
 * @prop okCb - 确定的回调函数，布尔值为 false 则执行默认的回掉函数，否则如果是函数就执行，不是就不执行
 * @prop noCb - 同上的取消回调函数
 * @prop okBtn - 确定按钮名字
 * @prop noBtn - 取消按钮名字
 * @prop noBtnDisplay - 取消按钮是否显示
 *
 * @prop headerDisplay - 是否显示弹窗头部
 * @prop footerDisplay - 是否显示弹窗底部
 *
 * @prop height - 弹窗内容的高度 (Number | 'auto' | '100%')
 * @prop type - 弹窗类型（full | alert | confirm | simple | long）
 *
 * @slot - 弹窗的主体内容
 *
 * @event ok - 点击确定按钮
 * @event no - 点击取消按钮
 * @event show - 显示之后事件
 * @event hide - 隐藏之后事件
 */

import './Modal.scss'
import './Modal.m.scss'
import './Modal.material.scss'
import './Modal.bootstrap.scss'

import render from './Modal.render'
import baseMixin from '../../mixin/base'
import apiMixin from './Modal.api'

import Pop from '../Pop/Pop'
import Btn from '../Btn/Btn'
import Icon from '../Icon/Icon'
import Scroller from '../Scroller/Scroller'
import Row from '../Row/Row'
import Col from '../Col/Col'

import MotionFade from '../MotionFade/MotionFade'

import {
  handleEleDisplay
} from '../../util/dom/prop'

const TYPE_ALERT = 'alert'
const TYPE_CONFIRM = 'confirm'
const TYPE_TIP = 'tip'

const TIP_SHOW_TIME = 1500

const modalComp = {
  name: 'Modal',

  render,

  mixins: [baseMixin, apiMixin],

  components: {
    btn: Btn,
    icon: Icon,
    pop: Pop,
    scroller: Scroller,
    row: Row,
    column: Col,
    'motion-fade': MotionFade
  },

  props: {
    commit: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'simple'
    },
    size: {
      type: String,
      default: 'S',
      validator(val) {
        return ['s', 'm', 'l'].includes(val.toLowerCase())
      }
    },
    header: {
      type: String,
      default: ''
    },
    okCb: {
      type: [Function, Boolean],
      default: false
    },
    noCb: {
      type: [Function, Boolean],
      default: false
    },
    okBtn: {
      type: String,
      default: '确定'
    },
    noBtn: {
      type: String,
      default: '取消'
    },
    message: {
      type: String,
      default: ''
    },
    headerDisplay: {
      type: Boolean,
      default () {
        return undefined
      }
    },
    headerNoBtnDisplay: {
      type: Boolean,
      default: false
    },
    noBtnDisplay: {
      type: Boolean,
      default: false
    },
    footerDisplay: {
      type: Boolean,
      default () {
        return undefined
      }
    },
    height: [Number, String]
  },

  data: () => {
    return {
      pointStart: {
        x: 0,
        y: 0
      },
      state: {
        ui: '',
        theme: ''
      },
      isMousedown: false,
      modalDisplay: false,
      modalMessage: '',
      modalHeader: '',
      showCb: null, // 模态框显示之后的回调函数
      hideCb: null, // 模态框隐藏之后的回调函数
      okCbFun: null,
      noCbFun: null,
      hasScroller: false // scroller 是否有滚动条
    }
  },

  computed: {
    cPrefix() { // 组件类名的前缀
      return `${this.compPrefix}-modal`
    },
    uiClass() {
      return `ui-${this.state.ui}`
    },
    themeClass() {
      return `theme-${this.state.theme}`
    },
    UIMaterial() {
      return this.state.ui === 'material'
    },
    headerClass() { // 组件的 header 的 class 名字
      return {
        [`${this.cPrefix}-no-header`]: !this.modalHeaderDisplay,
        [`${this.cPrefix}-no-header-title`]: !this.modalHeader
      }
    },
    footerClass() { // 组件的 footer 的 class 名字
      return {
        [`${this.cPrefix}-no-footer`]: !this.modalFooterDisplay
      }
    },
    isFull() { // 是否是 full modal
      return this.type === 'full'
    },
    isSimple() { // 是否是 simple modal
      return this.type === 'simple'
    },
    isBiggerFull() { // 判断是否在中大型设备并且是 full 模态框
      return (this.isFull &&
        (
          this.deviceSize === 'm' ||
          this.deviceSize === 'l' ||
          this.deviceSize === 'xl'
        )
      ) || !this.isFull
    },
    modalHeaderDisplay() { // 模态框的头部显示状态
      if (this.headerDisplay !== undefined) {
        return this.headerDisplay
      }

      switch (this.type) {
        case 'full':
          return true
        case 'simple':
          return false
        default:
          return !!this.modalHeader
      }
    },
    modalFooterDisplay() { // 模态框的尾部显示状态
      if (this.footerDisplay !== undefined) {
        return this.footerDisplay
      }

      switch (this.type) {
        case 'alert':
        case 'confirm':
          return true
        case 'full':
          return this.isBiggerFull
        case 'simple':
          return false
        default:
          return true
      }
    },
    modalHeight() { // 模态框的内容的高度
      if (this.height) {
        return this.height
      }

      switch (this.type) {
        case 'full':
          return this.isBiggerFull ? 300 : '100%'
        case 'simple':
          return 150
        default:
          return 120
      }
    }
  },

  methods: {
    _initComp() {
      this._initModal()
    },

    _binder() {
      this.$refs.pop.$on('showing', () => {
        this.UIMaterial && this.$refs.scroller.initScroller()
        this.$refs.pop.computePosition()
      })

      this.$refs.pop.$on('show', (opt) => {
        this.showCb && this.showCb()

        return this.$emit('show', {
          ...opt,
          emitter: this
        })
      })

      this.$refs.pop.$on('hide', (opt) => {
        this.hideCb && this.hideCb()

        return this.$emit('show', {
          ...opt,
          emitter: this
        })
      })
    },

    _initModal() {
      this.$refs.scroller && this.$refs.scroller.$on('yBarChange', ({
        hasScroller
      }) => {
        this.hasScroller = hasScroller
      })
    },

    /**
     * 设置数据
     */
    _setDataOpt() {
      this.modalMessage = this.message
      this.modalHeader = this.header

      this.okCbFun = this.okCb
      this.noCbFun = this.noCb

      this.state.ui = this.ui
      this.state.theme = this.theme
    },

    /**
     * 点击模态框背景的句柄
     */
    _handlerClickBg() {
      return this.hide()
    }
  },

  updated() {
    this._setDataOpt()
  }
}

export default modalComp

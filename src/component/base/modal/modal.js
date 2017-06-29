/**
 * modal 模态框组件
 *
 * @prop commit - 当是 full 类型的时候，
 *                不用确认直接提交的模态框，默认为否
 * @prop header - 弹窗头部标题
 * @prop message - 模态框信息
 *
 * @prop okBtn - 确定按钮名字
 * @prop noBtn - 取消按钮名字
 * @prop okBtnDisplay - 确定按钮是否显示
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
 */

import './modal.scss'
import './modal.m.scss'

import render from './modal.render'
import baseMixin from '../../../mixin/base'
import apiMixin from './modal.api'

import popComp from '../../base/pop/pop'
import btnComp from '../../base/btn/btn'
import iconComp from '../../base/icon/icon'
import scrollerComp from '../../base/scroller/scroller'
import rowComp from '../../common/layout/row/row'
import colComp from '../../common/layout/col/col'

import fadeTransition from '../../transition/fade'
import noTransition from '../../transition/no'

const TYPE_ALERT = 'alert'
const TYPE_CONFIRM = 'confirm'
const TYPE_TIP = 'tip'

const TIP_SHOW_TIME = 1500

const modalComp = {
  name: 'modal',

  render,

  mixins: [baseMixin, apiMixin],

  components: {
    btn: btnComp,
    icon: iconComp,
    pop: popComp,
    scroller: scrollerComp,
    row: rowComp,
    column: colComp,
    'fade-transition': fadeTransition,
    'no-transition': noTransition
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-modal`
    },
    // 组件的 header 的 class 名字
    headerClass() {
      return {
        [`${this.cPrefix}-no-header`]: !this.headerDisplay,
        [`${this.cPrefix}-no-header-title`]: !this.modalHeader
      }
    },
    // 组件的 footer 的 class 名字
    footerClass() {
      return { [`${this.cPrefix}-no-footer`]: !this.footerDisplay }
    },
    // 是否是 full modal
    isFull() {
      return this.type === 'full'
    },
    // 是否是 simple modal
    isSimple() {
      return this.type === 'simple'
    },
    // 判断是否在中大型设备并且是 full 模态框
    isBiggerFull() {
      return this.isFull && this.deviceRange > 575 || !this.isFull
    },
    // 模态框的头部显示状态
    modalHeaderDisplay() {
      if (!this.headerDisplay) {
        return false
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
    // 模态框的尾部显示状态
    modalFooterDisplay() {
      if (!this.footerDisplay) {
        return false
      }

      switch (this.type) {
        case 'full':
          return this.isBiggerFull
        case 'simple':
          return false
        default:
          return true
      }
    },
    // 模态框的内容的高度
    modalHeight() {
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

  props: {
    commit: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'simple'
    },
    header: {
      type: String,
      default: ''
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
      default: true
    },
    headerNoBtnDisplay: {
      type: Boolean,
      default: true
    },
    noBtnDisplay: {
      type: Boolean,
      default: true
    },
    footerDisplay: {
      type: Boolean,
      default: true
    },
    height: [Number, String]
  },

  data: () => {
    return {
      pointStart: {
        x: 0,
        y: 0
      },
      isMousedown: false,
      modalDisplay: false,
      modalMessage: '',
      modalHeader: '',
      // scroller 是否有滚动条
      hasScroller: false
    }
  },

  methods: {
    _init() {
      this._initModal()
    },

    _initModal() {
      this.$refs.scroller.$on('changeScroller', ({ scrollerHeight }) => {
        let popVisibility = this.$refs.pop.$el.style.visibility
        let popDisplay = this.$refs.pop.$el.style.display

        let elVisibility = this.$el.style.visibility
        let elDisplay = this.$el.style.display

        this.$refs.pop.$el.style.visibility = 'hidden'
        this.$refs.pop.$el.style.display = ''

        this.$el.style.visibility = 'hidden'
        this.$el.style.display = ''

        this.$refs.pop.computePosition()

        this.$refs.pop.$el.style.visibility = popVisibility
        this.$refs.pop.$el.style.display = popDisplay

        this.$el.style.visibility = elVisibility
        this.$el.style.display = elDisplay
      })

      this.$refs.scroller.$on('changeYBar', ({ hasScroller }) => {
        this.hasScroller = hasScroller
      })
    },

    /**
     * 设置数据
     */
    _setDataOpt() {
      this.modalMessage = this.message
      this.modalHeader = this.header
    }
  }
}

export default modalComp

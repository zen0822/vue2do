/**
 * modal 模态框组件
 *
 * @prop commit - 当是 full 类型的时候，
 *                是否作为不用确认直接提交的模态框，默认为否
 * @prop header - 弹窗头部标题
 * @prop message - 模态框信息
 * @prop okBtn - 确定按钮名字
 * @prop noBtn - 取消按钮名字
 * @prop okBtnDisplay - 确定按钮是否显示
 * @prop noBtnDisplay - 取消按钮是否显示
 * @prop headerDisplay - 是否显示弹窗头部
 * @prop footerDisplay - 是否显示弹窗底部
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

  mixins: [baseMixin],

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
    // 判断是否在中大型设备并且是 full 模态框
    isBiggerFull() {
      return this.isFull && this.deviceRange > 575
    }
  },

  props: {
    commit: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: TYPE_CONFIRM
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
    }
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
    },

    /**
     * 显示pop
     *
     * @param {Number} - 当前页码
     * @return {Object}
     */
    show() {
      this.modalDisplay = true
      this.$refs.pop.show()

      return this
    },

    /**
     * 隐藏pop
     *
     * @return {Object}
     */
    hide() {
      this.$refs.pop.hide({
        cb: () => {
          this.modalDisplay = false
          this.isMousedown = false
        }
      })

      return this
    },

    /**
     * 鼠标mouseDown 弹窗头部触发的事件
     *
     * @return {Object}
     */
    mouseDown(event) {
      this.isMousedown = true

      this.pointStart = {
        x: event.clientX,
        y: event.clientY
      }

      return this
    },

    /**
     * 鼠标mouseMove 弹窗头部触发的事件
     *
     * @return {Object, Boolean}
     */
    mouseMove(event) {
      event.preventDefault()

      if (!this.isMousedown) {
        return false
      }

      let $this = this.$el.querySelector('.' + this.xclass('pop'))
      let styleHub = getComputedStyle($this)
      let top = parseFloat(styleHub.top, 10)
      let left = parseFloat(styleHub.left, 10)

      this.$refs.pop.position({
        top: top + event.clientY - this.pointStart.y,
        left: left + event.clientX - this.pointStart.x
      })

      this.pointStart = {
        x: event.clientX,
        y: event.clientY
      }

      return this
    },

    /**
     * 鼠标mouseUp 弹窗头部触发的事件
     *
     * @return {Object, Boolean}
     */
    mouseUp(event) {
      event.preventDefault()

      if (!this.isMousedown) {
        return false
      }

      this.isMousedown = false

      return this
    },

    /**
     * 弹窗点击确定触发的函数
     *
     * @return {Object}
     */
    ok() {
      if (this.okCb) {
        this.okCb(this)

        return this.$emit('ok')
      }

      this.hide()
    },

    /**
     * 弹窗点击取消触发的函数
     *
     * @return {Object}
     */
    no() {
      if (this.noCb) {
        this.noCb(this)

        return this.$emit('no')
      }

      this.hide()
    },

    /**
     * 获取 / 设置 弹窗的title名
     *
     * @return {Object, Boolean}
     */
    title(text) {
      if (text === '' || text) {
        this.modalHeader = text
      }

      return this
    },

    /**
     * alert, confirm 弹窗的文字信息
     *
     * @param {String} - 需要设置的值
     * @return {Object, String}
     */
    info(text) {
      if (text === '' || text) {
        this.modalMessage = text
      }

      return this
    },

    /**
     * alert, confirm 设置弹窗的确定按钮的回调函数
     * 显示完 tip 的回调函数
     *
     * @param {Function}
     * @return {Object}
     */
    setOkCb(cb) {
      this.okCb = cb

      return this
    },

    /**
     * alert, confirm 设置弹窗的确定按钮的回调函数
     *
     * @param {Function}
     * @return {Object}
     */
    setNoCb(cb) {
      this.noCb = cb

      return this
    }
  }
}

export default modalComp

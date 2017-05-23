/**
 * pop 组件
 *
 * @props headerName - 弹窗头部名字
 * @props message - alert信息
 * @props okBtnName - 确定按钮名字
 * @props noBtnName - 取消按钮名字
 * @props noBtnDisplay - 取消按钮是否显示
 * @props headerNoBtnDisplay - 弹窗头部X是否显示
 * @props headerDisplay - 是否显示弹窗头部
 * @props footerDisplay - 是否显示弹窗底部
 * @props pop - 纯粹的自定义弹窗
 * @props type - 弹窗类型
 * @props noClickBgHide - 不启动点击背景隐藏弹窗
 *
 * @slot - 弹窗的主体内容
 *
 * @events ok - 点击确定按钮
 * @events no - 点击取消按钮 *
 */

import './pop.scss'
import './pop.m.scss'

import render from './pop.render'
import btnComp from '../../base/btn/btn'
import iconComp from '../../base/icon/icon'
import scrollerComp from '../../base/scroller/scroller'
import baseMixin from '../../../mixin/base'

const TYPE_ALERT = 'alert'
const TYPE_CONFIRM = 'confirm'
const TYPE_TIP = 'tip'

const TIP_SHOW_TIME = 1500

const popComp = {
  name: 'pop',

  render,

  mixins: [baseMixin],

  components: {
    btn: btnComp,
    icon: iconComp,
    scroller: scrollerComp
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-pop`
    },
    isAlert() {
      return this.type === TYPE_ALERT
    },
    isTip() {
      return this.type === TYPE_TIP
    },
    // 组件的 stage 的 class 名字
    stageClass() {
      return [{
        [`${this.cPrefix}-tip-stage`]: this.isTip
      }, {
        [`${this.cPrefix}-alert-stage`]: this.isAlert
      }]
    },
    // 组件的 header 的 class 名字
    headerClass() {
      return {
        [`${this.cPrefix}-no-header`]: !this.headerDisplay,
        [`${this.cPrefix}-no-header-title`]: !this.popHeaderName
      }
    },
    // 组件的 footer 的 class 名字
    footerClass() {
      return { [`${this.cPrefix}-no-footer`]: !this.footerDisplay }
    }
  },

  props: {
    type: {
      type: String,
      default: TYPE_CONFIRM
    },
    headerName: {
      type: String,
      default: ''
    },
    okBtnName: {
      type: String,
      default: '确定'
    },
    noBtnName: {
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
    pop: {
      type: Boolean,
      default: false
    },
    noClickBgHide: {
      type: Boolean,
      default: false
    }
  },

  data: () => {
    return {
      pointStart: {
        x: 0,
        y: 0
      },
      isMousedown: false,
      popDisplay: false,
      popMessage: '',
      popHeaderName: '',
      okCb: 'undefined',
      onCb: 'undefined'
    }
  },

  methods: {
    /**
     * 设置数据
     */
    _setDataOpt() {
      this.popMessage = this.message
      this.popHeaderName = this.headerName
    },

    /**
     * 显示pop
     *
     * @param {Number} - 当前页码
     * @return {Object}
     */
    show(cb) {
      if (this.isTip) {
        this.popDisplay = true
        cb && cb()

        setTimeout(() => {
          this.popDisplay = false

          if (this.okCb) {
            this.okCb()
          }
        }, TIP_SHOW_TIME)
      } else {
        this.popDisplay = true
      }

      return this
    },

    /**
     * 隐藏pop
     *
     * @return {Object}
     */
    hide(event) {
      event && event.stopPropagation()

      if (this.isTip) {
        return this
      }

      this.popDisplay = false
      this.isMousedown = false

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
      if (!this.isMousedown) {
        return false
      }

      let $this = this.$el.querySelector('.' + this.xclass('stage'))
      let styleHub = getComputedStyle($this)
      let top = parseFloat(styleHub.top, 10)
      let left = parseFloat(styleHub.left, 10)

      $this.style.top = `${top + event.clientY - this.pointStart.y}px`
      $this.style.left = `${left + event.clientX - this.pointStart.x}px`

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
    cancel() {
      if (this.noCb) {
        this.noCb(this)

        return this.$emit('no')
      }

      this.hide()
    },

    /**
     * 返回弹窗的title名
     *
     * @return {Object, Boolean}
     */
    title(text) {
      if (text === '' || text) {
        this.popHeaderName = text
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
        this.popMessage = text
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

export default popComp

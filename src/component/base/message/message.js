/**
 * message 提示组件
 *
 * @prop message - 信息
 * @prop direction - 信息出现方向
 * @prop type - 弹窗类型(pop | bar)
 *
 * @slot - 弹窗的主体内容
 *
 * @event ok - 点击确定按钮
 * @event no - 点击取消按钮
 */

import './message.scss'
import './message.m.scss'

import render from './message.render'
import baseMixin from '../../../mixin/base'

import popComp from '../../base/pop/pop'
import btnComp from '../../base/btn/btn'
import iconComp from '../../base/icon/icon'

const TIP_DISPLAY_TIME = 1500

const messageComp = {
  name: 'message',

  render,

  mixins: [baseMixin],

  components: {
    btn: btnComp,
    icon: iconComp,
    pop: popComp
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-message`
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
      default: 'pop'
    },
    direction: {
      type: String,
      default: 'top'
    },
    message: {
      type: String,
      default: ''
    }
  },

  data: () => {
    return {
      messageDisplay: false
    }
  },

  methods: {
    _init() {
      this._initmessage()
    },

    _initmessage() {
      this.$refs.pop.initPosition()
    },

    /**
     * 设置数据
     */
    _setDataOpt() {
      this.messageMessage = this.message
    },

    /**
     * 显示pop
     *
     * @param {Number} - 当前页码
     * @return {Object}
     */
    show() {
      this.messageDisplay = true
      this.$refs.pop.show({
        cb: () => {
          setTimeout(() => {
            this.hide()
          }, TIP_DISPLAY_TIME)
        }
      })

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
          this.messageDisplay = false
          this.isMousedown = false
        }
      })

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
        this.messageMessage = text
      }

      return this
    }
  }
}

export default messageComp

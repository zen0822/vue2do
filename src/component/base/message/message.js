/**
 * message 提示组件
 *
 * @prop message - 信息
 * @prop direction - 信息出现方向
 * @prop type - 信息(pop | bar | header)
 *
 * @slot - 弹窗的主体内容
 *
 * @event show - 显示之后的钩子函数
 * @event hide - 隐藏之后的钩子函数
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
      // 需要展示的信息
      infoMessage: '',
      // 信息类型
      messageType: '',
      messageDisplay: false,
      hideCb: null
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
      this.infoMessage = this.message
    },

    /**
     * 显示
     *
     * @param {Object} opt - 选项
     *                       {Function} cb - 显示之后的回调函数
     * @return {Promise}
     */
    show({ cb } = {}) {
      return this.$nextTick(() => {
        this.messageDisplay = true

        this.$refs.pop.show({
          cb: () => {
            setTimeout(() => {
              this.hide()
            }, TIP_DISPLAY_TIME)

            cb && cb()

            return this.$emit('hide')
          }
        })

        return this
      })
    },

    /**
     * 隐藏pop
     *
     * @param {Object} opt - 选项
     *                       {Function} cb - 隐藏之后的回调函数
     * @return {Object}
     */
    hide({ cb } = {}) {
      this.$refs.pop.hide({
        cb: () => {
          this.messageDisplay = false
          this.isMousedown = false

          this.hideCb && this.hideCb()
          cb && cb()

          return this.$emit('hide')
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
        this.infoMessage = text
      }

      return this
    },

    /**
     * 设置各个组件的配置数据
     *
     * @param {Object} opt - 选项
     *                       {Function} hideCb - 隐藏之后的回调函数
     *                       {String} type - 组件类型
     *                       {Function} message - 需要展示的信息
     */
    set({
      hideCb,
      type = 'pop',
      message = ''
    } = {}) {
      this.infoMessage = message
      this.hideCb = hideCb
      this.messageType = type

      return this
    }
  }
}

export default messageComp

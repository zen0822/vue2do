/**
 * message 提示组件
 *
 * @prop align - 信息的两边对齐方式 （left, center, right)
 * @prop message - 信息
 * @prop direction - 信息出现方向
 * @prop position - 信息展示的位置
 * @prop type - 信息(pop | bar | header)
 *
 * @slot - 弹窗的主体内容
 *
 * @event show - 显示之后的钩子函数
 * @event hide - 隐藏之后的钩子函数
 */

import './Message.scss'
import './Message.m.scss'

import render from './Message.render'
import baseMixin from '../../mixin/base'

import Pop from '../Pop/Pop'

import {
  handleEleDisplay
} from '../../util/dom/prop'

const TIP_DISPLAY_TIME = 1500

const messageComp = {
  name: 'Message',

  render,

  mixins: [baseMixin],

  watch: {
    'align'(val) {
      this.stateAlign = val
    }
  },

  components: {
    pop: Pop
  },

  computed: {
    cPrefix() { // 组件类名的前缀
      return `${this.compPrefix}-message`
    },
    headerClass() { // 组件的 header 的 class 名字
      return {
        [`${this.cPrefix}-no-header`]: !this.headerDisplay,
        [`${this.cPrefix}-no-header-title`]: !this.popHeaderName
      }
    },
    footerClass() { // 组件的 footer 的 class 名字
      return {
        [`${this.cPrefix}-no-footer`]: !this.footerDisplay
      }
    }
  },

  props: {
    align: {
      type: String,
      default: 'left'
    },
    type: {
      type: String,
      default: 'pop'
    },
    direction: {
      type: String,
      default: 'south',
      validator(val) {
        return ['north', 'east', 'west', 'south'].includes(val)
      }
    },
    message: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'center',
      validator(val) {
        return ['top', 'right', 'bottom', 'left', 'center'].includes(val)
      }
    }
  },

  data: () => {
    return {
      stateAlign: 'left',
      stateMessage: '', // 需要展示的信息
      messageType: '', // 信息类型
      messageDisplay: false,
      hideCb: null
    }
  },

  methods: {
    _initmessage() {
      handleEleDisplay({
        element: this.$el,
        cb: () => {
          this.$refs.pop.computePosition()
        }
      })
    },

    /**
     * 设置数据
     */
    _setDataOpt() {
      this.stateMessage = this.message
      this.stateAlign = this.align
    },

    /**
     * 显示
     *
     * @param {Object} opt - 选项
     *                       {Function} cb - 显示之后的回调函数
     * @return {Promise}
     */
    show({
      cb
    } = {}) {
      this.messageDisplay = true

      return this.$nextTick(() => {
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
    hide({
      cb
    } = {}) {
      return this.$refs.pop.hide({
        cb: () => {
          this.messageDisplay = false
          this.isMousedown = false

          this.hideCb && this.hideCb()
          cb && cb()

          return this.$emit('hide')
        }
      })
    },

    /**
     * alert, confirm 弹窗的文字信息
     *
     * @param {String} - 需要设置的值
     * @return {Object, String}
     */
    info(text) {
      if (text === '' || text) {
        this.stateMessage = text
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
      message = '',
      align
    } = {}) {
      this.stateMessage = message
      this.hideCb = hideCb
      this.messageType = type
      align && (this.stateAlign = align)

      return this
    }
  }
}

export default messageComp

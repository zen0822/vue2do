/**
 * loading 组件
 * 使用自定义的loading 需要将父元素设置成 position: relative
 *
 * @prop bgDisplay - 是否显示 loading 的背景
 * @prop display - 马上显示，默认否
 * @prop size - 大小(xs, s, m, l, xl), 默认 s
 * @prop text - 等待文字
 * @prop theme - 主题
 * @prop type - 类型
 *
 */

import './Loading.scss'

import iconComp from '../Icon/Icon'
import baseMixin from '../../mixin/base'
import render from './Loading.render'

const TYPE_ROTATE = 'rotate'
const TYPE_ROTATE_2 = 'rotate2'
const TYPE_SPOT = 'spot'

export default {
  name: 'Loading',

  mixins: [baseMixin],

  render,

  components: {
    icon: iconComp
  },

  props: {
    type: {
      type: String,
      default: TYPE_ROTATE
    },

    bgDisplay: {
      type: Boolean,
      default: false
    },

    display: {
      type: Boolean,
      default: false
    },

    size: {
      type: String,
      default: 's',
      validator(val) {
        return ['xs', 's', 'm', 'l', 'xl'].includes(val.toLowerCase())
      }
    },

    text: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      stateDisplay: false
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-loading`
    },

    isRotate() {
      return this.type === TYPE_ROTATE
    },

    isRotate2() {
      return this.type === TYPE_ROTATE_2
    },

    isSpot() {
      return this.type === TYPE_SPOT
    }
  },

  methods: {
    /**
     * 显示
     * @return {Object} this - 组件
     */
    show(cb) {
      this.stateDisplay = true

      return this
    },

    /**
     * 隐藏
     * @return {Object} this - 组件
     */
    hide() {
      this.stateDisplay = false

      return this
    },

    createTimeout(cb) {
      this.clearTimeout()

      this.timeout = setTimeout(() => {
        this.timeout = null
        this.hide()

        return cb && cb()
      }, this.time)
    },

    clearTimeout() {
      let timeout = this.timeout
      if (timeout) {
        window.clearTimeout(timeout)
        this.timeout = null
      }
    }
  },

  mounted() {
    if (this.display) {
      this.show()
    }
  }
}

/**
 * loading 组件
 * 使用自定义的loading 需要将父元素设置成 position: relative
 *
 * @prop bgDisplay - 是否显示 loading 的背景
 * @prop display - 马上显示，默认否
 * @prop size - 大小(xs, s, m, l, xl), 默认 s
 * @prop theme - 主题
 * @prop type - 类型 (rotate, spot)
 */

import './Loading.scss'
import './Loading.bootstrap.scss'
import './Loading.material.scss'

import iconComp from '../Icon/Icon'
import baseMixin from '../../mixin/base'
import render from './Loading.render'

const TYPE_ROTATE = 'rotate'
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
      default: TYPE_ROTATE,
      validator(val) {
        return ['rotate', 'spot'].includes(val)
      }
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
    compClass() {
      return [
        this.cPrefix,
        `${this.cPrefix}-${this.uiClass}`,
        `${this.cPrefix}-${this.themeClass}`,
        `${this.cPrefix}-size-${this.size.toLowerCase()}`,
        {
          [`${this.cPrefix}-mark`]: this.bgDisplay
        }
      ]
    },
    isRotate() {
      return this.type === TYPE_ROTATE
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
    show() {
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
      const timeout = this.timeout
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

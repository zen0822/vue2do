/**
 * loading 组件
 * 使用自定义的loading 需要将父元素设置成 position: relative
 *
 * @props bgDisplay - 是否显示 loading 的背景
 * @props text - 等待文字
 * @props theme - 主题
 * @props type - 类型
 *
 */

import './loading.scss'

import iconComp from 'vue2/component/base/icon/icon'
import baseMixin from 'vue2/mixin/base'
import render from './loading.render'

const TYPE_ROTATE = 'rotate'
const TYPE_ROTATE_2 = 'rotate2'
const TYPE_SPOT = 'spot'

const loadingComp = {
  name: 'loading',

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

    text: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      display: false
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
      this.display = true

      return this
    },

    /**
     * 隐藏
     * @return {Object} this - 组件
     */
    hide() {
      this.display = false

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
  }
}

export default loadingComp

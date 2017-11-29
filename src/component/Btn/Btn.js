/**
 * btn 组件
 *
 * @prop ban - 禁止点击
 * @prop kind - 按钮种类
 * @prop link - 链接地址
 * @prop radius - 按钮边角得半径尺寸（none | S | M | L）
 * @prop size - 按钮大小
 * @prop submit - 提交按钮
 * @prop type - 按钮类型 (button | flat | float | outline)
 * @prop textDisplay - 是否显示按钮文字
 * @prop value - 按钮名字
 *
 * @event click - 点击btn事件
 */

import './Btn.scss'
import './Btn.device.scss'

import render from './Btn.render'
import baseMixin from '../../mixin/base'
import formMixin from '../../mixin/form'

import Loading from '../Loading/Loading'
import ripTransition from '../transition/rip'

const BTN_TYPE_LINK = 'link'
const BTN_TYPE_BUTTON = 'button'

const SIZE_S = 'S'
const SIZE_M = 'M'
const SIZE_L = 'L'

export default {
  name: 'btn',

  mixins: [baseMixin, formMixin],

  render,

  components: {
    loading: Loading,
    'rip-transition': ripTransition
  },

  props: {
    ban: {
      type: Boolean,
      default: false
    },

    kind: {
      type: String,
      default: 'primary'
    },

    link: String,

    outline: {
      type: Boolean,
      default: false
    },

    radius: {
      type: String,
      default: 's'
    },

    type: {
      type: String,
      default: BTN_TYPE_BUTTON
    },

    value: {
      type: String,
      require: true
    },

    size: {
      type: String,
      default: SIZE_S
    },

    submit: {
      type: Boolean,
      require: false
    },

    textDisplay: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      // 按钮的禁用状态
      banState: false,
      // 按钮值显示状态
      btnValueDisplay: false,
      // 是否已经创建了按钮的 loading 组件
      createdLoading: false,
      // 按钮的沦漪效果
      motion: false,
      // 不执行 focus 事件
      allowFocus: true,
      // 点击按钮的鼠标位置
      mousePoi: {
        top: 0,
        left: 0
      },
      // 判断是否在触摸屏
      inTouch: false
    }
  },

  watch: {
    ban(val) {
      this.banState = val
    }
  },

  methods: {
    _setDataOpt() {
      this.banState = this.ban
    },

    mouseup() {
      if (this.inTouch) {
        return false
      }

      if (this.banState) {
        return false
      }

      this.allowFocus = true
    },

    mousedown(event) {
      event.preventDefault()

      if (this.inTouch) {
        return false
      }

      if (this.banState) {
        return false
      }

      let el = event.currentTarget

      this.allowFocus = false
      this.mousePoi = {
        x: event.pageX - el.offsetLeft,
        y: event.pageY - el.offsetTop
      }

      this.$refs.transition.enter({
        mousePoi: {
          x: event.pageX - el.offsetLeft,
          y: event.pageY - el.offsetTop
        }
      })
    },

    focus() {
      if (this.inTouch) {
        return false
      }

      if (this.allowFocus) {
        this.motion = true
      }
    },

    blur() {
      this.motion = false
    },

    /**
     * 点击按钮
     * @return {Object} this - 组件
     */
    click(event) {
      if (this.banState) {
        return false
      }

      return this.$emit('click')
    },

    /**
     * keyup 句柄
     */
    keyup(event) {
      if (event.keyCode === 13) {
        return this.$emit('click')
      }
    },

    /**
     * 将按钮变为只读操作
     */
    banBtn() {
      this.banState = true
    },

    /**
     * 取消按钮只读状态
     */
    allowBtn() {
      this.banState = false
    },

    /**
     * 开启按钮等待功能
     */
    openLoading() {
      if (!this.createdLoading) {
        this.createdLoading = true
        this.banBtn()
      }

      this.$nextTick(() => {
        this.$refs.loading.show()
      })
    },

    /**
     * 关闭按钮等待功能
     */
    classLoading(state) {
      this.allowBtn()
      this.$refs.loading.hide()
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-btn`
    },

    isLink() {
      return !this.btnValueDisplay && this.link
    },

    isFloatBtn() {
      return this.type === 'float'
    },

    btnClass() {
      return this.xclass([
        this.themeClass,
        `kind-${this.kind}`,
        `size-${this.size.toLowerCase()}`,
        `radius-${this.radius.toLowerCase()}`,
        `type-${this.type}`
      ])
    }
  }
}

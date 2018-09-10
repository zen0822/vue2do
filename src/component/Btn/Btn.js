/**
 * btn 组件
 *
 * @prop disabled - 禁止点击
 * @prop block - 按钮的宽度是父元素的宽度, width: 100%
 * @prop link - 链接地址
 * @prop radius - 按钮边角得半径尺寸（none | S | M | L）
 * @prop size - 按钮大小
 * @prop submit - 提交按钮
 * @prop type - 按钮类型 (button | text | float | outline)
 * @prop value - 按钮名字
 *
 * @event click - 点击btn事件
 * @event keyEnter - focus 时敲击 Enter 键
 * @event focus
 * @event blur
 */

import './Btn.scss'
import './Btn.material.scss'
import './Btn.bootstrap.scss'

import {
  offset as propOffset
} from '../../util/dom/prop'

import render from './Btn.render'
import baseMixin from '../../mixin/base'
import formMixin from '../../mixin/form'

import Loading from '../Loading/Loading'
import MotionRip from '../MotionRip/MotionRip'

const BTN_TYPE_LINK = 'link'
const BTN_TYPE_BUTTON = 'button'

const SIZE_S = 'S'
const SIZE_M = 'M'
const SIZE_L = 'L'

export default {
  name: 'Btn',

  mixins: [baseMixin, formMixin],

  render,

  components: {
    loading: Loading,
    'motion-rip': MotionRip
  },

  props: {
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    link: String,
    radius: {
      type: String,
      default: 's',
      validator(val) {
        const size = val.toLowerCase()

        return ['none', 's', 'm', 'l'].includes(size)
      }
    },
    size: {
      type: String,
      default: SIZE_S,
      validator(val) {
        const size = val.toLowerCase()

        return ['s', 'm', 'l'].includes(size)
      }
    },
    submit: {
      type: Boolean,
      require: false
    },
    type: {
      type: String,
      default: BTN_TYPE_BUTTON,
      validator(val) {
        return ['button', 'float', 'text', 'outline'].includes(val)
      }
    },
    value: {
      type: String,
      require: true
    }
  },

  data() {
    return {
      stateDisabled: false, // 按钮的禁用状态
      btnValueDisplay: false, // 按钮值显示状态
      createdLoading: false, // 是否已经创建了按钮的 loading 组件
      focusing: false, // 正在 focus 中
      motion: false, // 启动按钮的沦漪效果
      allowFocus: true, // 允许执行 focus 事件
      mousePoi: { // 点击按钮的鼠标位置
        top: 0,
        left: 0
      },
      inTouch: false // 判断是否在触摸屏
    }
  },

  watch: {
    disabled(val) {
      this.stateDisabled = val
    }
  },

  computed: {
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
        this.uiClass,
        `size-${this.size.toLowerCase()}`,
        `radius-${this.radius.toLowerCase()}`,
        `type-${this.type}`
      ])
    }
  },

  methods: {
    _setDataOpt() {
      this.stateDisabled = this.disabled
    },

    mouseup(event) {
      if (this.inTouch) {
        return false
      }

      if (this.stateDisabled) {
        return false
      }

      this.allowFocus = true

      if (event.button === 0) {
        return this.click(event)
      }
    },

    /**
     * TODO: 当 IE <= 11 时，html 设置了 margin pageX 没把 margin 值算进去
     */
    mousedown(event) {
      if (this.inTouch) {
        return false
      }

      if (this.stateDisabled) {
        return false
      }

      let el = event.currentTarget

      this.allowFocus = false

      if (this.UIMaterial) {
        const elOffset = propOffset(el)

        this.mousePoi = {
          x: event.pageX - elOffset.left,
          y: event.pageY - elOffset.top
        }

        this.$refs.transition && this.$refs.transition.enter({
          mousePoi: {
            ...this.mousePoi
          }
        })
      }
    },

    focus(event) {
      if (this.stateDisabled) {
        return false
      }

      this.focusing = true

      this.$emit('focus', {
        event,
        emitter: this
      })

      if (this.inTouch) {
        return false
      }

      if (this.allowFocus) {
        this.motion = true
      }
    },

    blur(event) {
      if (this.stateDisabled) {
        return false
      }

      this.focusing = false

      this.$emit('blur', {
        event,
        emitter: this
      })

      this.motion = false
    },

    /**
     * keyup 句柄
     */
    keyup(event) {
      if (this.stateDisabled) {
        return false
      }

      if (event.keyCode === 13) {
        this.click(event)

        return this.$emit('keyEnter', {
          event,
          emitter: this
        })
      }
    },

    /**
     * click event
     */
    click(event) {
      if (this.stateDisabled) {
        return false
      }

      return this.$emit('click', {
        event,
        emitter: this
      })
    },

    /**
     * 将按钮变为只读操作
     */
    banBtn() {
      this.stateDisabled = true
    },

    /**
     * 取消按钮只读状态
     */
    allowBtn() {
      this.stateDisabled = false
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
  }
}

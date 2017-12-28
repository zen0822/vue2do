/**
 * menu 组件
 *
 * @prop store - 储存实例化的信息
 * @prop noCoverTrig - 菜单展开是不遮挡触发器，TODO： pc 上默认是不遮挡的，mobile 是默认遮挡的
 * @prop noTrig - 不使用组件自带的菜单触发器
 * @prop height - 菜单高度，默认是 auto
 *                1、auto：根据菜单内容的高度
 *                2、数字：输入数字就是自定义的像素高度
 * @prop width - 菜单宽度，默认是 170
 *               1、auto：根据 trigger 的宽度
 *               2、数字：输入数字就是自定义的像素宽度
 * @prop trigHeight - 菜单触发器的高度，默认是 auto
 *                    1、auto：根据菜单内容的宽度
 *                    2、数字：输入数字就是自定义的像素高度
 *
 * @event afterSpread - 展开之后的事件
 * @event afterFold - 折叠之后的事件
 * @event scrollerChange - 滚动组件发生变化
 */

import './Menu.scss'

import Vue from 'vue'

import render from './Menu.render'
import store from '../../vuex/store'
import hubStore from '../../vuex/module/hub/type.json'
import compStore from '../../vuex/module/comp/type.json'
import tip from '../Message/tip'

import Btn from '../Btn/Btn'
import Icon from '../Icon/Icon'
import Input from '../Input/Input'
import Motion from './Motion'
import Scroller from '../Scroller/Scroller'

import baseMixin from '../../mixin/base'
import formMixin from '../../mixin/form'
import apiMixin from './Menu.api'

import uid from '../../util/uid'
import {
  dataType
} from '../../util/data/data'
import {
  unique as uniqueArray
} from '../../util/data/array'

export default {
  name: 'Menu',

  render,

  mixins: [baseMixin, formMixin, apiMixin],

  store,

  components: {
    'input-box': Input,
    btn: Btn,
    motion: Motion,
    icon: Icon,
    scroller: Scroller
  },

  props: {
    store: Object,

    ban: {
      type: Boolean,
      default: false
    },

    noTrig: {
      type: Boolean,
      default: false
    },

    noCoverTrig: {
      type: Boolean,
      default: false
    },

    height: {
      type: [Number, String],
      default: 'auto',
      validator(val) {
        if (typeof val === 'number') {
          return true
        } else if (val === 'auto') {
          return true
        } else {
          return false
        }
      }
    },

    width: {
      type: [String, Number],
      default: 170,
      validator(val) {
        if (typeof val === 'number') {
          return true
        } else if (val === 'auto') {
          return true
        } else {
          return false
        }
      }
    },

    trigHeight: {
      type: [String, Number],
      default: 'auto',
      validator(val) {
        if (typeof val === 'number') {
          return true
        } else if (val === 'auto') {
          return true
        } else {
          return false
        }
      }
    }
  },

  data() {
    this.compName = 'menu' // 组件名字
    this.uid = '' // 组件唯一标识符
    this.togglingMenu = false // 300ms 之内只能点击一次的标识

    return {
      focusing: false, // 正在处于 focus 状态
      clicking: false, // 正在点击菜单
      menuHeight: 0, // 下拉菜单的高度
      menuWidth: 0, // 下拉菜单的宽度
      panelDisplay: false, // 下拉菜单面板的显示状态
      triggerHeight: 0 // 触发器的高度
    }
  },

  computed: {
    cPrefix() { // 组件类名的前缀
      return `${this.compPrefix}-menu`
    },

    me() {
      return this
    },

    menuClass() { // 组件 class 的名字
      let classArr = [
        this.cPrefix,
        this.xclass(this.compClass)
      ]

      return classArr
    }
  },

  watch: {
    deviceSize(val) {
      this._changeByDeviceSize(val)
    }
  },

  methods: {
    _initComp() {
      this.triggerHeight = this.trigHeight === 'auto' ? this.$refs.trigger.offsetHeight : this.trigHeight
    },

    /**
     * 绑定事件
     */
    _binder() {
      this.$refs.scroller.$on('scrollerChange', (opt) => {
        if (this.panelDisplay) {
          this.spread()
        }

        return this.$emit('scrollerChange', {
          ...opt,
          emitter: this
        })
      })

      this.$refs.motion.$on('afterEnter', () => {
        this.$emit('afterSpread', {
          emitter: this
        })
      })

      this.$refs.motion.$on('afterLeave', () => {
        this.panelDisplay = false

        this.$emit('afterFold', {
          emitter: this
        })
      })

      if (!this.noTrig) {
        this.$refs.triggerBtn.$on('keyEnter', ({
          event
        }) => {
          this.click(event)
        })
      }
    },

    /**
     * 初始化触发器的
     */

    /**
     * 调整菜单触发器的样式
     */
    _adjustTriggerPoiStyle(cb) {
      this.triggerHeight = this.trigHeight === 'auto' ? this.$refs.trigger.offsetHeight : this.trigHeight

      return cb && cb()
    },

    /**
     * 当设备改变尺寸
     */
    _changeByDeviceSize(size) {
      return this._adjustTriggerPoiStyle()
    }
  },

  created() {
    this.uid = uid()

    this.$store.dispatch(compStore.common.add, {
      vm: this,
      name: this.compName,
      id: this.uid
    })
  }
}

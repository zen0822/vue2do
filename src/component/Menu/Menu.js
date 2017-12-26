/**
 * menu 组件
 *
 * @prop store - 储存实例化的信息
 * @prop theme - 主题
 * @prop width - 菜单宽度，默认是 250px。可选 ‘auto’，根据 trigger 的宽度。输入数字就是自定义的像素宽度
 *
 */

import './Menu.scss'

import Vue from 'vue'

import render from './Menu.render'
import store from '../../vuex/store'
import hubStore from '../../vuex/module/hub/type.json'
import compStore from '../../vuex/module/comp/type.json'
import tip from '../Message/tip'

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
    'motion': Motion,
    icon: Icon,
    scroller: Scroller
  },

  props: {
    store: Object,

    ban: {
      type: Boolean,
      default: false
    },

    width: {
      type: [String, Number],
      default: 160,
      validator(val) {
        if (typeof val === 'number') {
          return true
        } else if (val === '100%') {
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
      menuHeight: 0, // 下拉菜单的高度
      menuWidth: 0, // 下拉菜单的宽度
      menuMenuDisplay: false, // 下拉菜单的显示状态
      menuMenuStyle: {}, // 下拉菜单的样式
      menuMenuPoiStyle: {}, // 下拉菜单位置的样式
      listPageHide: true,
      listScrollerHide: true,
      triggerHeight: 0, // 触发器的高度
      transitionFinish: false // 下拉框显示过渡完成的标识符
    }
  },

  computed: {
    cPrefix() { // 组件类名的前缀
      return `${this.compPrefix}-menu`
    },

    me() {
      return this
    },

    menuClass() { // 组件 stage 的 class 的名字
      let classArr = [
        this.cPrefix,
        this.xclass(this.compClass),
        {
          [this.xclass('selecting')]: this.menuMenuDisplay
        },
        {
          [this.xclass('focusing')]: this.focusing
        },
        {
          [this.xclass('multiple')]: this.multiple
        }
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
      this.triggerHeight = this.$el.offsetHeight
      this.menuWidth = this.width === '100%' ? this.$el.offsetWidth : this.width
    },

    _isUndefined(obj) {
      return dataType(obj) === 'undefined'
    },

    /**
     * 绑定事件
     */
    _binder() {
      if (this.$refs.scroller) {
        this.$refs.scroller.$on('changeScroller', () => {
          this._adjustmenuMenuPoiStyle()
        })
      }

      this.$refs.motion.$on('afterEnter', () => {
        this.listPageHide = false
        this.listScrollerHide = false
      })

      this.$refs.motion.$on('afterLeave', () => {
        this.menuMenuDisplay = false
        this.listScrollerHide = true
        this.listPageHide = true
      })
    },

    /**
     * 调整多选下拉框的选择值的样式
     */
    _adjustmenuMenuPoiStyle({
      cb
    } = {}) {
      let top = 0
      let width = this.width === '100%' ? this.$el.offsetWidth : this.width

      this.menuMenuPoiStyle = {
        top: `${top}px`,
        width: `${width}px`
      }

      this.triggerHeight = this.$el.offsetHeight

      return cb && cb()
    },

    /**
     * 当设备改变尺寸
     */
    _changeByDeviceSize(size) {
      return this._adjustmenuMenuPoiStyle()
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

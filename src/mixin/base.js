/**
 * base 混入
 *
 * @prop id - 用户定义的唯一标识符
 * @prop name - 用户定义的实例名字
 * @prop theme - 主题 (primary | success | warning | danger | orange | blue | light | dark)
 * @prop ui - ui 规范 (material | bootstrap | metro |apple)
 */

import compConfig from '../config/index.json'
import store from '../vuex/store'
import commonStore from '../vuex/module/common/type.json'

import {
  prop as eleProp
} from '../util/dom/prop'
import {
  addClass
} from '../util/dom/attr'
import {
  debounce
} from '../util'

export default {
  store,

  props: {
    id: [String, Number],
    name: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: compConfig.defaultTheme,
      validator(val) {
        return [
          'primary', 'grey', 'warning', 'success',
          'danger', 'blue', 'orange', 'light', 'dark', 'white', 'black'
        ].includes(val)
      }
    },
    ui: {
      type: String,
      default: compConfig.defaultUI,
      validator(val) {
        return ['material', 'bootstrap', 'metro', 'apple', 'pure'].includes(val)
      }
    }
  },

  directives: {
    'xclass' (el, binding) {
      addClass(el, binding.value)
    }
  },

  computed: {
    compClass() { // 组件必须加的 class
      return [this.uiClass, this.themeClass]
    },
    compPrefix() { // 组件的统一前缀
      return compConfig.prefix
    },
    deviceSize() { // 设备尺寸
      return this.$store.getters[commonStore.deviceSize]
    },
    deviceRange() { // 设备尺寸范围
      return this._deviceTypeRange()
    },
    uiClass() { // UI 的类名
      return this.ui ? `ui-${this.ui}` : ''
    },
    themeClass() { // 主题的类名
      return `theme-${this.theme}`
    },
    UIMaterial() { // UI 是 material
      return this.ui === 'material'
    },
    UIBootstrap() { // UI 是 bootstrap
      return this.ui === 'bootstrap'
    }
  },

  methods: {
    /**
     * 安装完组件后初始化实例
     */
    _initComp() {
      // TODO
    },

    /**
     * 绑定相关事件
     */
    _binder() {
      // TODO
    },

    /**
     * 设置 data 选项的默认值
     */
    _setDataOpt() {
      // TODO
    },

    // 设备尺寸范围
    _deviceTypeRange(type = this.deviceSize) {
      switch (type) {
        case 'xs':
          return 575
        case 's':
          return 765
        case 'm':
          return 991
        case 'l':
          return 1911
        default:
          return Number.MAX_VALUE
      }
    },

    /**
     * 获取元素相关的属性（无论是否是隐藏状态）
     *
     * @param {Element} element - dom 节点
     */
    elementProp(element = this.$el) {
      return eleProp(element)
    },

    /**
     * 为组件里面的类名增加前缀
     **/
    prefix(className) {
      if (Array.isArray(className)) {
        for (let i = 0, len = className.length; i < len; i++) {
          className[i] = `${this.compPrefix}-${className[i]}`
        }

        return className.join(' ')
      } else {
        return `${this.compPrefix}-${className}`
      }
    },

    /**
     * 为组件里面的类名增加组件前缀
     **/
    xclass(className) {
      if (Array.isArray(className)) {
        let classArr = className.map((item) => {
          return `${this.cPrefix}-${item}`
        })

        return classArr.join(' ')
      } else {
        return `${this.cPrefix}-${className}`
      }
    },

    /**
     * 初始化 slot 的 option
     *
     * @param { String } compName - 组件名字
     * @return { Array } option - 返回在 slot 取得的 option
     */
    _initOptionSlot(opt = {}) {
      const $defaultSlotContent = this.$slots.default

      // slot default 没数据就退出
      if (!Array.isArray($defaultSlotContent) || $defaultSlotContent.length === 0) {
        return false
      }

      let option = []

      $defaultSlotContent.forEach((item) => {
        if (!item.elm) {
          return false
        }

        if (item.elm.className === opt.compClass) {
          const el = item.elm
          const $el = $(el)
          const elAttr = el.attributes
          const attrKeys = Object.keys(elAttr)
          let attrs = {}

          attrKeys.forEach((item) => {
            let attr = elAttr[item]

            Object.assign(attrs, {
              [attr.name]: attr.value
            })
          })

          option.push(Object.assign(attrs, {
            text: el.innerText
          }))
        }
      })

      $(opt.slotRef).remove()

      return option
    }
  },

  created() {
    this.$slotKey = Object.keys(this.$slots)
    this._setDataOpt()
  },

  mounted() {
    this.$nextTick(() => {
      this._binder()
      this._initComp()
    })

    let deviceSizeClass = `${compConfig.prefix}-css-device-size`

    if (document.getElementsByClassName(deviceSizeClass).length === 0) {
      if (!document.querySelector('.' + deviceSizeClass)) {
        // 添加存储设备尺寸的 dom 到页面上
        let deviceSizeEle = document.createElement('div')
        deviceSizeEle.className = deviceSizeClass
        document.body.appendChild(deviceSizeEle)

        const updateDeviceSize = () => {
          let content = window.getComputedStyle(deviceSizeEle, ':after').getPropertyValue('content')

          this.$store.dispatch(commonStore.deviceSize, content)
        }

        window.addEventListener('resize', debounce(updateDeviceSize, 100))

        updateDeviceSize()
      }
    }
  }
}

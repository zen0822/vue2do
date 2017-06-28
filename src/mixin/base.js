/**
 * base 混入
 *
 * @prop id - 实例的唯一标识符
 * @prop name - 实例的中文名字
 * @prop theme - 主题
 * @prop ui - ui 规范 (material | bootstrap | metro |apple)
 */

import compConfig from '../config/index.json'
import store from '../vuex/store'
import commonStore from '../vuex/module/common/type.json'
import { addClass } from '../util/dom/attr'

export default {
  store,

  props: {
    id: [String, Number],

    name: String,

    theme: {
      type: String,
      default: compConfig.defaultTheme
    },

    ui: {
      type: String,
      default: compConfig.defaultUI
    }
  },

  directives: {
    'xclass'(el, binding) {
      addClass(el, binding.value)
    }
  },

  computed: {
    // 主题的 css 的 class 名字
    uiClass() {
      return this.ui ? `ui-${this.ui}` : ''
    },

    // 主题的 css 的 class 名字
    themeClass() {
      return this.theme ? `theme-${this.theme}` : ''
    },

    // 组件比加 class
    compClass() {
      return [this.uiClass, this.themeClass]
    },

    // 组件的统一前缀
    compPrefix() {
      return compConfig.prefix
    },

    // 设备尺寸
    deviceSize() {
      return this.$store.getters[commonStore.deviceSize]
    },

    // 设备尺寸范围
    deviceRange() {
      return this._deviceTypeRange()
    }
  },

  methods: {
    /**
     * 安装完组件后初始化实例
     */
    _init() {
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
        case '<s':
          return 575
        case '<m':
          return 765
        case '<l':
          return 991
        case '<xl':
          return 1911
        default:
          return Number.MAX_VALUE
      }
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

      let deviceSizeClass = `${compConfig.prefix}-device-size`

      if (!document.querySelector('.' + deviceSizeClass)) {
        let deviceSizeEle = document.createElement('div')
        deviceSizeEle.className = `${compConfig.prefix}-device-size`

        document.body.appendChild(deviceSizeEle)

        this.$nextTick(() => {
          let content = window.getComputedStyle(deviceSizeEle, ':after').getPropertyValue('content')
          this.$store.dispatch(commonStore.deviceSize, content)
        })

        window.addEventListener('resize', () => {
          this.$nextTick(() => {
            let content = window.getComputedStyle(deviceSizeEle, ':after').getPropertyValue('content')
            this.$store.dispatch(commonStore.deviceSize, content)
          })
        })
      }

      this._init()
    })
  }
}

/**
 * base 混入
 *
 * @props id - 实例的唯一标识符
 * @props name - 实例的中文名字
 * @props theme - 主题
 *
 */

import compConfig from '../config/index.json'
import store from 'src/vuex/store'
import commonStore from 'src/vuex/module/common/type.json'

export default {
  store,

  props: {
    id: [String, Number],

    name: String,

    theme: {
      type: String,
      default: compConfig.defaultTheme
    }
  },

  directives: {
    'xclass'(el, binding) {
      $(el).addClass(binding.value)
    }
  },

  computed: {
    // 主题的 css 的 class 名字
    themeClass() {
      return this.theme ? `theme-${this.theme}` : ''
    },

    // 组件的统一前缀
    compPrefix() {
      return compConfig.prefix
    },

    // 设备尺寸
    deviceSize() {
      return this.$store.getters[commonStore.deviceSize]
    }
  },

  methods: {
    /**
     * 安装完组件后初始化实例
     */
    _init() {
      this._binder()
    },

    /**
     * 设置 data 选项的值
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

    /**
     * 为组件里面的类名增加前缀
     **/
    xclass(className) {
      if (Array.isArray(className)) {
        for (let i = 0, len = className.length; i < len; i++) {
          className[i] = `${this.cPrefix}-${className[i]}`
        }

        return className.join(' ')
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
    let deviceSizeClass = `${compConfig.prefix}-device-size`

    if (!document.querySelector('.' + deviceSizeClass)) {
      let deviceSizeEle = document.createElement('div')
      deviceSizeEle.className = `${compConfig.prefix}-device-size`

      document.body.append(deviceSizeEle)

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

    this.$slotKey = Object.keys(this.$slots)
    this._setDataOpt()
  },

  mounted() {
    this.$nextTick(() => {
      this._init()
    })
  }
}

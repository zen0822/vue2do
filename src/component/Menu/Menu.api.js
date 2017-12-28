/**
 * menu.api
 */

import keyCode from '../../config/keyCode.json'
import tip from '../Message/tip'
import {
  handleEleDisplay
} from '../../util/dom/prop'

export default {
  methods: {
    /**
     * 默认值的 css 的 class 名字
     */
    defaultValClassName(value) {
      return this.defaultVal === value ? `${this.cPrefix}-default-text` : ''
    },

    /**
     * 点击父元素
     *
     */
    clickParent() {
      if (this.panelDisplay) {
        return this.togglePanelDisplay(false)
      }
    },

    /**
     * 下拉框展示失去焦点
     *
     * @return {Object} this - 组件
     */
    blur() {
      this.focusing = false

      if (!this.multiple) {
        return this.togglePanelDisplay(false)
      }
    },

    /**
     * 下拉框展示的焦点
     *
     * @return {Object} this - 组件
     */
    focus() {
      this.focusing = true
    },

    /**
     * 点击下拉框
     *
     * @return {Object} this - 组件
     */
    click(event) {
      event.stopPropagation()

      return this.togglePanelDisplay()
    },

    /**
     * keydown
     */
    keydown(event) {
      if (!this.focusing) {
        return false
      }

      if (event.keyCode === keyCode.enter) {
        this.togglePanelDisplay()
      }
    },

    /**
     * 下拉框的显示操作
     *
     * @param {Boolean} optVal - 操作状态,
     *                        （false: 隐藏， true: 显示，undefined： 切换显示状态）
     *
     * @return {Object} - this组件
     */
    togglePanelDisplay(optVal = !this.panelDisplay) {
      if (this.togglingMenu) {
        return false
      }

      this.togglingMenu = true

      setTimeout(() => {
        this.togglingMenu = false
      }, 300)

      let menuHub = this.$store.state.comp.menu

      const getMenuHeight = (vm) => {
        handleEleDisplay({
          element: vm.$refs.panel,
          cb: (element) => {
            if (vm.height === 'auto') {
              let scrollerComp = vm.$refs.scroller
              scrollerComp._initScroller()

              vm.menuHeight = scrollerComp.scrollerHeight
            } else {
              vm.menuHeight = vm.height
            }
          }
        })
      }

      const transite = (state, vm) => {
        if (state) {
          getMenuHeight(vm)

          vm.panelDisplay = true
          vm.$refs.motion.enter()
        } else {
          getMenuHeight(vm)

          vm.panelDisplay = false
          vm.$refs.motion.leave()
        }
      }

      Object.keys(menuHub).forEach((item) => {
        const menuVm = menuHub[item]

        if (menuVm.panelDisplay && item !== this.uid) {
          transite(false, menuVm)
        }
      })

      return this._adjustTriggerPoiStyle(transite(optVal, this))
    },

    /**
     * 展開下拉框
     * @return {Object} this - 组件
     */
    spread() {
      return this.togglePanelDisplay(true)
    },

    /**
     * 折叠下拉框
     * @return {Object} this - 组件
     */
    fold() {
      return this.togglePanelDisplay(false)
    },

    /**
     * 展開/折叠 下拉框
     * @return {Object} this - 组件
     */
    toggle() {
      return this.togglePanelDisplay()
    }
  }
}

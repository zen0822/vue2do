/**
 * menu.api
 */

import keyCode from '../../config/keyCode.json'
import tip from '../Message/tip'

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
        return this._togglePanelDisplay(false)
      }
    },

    /**
     * 下拉框展示失去焦点
     *
     * @return {Object} this - 组件
     */
    blur() {
      this.focusing = false
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
      if (this.clicking) {
        return false
      }

      this.clicking = true

      event.stopPropagation()

      setTimeout(() => {
        this.clicking = false

        return this._togglePanelDisplay()
      }, 100)
    },

    /**
     * keydown
     */
    keydown(event) {
      if (!this.focusing) {
        return false
      }

      if (event.keyCode === keyCode.enter) {
        this._togglePanelDisplay()
      }
    },

    /**
     * 展開下拉框
     * @return {Object} this - 组件
     */
    spread() {
      return this._togglePanelDisplay(true)
    },

    /**
     * 折叠下拉框
     * @return {Object} this - 组件
     */
    fold() {
      return this._togglePanelDisplay(false)
    },

    /**
     * 展開/折叠 下拉框
     * @return {Object} this - 组件
     */
    toggle() {
      return this._togglePanelDisplay()
    },

    /**
     * 调整菜单动画
     */
    adjust(cb) {
      this.$refs.motion.adjustMotion()
    }
  }
}

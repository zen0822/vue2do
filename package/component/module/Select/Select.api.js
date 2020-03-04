/**
 * menu.api
 */

import tip from '../Message/tip'

export default {
  methods: {
    /**
     * 当设备改变尺寸
     */
    changeByDeviceSize() {
      return this._adjustSelectedPoiStyle()
    },

    /**
     * 多选下拉框的复选框赋值情况
     *
     * @param {String, Number} - 多选下拉框的值
     */
    checkboxVal(val) {
      if (this._isExistedVal(val)) {
        return [-1]
      }

      return []
    },

    /**
     * 默认值的 css 的 class 名字
     */
    defaultValClassName(value) {
      return this.defaultValue === value ? `${this.cPrefix}-default-text` : ''
    },

    /**
     * 验证数据格式是否正确
     * 现在只有 是否必选
     *
     * @return {Object} - this - 组件
     */
    verify() {
      this.verifiedHint = `请选择${this.errorMessage}${this.errorMessage ? '的' : ''}下拉框!`

      if (this.multiple) {
        this.verified = this.stateValue.length >= this.min

        return this.verified
      } else if (this.required) {
        this.verified = this.stateValue !== -1

        return this.verified
      }

      return this.verified
    },

    /**
     * 移除 多选下拉框 已选的值
     *
     * @param {String, Number} - 多选下拉框的值
     */
    removeMultiSelected(index) {
      if (this.min !== 0 && this.stateValue.length === this.min) {
        tip(`至少需选择 ${this.min} 项！`)

        const valTmp = this.stateValue
        this.stateValue = []
        this.stateValue = valTmp

        return this.stateValue
      }

      this.stateValue.splice(index - 1, 1)
    },

    /**
     * 点击移除多选下拉框已选的值
     */
    clickMultiSelected(event, index) {
      event.stopPropagation()

      return this.removeMultiSelected(index)
    },

    /**
     * 点击父元素
     *
     */
    clickParent() {
      if (this.menuDisplay) {
        return this.toggle(false)
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
      event.stopPropagation()

      return this.toggle()
    },

    /**
     * 全选多选下拉框
     *
     * @return {Object} - this - 组件
     */
    selectAllOption() {
      if (this.selectedAll) {
        this.stateValue = []
      } else {
        this.stateValue = this.allOptionVal.slice()
      }

      this.selectedAll = !this.selectedAll
    },

    /**
     * 切换隐藏显示菜单，会将同一个应用内的所有下拉组件都隐藏
     */
    toggle() {
      if (this.togglingMenu) {
        return false
      }

      this.togglingMenu = true

      setTimeout(() => {
        this.togglingMenu = false
      }, 300)

      const menuHub = this.$store.state.comp.select

      Object.keys(menuHub).forEach((item) => {
        const menuVm = menuHub[item]

        if (menuVm.menuDisplay && item !== this.uid) {
          this._menuMotion(false, menuVm)
        }
      })

      return this._menuMotion()
    },

    /**
     * 展開下拉框
     * @return {Object} this - 组件
     */
    spread() {
      return this.toggle(true)
    },

    /**
     * 折叠下拉框
     * @return {Object} this - 组件
     */
    fold() {
      return this.toggle(false)
    },

    /**
     * 获取当前值
     *
     * @return {String, Number} - 下拉组件的当前值
     */
    val() {
      return this.stateValue
    }
  }
}

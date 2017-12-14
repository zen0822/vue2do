/**
 * menu.api
 */

import tip from '../Message/tip'
import {
  handleEleDisplay
} from '../../util/dom/prop'

export default {
  methods: {
    /**
     * 当设备改变尺寸
     */
    changeByDeviceSize(size) {
      return this._adjustmenuMenuPoiStyle()
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
      return this.defaultVal === value ? `${this.cPrefix}-default-text` : ''
    },

    /**
     * 验证数据格式是否正确
     * 现在只有 是否必选
     *
     * @return {Object} - this - 组件
     */
    verify() {
      this.dangerTip = `请选择${this.errorMessage}${this.errorMessage ? '的' : ''}下拉框!`

      if (this.multiple) {
        this.verified = this.value.length >= this.min

        return this.verified
      } else if (this.required) {
        this.verified = this.value !== -1

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
      if (this.min !== 0 && this.value.length === this.min) {
        tip(`至少需选择 ${this.min} 项！`)

        const valTmp = this.value
        this.value = []
        this.value = valTmp

        return this.value
      }

      this.value.splice(index - 1, 1)
    },

    /**
     * 移除 多选下拉框 已选的值
     *
     * @param {String, Number} - 多选下拉框的值
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
      if (this.menuMenuDisplay) {
        return this.toggleMenuDisplay(false)
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
        return this.toggleMenuDisplay(false)
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

      return this.toggleMenuDisplay()
    },

    /**
     * keydown
     */
    keydown(event) {
      if (!this.focusing) {
        return false
      }

      if (event.keyCode === 13) {
        this.toggleMenuDisplay(true)
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
    toggleMenuDisplay(optVal = !this.menuMenuDisplay) {
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
          element: vm.$refs.menuPanel,
          cb: (element) => {
            let scrollerComp = vm.isTagMenu ? vm.$refs.tagScroller : vm.$refs.menuOption.$refs.list.$refs.scroller
            scrollerComp._initScroller()

            vm.menuHeight = scrollerComp.scrollerHeight
          }
        })
      }

      const transite = (state, vm) => {
        if (state) {
          getMenuHeight(vm)

          vm.menuMenuDisplay = true
          vm.$refs.transition.enter()
        } else {
          getMenuHeight(vm)

          vm.menuMenuDisplay = false
          vm.$refs.transition.leave()
        }
      }

      Object.keys(menuHub).forEach((item) => {
        const menuVm = menuHub[item]

        if (menuVm.menuMenuDisplay && item !== this.uid) {
          transite(false, menuVm)
        }
      })

      return this._adjustmenuMenuPoiStyle({
        cb: () => {
          return transite(optVal, this)
        }
      })
    },

    /**
     * 全选多选下拉框
     *
     * @return {Object} - this - 组件
     */
    selectAllOption() {
      if (this.selectedAll) {
        this.value = []
      } else {
        this.value = this.allOptionVal.slice()
      }

      this.selectedAll = !this.selectedAll
    },

    /**
     * 展開下拉框
     * @return {Object} this - 组件
     */
    spread() {
      return this.toggleMenuDisplay(true)
    }
  }
}

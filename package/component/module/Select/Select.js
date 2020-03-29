/**
 * menu 组件
 *
 * @prop classify - 有值（数组类型）就开启标题下拉框 option 分类模式
 * @prop classifyOpt - 分类下拉框的数据
 * @prop coverTrig - 菜单展开时遮挡触发器，默认不开启
 * @prop defaultValue - 默认的选项值
 * @prop defaultText - 默认的选项文本值
 * @prop errorMessage - 没选的时候显示的错误信息
 * @prop max - 多选下拉框最多选择几个
 * @prop min - 多选下拉框至少选择几个
 * @prop menuWidth - 菜单宽度
 * @prop multiple - 是为多选
 * @prop option - 下拉框的 option 数据
 * @prop param - 搜索参数名
 * @prop required - 必须选择下拉框的值
 * @prop readOnly - 只读
 * @prop search - 开启搜索过滤
 * @prop selectAll - 启动全选的功能
 * @prop selectAllTxt - 全选选项的名字
 * @prop store - 储存实例化的信息
 * @prop textName - 指定读取 下拉框 optionItems 的 text 值的 key 的名字
 * @prop value - 默认第一个显示的值
 * @prop valueName - 指定读取下拉框 optionItems 的 value 值的 key 的名字
 *
 * @event change - 选择值的改变
 */

import '../../lib/directive/clickParent'
import '../../scss/common/main.scss'
import '../../scss/common/box.scss'
import './Select.scss'
import './Select.bootstrap.scss'
import './Select.material.scss'

import SelectOpt from './SelectOpt'
import keyCode from '../../config/keyCode.json'

import render from './Select.render'
import store from '../../vuex/store'
import compStore from '../../vuex/module/comp/type.json'

import Icon from '../Icon/Icon'
import Input from '../Input/Input'
import Check from '../Check/Check'
import Scroller from '../Scroller/Scroller'

import Menu from '../Menu/Menu'

import baseMixin from '../../mixin/base'
import formMixin from '../../mixin/form'
import apiMixin from './Select.api'

import {
  handleEleDisplay
} from '../../util/dom/prop'

import uid from '../../util/uid'

// 搜索功能的函数节流的间隔时间
const SEARCH_KEY_UP_INTERVAL = 500

export default {
  name: 'Select',

  render,

  mixins: [baseMixin, formMixin, apiMixin],

  store,

  components: {
    'menu-comp': Menu,
    'select-opt': SelectOpt,
    'input-box': Input,
    icon: Icon,
    check: Check,
    scroller: Scroller
  },

  props: {
    classify: Array,
    classifyOpt: Object,
    coverTrig: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: [Number, String],
      default: -1
    },
    defaultText: {
      type: [Number, String],
      default: '请选择'
    },
    errorMessage: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    menuWidth: {
      type: [String, Number],
      default: 170,
      validator(val) {
        if (typeof val === 'number') {
          return true
        } else if (val === 'auto' || val === '100%') {
          return true
        } else {
          return false
        }
      }
    },
    option: {
      type: Array,
      default: () => []
    },
    param: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    value: [Number, Array, String],
    valueName: {
      type: String,
      default: 'value'
    },
    textName: {
      type: String,
      default: 'text'
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    selectAll: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    store: Object,
    selectAllTxt: {
      type: String,
      default: '全选'
    }
  },

  data() {
    this.compName = 'select' // 组件名字
    this.uid = '' // 组件唯一标识符
    this.togglingMenu = false // 300ms 之内只能点击一次的标识

    return {
      allOptionVal: [], // optionItem 里面的全部的 value
      currentIndex: 0, // option 值的当前游标
      customOptionDisplay: false, // 自定义下拉框的显示状态
      focusing: false, // 正在处于 focus 状态
      hasSlotOption: false, // 是否是 slot 定义的 option
      menuDisplay: false, // 下拉菜单的显示状态
      optionItemCopy: {}, // 当下拉框为 classify 的时候，将 option 转换为数组
      searchKeyuped: false, // 搜索按键的状态
      searchOptionDisplay: false, // 是否显示搜索 optionItem
      searchOptionItem: {}, // 搜索出来的 option
      selectedAll: false, // 是否全选多选下拉框的标记
      selectedHeight: 0, // 当前选择值的样式高度值
      selectedStyleHeight: 0, // 当前选择值的样式高度值
      stateCoverTrig: false, // 遮挡下拉选择框的触发器
      stateMenuHeight: 0, // 下拉菜单的高度
      stateMenuWidth: this._getMenuWidth(this.menuWidth), // 下拉菜单的高度
      stateOption: [], // props 里面 optionItem 的 data 替换值
      stateValue: undefined, // 当前下拉框的 value 值
      transitionFinish: false, // 下拉框显示过渡完成的标识符
      text: undefined, // 当前下拉框的 text 值
      unwatchOption: {}, // 取消观察 option
      verified: true, // 是否以验证通过
      verifiedHint: '' // 验证提示
    }
  },

  computed: {
    cPrefix() { // 组件类名的前缀
      return `${this.compPrefix}-select`
    },
    me() {
      return this
    },
    selectClass() { // 组件 stage 的 class 的名字
      const classArr = [
        this.cPrefix,
        this.xclass(this.compClass),
        {
          [this.xclass('selecting')]: this.menuDisplay
        },
        {
          [this.xclass('focusing')]: this.focusing
        },
        {
          [this.xclass('multiple')]: this.multiple
        }
      ]

      return classArr
    },
    isCustomOption() { // 自定义下拉框的显示状态
      return this.option.length > 0 && this.customOptionDisplay
    },
    initTxtDisplay() { // 多选框的默认值显示状态
      return this.multiple && this.stateValue.length === 0
    }
  },

  watch: {
    stateValue(val) {
      if (this.multiple && this.initTxtDisplay) { // 没有值时
        return this.$nextTick(() => this._adjustSelectedPoiStyle(''))
      }

      if (this.multiple && this.selectAll) {
        this.selectedAll = val.length > 0 && val.length === this.allOptionVal.length
      }

      return this._initSelectTxt()
    },
    value(val) {
      this.stateValue = this.multiple ? val.slice() : val
    },
    option(val) {
      return this._processOption(val.slice())
    },
    classifyOpt(val) {
      return this._processOption(val)._initAllOptionVal()._initSelectTxt()
    },
    deviceSize(val) {
      this.changeByDeviceSize(val)
    },
    selectedHeight() {
      this._adjustMenuMotion()
    },
    menuWidth(val) {
      this.stateMenuWidth = this._getMenuWidth(val)
    }
  },

  methods: {
    _initComp() {
      this._adjustSelectedPoiStyle()
    },

    _initDataOpt() {
      this.stateCoverTrig = this.coverTrig
    },

    // 获取下拉菜单宽度
    _getMenuWidth(width) {
      const triggerWidth = this.$el ? this.$el.offsetWidth : 0

      if (typeof width === 'number') {
        return triggerWidth > width ? triggerWidth : width
      } else if (width === '100%') {
        return triggerWidth
      } else {
        return width
      }
    },

    /**
     * 绑定事件
     */
    _binder() {
      if (this.$refs.scroller) {
        this.$refs.scroller.$off('change')
        this.$refs.scroller.$on('change', ({
          scrollerHeight
        }) => {
          // 有选择值时需要重新计算已选框的高度
          if (!this.initTxtDisplay) {
            return this._adjustSelectedPoiStyle(scrollerHeight + 16)
          }
        })
      }

      this.$refs.option.$off('change')
      this.$refs.option.$on('change', ({
        value,
        text,
        index,
        hideMenu
      }) => {
        this.currentIndex = index
        const selectedItem = this._isExistedVal(value)

        if (this.multiple) {
          if (!selectedItem) {
            if (this.max === 0 || this.stateValue.length !== this.max) {
              this.stateValue.push(value)
            }
          } else {
            this.removeMultiSelected(selectedItem.index + 1)
          }
        } else {
          this.stateValue = value

          hideMenu && this._menuMotion(false)
        }

        return this.$emit('change', {
          value,
          text,
          index
        })
      })
    },

    /**
     * 调整多选下拉框的选择值的样式
     */
    _adjustSelectedPoiStyle(height, cb) {
      const refSelected = this.$refs.selected

      if (height === undefined) {
        const selectedHeight = refSelected.offsetHeight

        this.selectedStyleHeight = selectedHeight + 'px'
        this.selectedHeight = selectedHeight
      } else if (height === '') {
        refSelected.style.height = ''
        this.selectedHeight = refSelected.offsetHeight
      } else {
        this.selectedStyleHeight = height + 'px'
        this.selectedHeight = height
      }

      cb?.()
    },

    /**
     * 设置 data 选项的默认值
     */
    _setDataOpt() {
      if (this.value) {
        this.stateValue = this.multiple ? this.value.slice() : this.value
      }

      this.stateOption = this.option.slice()
    },

    /**
     * 初始化 allOptionVal
     */
    _initAllOptionVal() {
      const value = []
      const optionTemp = this.classify ? this.stateOptionItemCopy : this.stateOption

      optionTemp.forEach((item) => {
        value.push(item[this.valueName])
      })

      this.allOptionVal = value

      return this
    },

    /**
     * 初始化下拉 option
     */
    _optionion() {
      if (this.classifyOpt) {
        return this._processOption(this.classifyOpt)._initAllOptionVal()._initSelectTxt()
      } else {
        const slotOption = this._initSelectSlot()

        if (slotOption) {
          this.stateOption = slotOption
        }

        return this._processOption(this.stateOption.slice())._initAllOptionVal()._initSelectTxt()
      }
    },

    /**
     * 初始化下拉菜单 slot 的 option
     *
     * @return { Array } optionItem - 返回在 slot 取得的 option
     */
    _initSelectSlot() {
      const $defaultSlotContent = this.$slots.default

      // slot default 没数据就退出
      if (!Array.isArray($defaultSlotContent) || $defaultSlotContent.length === 0) {
        return false
      }

      this.hasSlotOption = true
      const optionItem = []

      $defaultSlotContent.forEach((item) => {
        if (item.text === ' ') {
          return false
        }

        const children = item.componentOptions &&
          Array.isArray(item.componentOptions.children) &&
          item.componentOptions.children[0]

        if (!children) {
          return false
        }

        const attrs = item.data ? item.data.attrs : {}
        const text = attrs.text === undefined ? (children ? (children.text ? children.text : '(empty)') : '') : attrs.text

        optionItem.push({
          value: attrs.value,
          text
        })
      })

      return optionItem
    },

    /**
     * 初始化下拉菜单的值
     */
    _initSelectTxt() {
      if (this.multiple) {
        this._initMultipleSelectTxt()
      } else {
        this._initSingleSelectTxt()
      }

      return this
    },

    /**
     *  初始化多选下拉菜单
     */
    _initMultipleSelectTxt() {
      if (!Array.isArray(this.stateOption)) {
        return this
      }

      if (!Array.isArray(this.stateValue)) {
        console.error(`多选下拉框的 "this.stateValue" 必须为数组!!`)
        this.stateValue = []

        return false
      }

      const valueTemp = this.stateValue
      const optionTemp = this.stateOption
      const toBeText = []

      valueTemp.forEach((ele) => {
        optionTemp.every((item) => {
          if (item[this.valueName] === ele) {
            toBeText.push(item[this.textName])

            return false
          }

          return true
        })
      })

      return this._setTxtVal({
        text: toBeText,
        replace: true
      })
    },

    /**
     * 初始化单选下拉菜单
     */
    _initSingleSelectTxt() {
      if (!Array.isArray(this.stateOption)) {
        return this
      }

      if (this.stateValue || this.stateValue === 0 || this.stateValue === '0') {
        this.stateOption.every((ele) => {
          if (ele[this.valueName] === this.stateValue) {
            this._setTxtVal({
              value: ele[this.valueName],
              text: ele[this.textName]
            })

            return false
          }

          return true
        })

        return this
      }

      if (typeof this.stateOption[0] === 'object') {
        this._setTxtVal({
          value: this.stateOption[0][this.valueName],
          text: this.stateOption[0][this.textName]
        })
      }

      return this
    },

    /**
     * 多选下拉框的 value 是否已存在
     *
     * @param {String, Number} - 多选下拉框的值
     */
    _isExistedVal(val) {
      if (!this.multiple) {
        return false
      }

      let isExisted = false
      let existItem = {}

      this.stateValue.every((selectedVal, index) => {
        if (val === selectedVal) {
          isExisted = true
          existItem = {
            value: selectedVal,
            index: index
          }

          return false
        }

        return true
      })

      if (isExisted) {
        return existItem
      } else {
        return false
      }
    },

    /**
     * 处理下拉框的 text 和 value
     */
    _setTxtVal({
      value,
      text,
      replace = false
    }) {
      if (!this.multiple || replace) {
        if (value !== undefined) {
          this.stateValue = value
        }

        if (text !== undefined) {
          this.text = text
        }

        return this
      }

      if (Array.isArray(value)) {
        value.length > 0 && this.stateValue.concat(value)
      } else {
        text !== undefined && this.text.push(text)
      }

      if (Array.isArray(text)) {
        value.length > 0 && this.stateValue.concat(value)
      } else {
        value !== undefined && this.stateValue.push(value)
      }

      return this
    },

    /**
     * 监控 input 输入下拉框过滤的关键字的回调函数
     */
    _searchKeyup(evt) {
      const keyWord = evt.target.value

      if (!keyWord && keyWord !== 0) {
        this.searchOptionDisplay = false

        return false
      }

      this.searchKeyuped = true

      setTimeout(() => {
        this.searchKeyuped = false
      }, SEARCH_KEY_UP_INTERVAL)

      this.searchOptionDisplay = true
      let realOptionItem = this.stateOption

      if (this.classify || this.classifyOpt) {
        realOptionItem = this.stateOptionItemCopy
      }

      this.searchOptionItem = realOptionItem.filter(item => {
        return item[this.textName].indexOf(keyWord) > -1
      })

      if (this.searchOptionItem.length === 0) {
        this.searchOptionItem.push({
          [this.valueName]: `${this.compPrefix}-menu: search not found`,
          [this.textName]: '查无此数据',
          classify: true
        })
      }
    },

    /**
     *  观察 option
     */
    _watchOption() {
      this.unwatchOption = this.$watch('option', function (val) {
        if (!this.hasSlotOption) {
          return this._processOption(val)._initAllOptionVal()._initSelectTxt()
        }
      })
    },

    /**
     * 处理下拉框值的钩子
     *
     * @return {Object} this - 组件
     */
    _processOption(optionItem) {
      let toBeOption = []

      if (this.classify) {
        toBeOption = this._processClassifyOption(optionItem)
      } else {
        toBeOption = optionItem
      }

      this.stateOption = toBeOption

      return this
    },

    /**
     * 处理 classify 下拉框值
     *
     * @return {Array} optionTemp - 处理过的 option
     */
    _processClassifyOption(optionItem) {
      let optionTemp = []
      const allOptionTemp = []
      let allOption = []

      this.classify.forEach((item) => {
        optionTemp = optionTemp.concat([{
          [this.valueName]: item.key,
          [this.textName]: item.text,
          classify: true
        }], optionItem[item.key])

        allOption = allOption.concat(optionItem[item.key])
      })

      for (let i = 0, len = allOption.length; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          if (allOption[i].value === allOption[j].value) {
            i++
          }
        }

        allOptionTemp.push(allOption[i])
      }

      allOption = allOptionTemp

      optionTemp = optionTemp.concat([{
        [this.valueName]: 'all',
        [this.textName]: '全部',
        classify: true
      }], allOption)

      this.stateOptionItemCopy = allOption

      return optionTemp
    },

    /**
     * 下拉框的显示操作
     *
     * @param {Boolean} optVal - 操作状态,
     *                        （false: 隐藏， true: 显示，undefined： 切换显示状态）
     *
     * @return {Object} - this组件
     */
    _menuMotion(optVal = !this.menuDisplay, vm = this) {
      const getMenuData = (vm) => {
        handleEleDisplay({
          element: vm.$refs.menu.$refs.panel,
          cb: () => {
            const scrollerComp = vm.$refs.option.$refs.list.$refs.scroller
            scrollerComp.initScroller()

            vm.stateMenuHeight = scrollerComp.scrollerHeight
            // vm.stateMenuWidth = this._getMenuWidth(this.state)
          }
        })
      }

      const transite = (state, vm) => {
        if (state) {
          getMenuData(vm)

          vm.menuDisplay = true

          // 等 menu 组件的 height 的值更新了才能正确的展开 menu 组件
          this.$nextTick(() => {
            vm.$refs.menu.spread()
          })
        } else {
          getMenuData(vm)

          vm.menuDisplay = false

          if (this.UIMaterial) {
            setTimeout(() => {
              vm.$refs.menu.fold()
            }, 300)
          } else {
            vm.$refs.menu.fold()
          }
        }
      }

      return transite(optVal, vm)
    },

    /**
     * 调整菜单动画（显示的时候）
     */
    _adjustMenuMotion() {
      if (this.menuDisplay) {
        return this.$refs.menu.adjust()
      }
    },

    /**
     * keydown
     */
    _handlerKeydown(event) {
      const $refOption = this.$refs.option

      if (!this.focusing) {
        return false
      }

      switch (event.keyCode) {
        case keyCode.enter:
          this.toggle()
          break
        case keyCode.up:
          $refOption.keydown('up')
          event.preventDefault()
          break
        case keyCode.down:
          $refOption.keydown('down')
          event.preventDefault()
          break
        case keyCode.left:
          $refOption.keydown('left')
          event.preventDefault()
          break
        case keyCode.right:
          $refOption.keydown('right')
          event.preventDefault()
          break
        default:
          break
      }
    }
  },

  created() {
    this.uid = uid()

    this.$store.dispatch(compStore.common.add, {
      vm: this,
      name: this.compName,
      id: this.uid
    })

    if (this.multiple) {
      this._setTxtVal({
        value: this.stateValue || [],
        text: [],
        replace: true
      })
    }

    this._optionion()
  },

  mounted() {
    if (this.$scopedSlots.custom) {
      this.customOptionDisplay = true
    }

    this.$nextTick(() => {
      this.stateMenuWidth = this._getMenuWidth(this.menuWidth)
    })
  },

  updated() {
    // TODO：不知道为啥切换 UI 属性 option 组件的事件就监听不了了
    this._binder()
  }
}

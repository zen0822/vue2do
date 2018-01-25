/**
 * menu 组件
 *
 * @prop classifyOpt - 分类下拉框的数据
 * @prop defaultVal - 默认的选项值
 * @prop defaultTxt - 默认的选项文本值
 * @prop initVal - 默认第一个显示的值
 * @prop initOpt - 下拉框的 option 数据
 * @prop param - 搜索参数名
 * @prop store - 储存实例化的信息
 * @prop theme - 主题
 *
 * @prop errorMessage - 没选的时候显示的错误信息
 * @prop max - 多选下拉框最多选择几个
 * @prop min - 多选下拉框至少选择几个
 * @prop required - 必须选择下拉框的值
 * @prop readOnly - 只读
 *
 * @prop txtName - 指定读取 下拉框 optionItems 的 text 值的 key 的名字
 * @prop valName - 指定读取下拉框 optionItems 的 value 值的 key 的名字
 *
 * @prop classify - 有值（数组类型）就开启标题下拉框 option 分类模式
 * @prop multiple - 是为多选
 * @prop search - 开启搜索过滤
 *
 * @prop selectAll - 启动全选的功能
 * @prop selectAllTxt - 全选选项的名字
 *
 */

import './Select.scss'

import Vue from 'vue'
import SelectOpt from './SelectOpt'

import render from './Select.render'
import store from '../../vuex/store'
import hubStore from '../../vuex/module/hub/type.json'
import compStore from '../../vuex/module/comp/type.json'
import tip from '../Message/tip'

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
import {
  dataType
} from '../../util/data/data'
import {
  unique as uniqueArray
} from '../../util/data/array'

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
    initOpt: {
      type: Array,
      default: () => []
    },
    param: {
      type: String,
      default: ''
    },
    initVal: [Number, Array, String],
    multiple: {
      type: Boolean,
      default: false
    },
    store: Object,
    max: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    defaultVal: {
      type: [Number, String],
      default: -1
    },
    defaultTxt: {
      type: [Number, String],
      default: '请选择'
    },
    required: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    },
    valName: {
      type: String,
      default: 'value'
    },
    txtName: {
      type: String,
      default: 'text'
    },
    search: {
      type: Boolean,
      default: false
    },
    classify: Array,
    readOnly: {
      type: Boolean,
      default: false
    },
    classifyOpt: Object,
    selectAll: {
      type: Boolean,
      default: false
    },
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
      menuHeight: 0, // 下拉菜单的高度
      menuWidth: 0, // 下拉菜单的高度
      menuDisplay: false, // 下拉菜单的显示状态
      optionItemCopy: {}, // 当下拉框为 classify 的时候，将 option 转换为数组
      option: [], // props 里面 optionItem 的 data 替换值
      unwatchOption: {}, // 取消观察 option
      value: undefined, // 当前下拉框的 value 值
      verified: true, // 是否以验证通过
      searchKeyuped: false, // 搜索按键的状态
      searchOptionDisplay: false, // 是否显示搜索 optionItem
      searchOptionItem: {}, // 搜索出来的 option
      selectedAll: false, // 是否全选多选下拉框的标记
      selectedHeight: 0, // 当前选择值的样式高度值
      selectedStyleHeight: 0, // 当前选择值的样式高度值
      transitionFinish: false, // 下拉框显示过渡完成的标识符
      text: undefined // 当前下拉框的 text 值
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
      let classArr = [
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
      return this.initOpt.length > 0 && this.customOptionDisplay
    },
    initTxtDisplay() { // 多选框的默认值显示状态
      return this.multiple && this.value.length === 0
    }
  },

  watch: {
    value(val) {
      if (this.multiple && this.initTxtDisplay) { // 没有值时
        return this.$nextTick(() => this._adjustSelectedPoiStyle(''))
      }

      if (this.multiple && this.selectAll) {
        this.selectedAll = val.length > 0 && val.length === this.allOptionVal.length
      }

      return this._initSelectTxt()
    },
    initVal(val) {
      this.value = this.multiple ? val.slice() : val
    },
    initOpt(val) {
      return this._processOption(val.slice())
    },
    classifyOpt(val) {
      return this._processOption(val)._initAllOptionVal()._initSelectTxt()
    },
    deviceSize(val) {
      this.changeByDeviceSize(val)
    },
    selectedHeight(val) {
      this._adjustMenuMotion()
    }
  },

  methods: {
    _initComp() {
      this._adjustSelectedPoiStyle()
    },

    /**
     * 绑定事件
     */
    _binder() {
      if (!Array.isArray(this.option)) {
        return false
      }

      if (this.$refs.scroller) {
        this.$refs.scroller.$on('change', ({
          scrollerHeight
        }) => {
          // 有选择值时需要重新计算已选框的高度
          if (!this.initTxtDisplay) {
            return this._adjustSelectedPoiStyle(scrollerHeight + 16)
          }
        })
      }

      this.$refs.menu.$on('afterSpread', ({
        scrollerHeight
      }) => {
        this.$refs.option.$refs.list.initPagePosition(scrollerHeight)
      })

      this.$refs.option.$on('change', ({
        value,
        text,
        index
      }) => {
        this.currentIndex = index
        let selectedItem = this._isExistedVal(value)

        if (this.multiple) {
          if (!selectedItem) {
            if (this.max === 0 || this.value.length !== this.max) {
              this.value.push(value)
            }
          } else {
            this.removeMultiSelected(selectedItem.index + 1)
          }
        } else {
          this.value = value

          return this._menuMotion(false)
        }
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

      cb && cb()
    },

    /**
     * 设置 data 选项的默认值
     */
    _setDataOpt() {
      if (this.initVal) {
        this.value = this.multiple ? this.initVal.slice() : this.initVal
      }

      this.option = this.initOpt.slice()
    },

    /**
     * 初始化 allOptionVal
     */
    _initAllOptionVal() {
      let value = []
      let optionTemp = this.classify ? this.optionItemCopy : this.option

      optionTemp.forEach((item) => {
        value.push(item[this.valName])
      })

      this.allOptionVal = value

      return this
    },

    /**
     * 初始化下拉 option
     */
    _initOption() {
      if (this.classifyOpt) {
        return this._processOption(this.classifyOpt)._initAllOptionVal()._initSelectTxt()
      } else {
        let slotOption = this._initSelectSlot()

        if (slotOption) {
          this.option = slotOption
        }

        return this._processOption(this.option.slice())._initAllOptionVal()._initSelectTxt()
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
      let optionItem = []

      $defaultSlotContent.forEach((item) => {
        if (item.text === ' ') {
          return false
        }

        let children = item.componentOptions &&
          Array.isArray(item.componentOptions.children) &&
          item.componentOptions.children[0]

        if (!children) {
          return false
        }

        let attrs = item.data ? item.data.attrs : {}
        let text = attrs.text === undefined ? (children ? (children.text ? children.text : '(empty)') : '') : attrs.text

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
      if (!Array.isArray(this.option)) {
        return this
      }

      if (!Array.isArray(this.value)) {
        console.error(`多选下拉框的 "this.value" 必须为数组!!`)
        this.value = []

        return false
      }

      let valueTemp = this.value
      let optionTemp = this.option
      let toBeText = []

      valueTemp.forEach((ele, index) => {
        optionTemp.every((item, itemIndex) => {
          if (item[this.valName] === ele) {
            toBeText.push(item[this.txtName])

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
    _initSingleSelectTxt(val, txt) {
      if (!Array.isArray(this.option)) {
        return this
      }

      if (this.value || this.value === 0 || this.value === '0') {
        this.option.every((ele, index) => {
          if (ele[this.valName] === this.value) {
            this._setTxtVal({
              value: ele[this.valName],
              text: ele[this.txtName]
            })

            return false
          }

          return true
        })

        return this
      }

      if (typeof this.option[0] === 'object') {
        this._setTxtVal({
          value: this.option[0][this.valName],
          text: this.option[0][this.txtName]
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

      var isExisted = false
      var existItem = {}

      this.value.every((selectedVal, index) => {
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
          this.value = value
        }

        if (text !== undefined) {
          this.text = text
        }

        return this
      }

      if (Array.isArray(value)) {
        value.length > 0 && this.value.concat(value)
      } else {
        text !== undefined && this.text.push(text)
      }

      if (Array.isArray(text)) {
        value.length > 0 && this.value.concat(value)
      } else {
        value !== undefined && this.value.push(value)
      }

      return this
    },

    /**
     * 监控 input 输入下拉框过滤的关键字的回调函数
     */
    _searchKeyup(evt) {
      let keyWord = evt.target.value

      if (!keyWord && keyWord !== 0) {
        this.searchOptionDisplay = false

        return false
      }

      this.searchKeyuped = true

      setTimeout(() => {
        this.searchKeyuped = false
      }, SEARCH_KEY_UP_INTERVAL)

      this.searchOptionDisplay = true
      let realOptionItem = this.option

      if (this.classify || this.classifyOpt) {
        realOptionItem = this.optionItemCopy
      }

      this.searchOptionItem = realOptionItem.filter(item => {
        return item[this.txtName].indexOf(keyWord) > -1
      })

      if (this.searchOptionItem.length === 0) {
        this.searchOptionItem.push({
          [this.valName]: `${this.compPrefix}-menu: search not found`,
          [this.txtName]: '查无此数据',
          classify: true
        })
      }
    },

    /**
     *  观察 option
     */
    _watchOption() {
      this.unwatchOption = this.$watch('option', function (val, oldVal) {
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

      this.option = toBeOption

      return this
    },

    /**
     * 处理 classify 下拉框值
     *
     * @return {Array} optionTemp - 处理过的 option
     */
    _processClassifyOption(optionItem) {
      let optionTemp = []
      let allOptionTemp = []
      let allOption = []

      this.classify.forEach((item) => {
        optionTemp = optionTemp.concat([{
          [this.valName]: item.key,
          [this.txtName]: item.text,
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
        [this.valName]: 'all',
        [this.txtName]: '全部',
        classify: true
      }], allOption)

      this.optionItemCopy = allOption

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
          cb: (element) => {
            let scrollerComp = vm.$refs.option.$refs.list.$refs.scroller
            scrollerComp.initScroller()

            vm.menuHeight = scrollerComp.scrollerHeight
            vm.menuWidth = vm.$el.offsetWidth
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
          vm.$refs.menu.fold()
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
        value: this.value || [],
        text: [],
        replace: true
      })
    }

    this._initOption()
  },

  mounted() {
    if (this.$scopedSlots.custom) {
      this.customOptionDisplay = true
    }
  }
}

/**
 * menu 组件
 *
 * @prop classifyOpt - 分类下拉框的数据
 * @prop defaultVal - 默认的选项值
 * @prop defaultTxt - 默认的选项文本值
 * @prop initVal - 默认第一个显示的值
 * @prop initOpt - 下拉框的 option 数据
 * @prop queryName - 搜索参数名
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

import './menu.scss'

import Vue from 'vue'
import optionComp from './menu-opt'

import render from './menu.render'
import store from '../../../vuex/store'
import hubStore from '../../../vuex/module/hub/type.json'
import compStore from '../../../vuex/module/comp/type.json'
import tip from '../../base/message/tip'

import iconComp from '../../base/icon/icon'
import inputComp from '../../base/input/input'
import checkComp from '../../base/check/check'
import scrollerComp from '../../base/scroller/scroller'

import baseMixin from '../../../mixin/base'
import formMixin from '../../../mixin/form'
import apiMixin from './menu.api'
import transitionMixin from './transition.mixin'
import foldTransition from '../../transition/fold'

import uid from '../../../util/uid'
import { dataType } from '../../../util/data/data'
import { unique as uniqueArray } from '../../../util/data/array'

// 下拉框的 border 宽度
const MENU_BORDER_WIDTH = 1
// 搜索功能的函数节流的间隔时间
const SEARCH_KEY_UP_INTERVAL = 500

const menuComp = {
  name: 'menu',

  render,

  mixins: [baseMixin, formMixin, apiMixin, foldTransition],

  store,

  components: {
    'menu-opt': optionComp,
    'input-box': inputComp,
    'fold-transition': foldTransition,
    icon: iconComp,
    check: checkComp,
    scroller: scrollerComp
  },

  props: {
    initOpt: {
      type: Array,
      default: () => []
    },

    queryName: {
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
    // 组件名字
    this.compName = 'menu'
    // 组件唯一标识符
    this.uid = ''

    return {
      // props 里面 optionItem 的 data 替换值
      option: [],
      // optionItem 里面的全部的 value
      allOptionVal: [],
      // 当前下拉框的 text 值
      text: undefined,
      // 当前下拉框的 value 值
      value: undefined,
      // 是否以验证通过
      verified: true,
      // 下拉菜单的高度
      menuHeight: 0,
      // 下拉菜单的显示状态
      menuMenuDisplay: false,
      // 下拉菜单的样式
      menuMenuStyle: {
      },
      // 下拉菜单位置的样式
      menuMenuPoiStyle: {},
      // 是否是 slot 定义的 option
      hasSlotOption: false,
      // option 值的当前游标
      currentIndex: 0,
      // 搜索按键的状态
      searchKeyuped: false,
      // 是否显示搜索 optionItem
      searchOptionDisplay: false,
      // 搜索出来的 option
      searchOptionItem: {},
      // 取消观察 option
      unwatchOption: {},
      // 当下拉框为 classify 的时候，将 option 转换为数组
      optionItemCopy: {},
      // 是否全选多选下拉框的标记
      selectedAll: false,
      // 自定义下拉框的显示状态
      customOptionDisplay: false,
      // 下拉框显示过渡完成的标识符
      transitionFinish: false,
      // 正在处于 focus 状态
      focusing: false
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-menu`
    },
    me() {
      return this
    },
    // 组件 stage 的 class 的名字
    menuClass() {
      let classArr = [
        this.cPrefix,
        this.xclass(this.compClass),
        { [this.xclass('selecting')]: this.menuMenuDisplay },
        { [this.xclass('focusing')]: this.focusing },
        { [this.xclass('multiple')]: this.multiple }
      ]

      return classArr
    },
    // 自定义下拉框的显示状态
    isCustomOption() {
      return this.initOpt.length > 0 && this.customOptionDisplay
    },
    // 多选框的默认值显示状态
    initTxtDisplay() {
      return this.multiple && this.value.length === 0
    },
    // 下拉菜单是子标签加载
    isTagMenu(val) {
      return this.initOpt.length === 0 && !this.classify
    }
  },

  watch: {
    value(val) {
      if (this.multiple && this.selectAll) {
        this.selectedAll = val.length > 0 && val.length === this.allOptionVal.length
      }

      return this._initMenuTxt().$nextTick(() => {
        this._adjustmenuMenuPoiStyle()
      })
    },
    initVal(val) {
      this.value = this.multiple ? val.slice() : val
    },
    initOpt(val) {
      return this._processOption(val.slice())
    },
    classifyOpt(val) {
      return this._processOption(val)._initAllOptionVal()._initMenuTxt()
    },
    deviceSize(val) {
      this.changeByDeviceSize(val)
    }
  },

  methods: {
    _isUndefined(obj) {
      return dataType(obj) === 'undefined'
    },

    /**
     * 绑定事件
     */
    _binder() {
      if (!Array.isArray(this.option)) {
        return false
      }

      if (this.$refs.scroller) {
        this.$refs.scroller.$on('changeScroller', ({ boxHeight }) => {
          this._adjustmenuMenuPoiStyle({
            height: boxHeight
          })
        })

        this.$refs.scroller.$on('changeYBar', ({ boxHeight }) => {
          this._adjustmenuMenuPoiStyle({
            height: boxHeight
          })
        })
      }

      !this.isTagMenu && this.$refs.menuOption.$on('change', ({ value, text, index }) => {
        this.currentIndex = index
        let selectedItem = this._isExistedVal(value)

        if (this.multiple) {
          if (!selectedItem) {
            if (this.max !== 0 && this.value.length === this.max) {
              return false
            }

            return this.value.push(value)
          } else {
            return this.removeMultiSelected(selectedItem.index + 1)
          }
        } else {
          this.value = value

          return this.toggleMenuDisplay(false)
        }
      })
    },

    /**
     * 调整多选下拉框的选择值的样式
     */
    _adjustmenuMenuPoiStyle({ height, cb } = {}) {
      let menuHeight = height || this.$el.offsetHeight
      let menuWidth = this.$el.offsetWidth
      let over100 = menuHeight > 117
      let top = menuHeight
      let width = menuWidth
      menuHeight = over100 ? 117 : menuHeight

      if (this.multiple) {
        if (over100) {
          top = menuHeight
        } else {
          top = height ? menuHeight + MENU_BORDER_WIDTH * 2 : menuHeight
        }
      }

      this.menuMenuPoiStyle = {
        top: `${top}px`,
        width: `${width}px`
      }

      return cb && cb()
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
        return this._processOption(this.classifyOpt)._initAllOptionVal()._initMenuTxt()
      } else {
        let slotOption = this._initMenuSlot()
        if (slotOption) {
          this.option = slotOption
        }

        return this._processOption(this.option.slice())._initAllOptionVal()._initMenuTxt()
      }
    },

    /**
     * 初始化下拉菜单 slot 的 option
     *
     * @return { Array } optionItem - 返回在 slot 取得的 option
     */
    _initMenuSlot() {
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
        let text = attrs.text === undefined
          ? (children ? (children.text ? children.text : '(empty)') : '')
          : attrs.text

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
    _initMenuTxt() {
      if (this.multiple) {
        this._initMultipleMenuTxt()
      } else {
        this._initSingleMenuTxt()
      }

      return this
    },

    /**
     *  初始化多选下拉菜单
     */
    _initMultipleMenuTxt() {
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
    _initSingleMenuTxt(val, txt) {
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
    _setTxtVal({ value, text, replace = false }) {
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
          return this._processOption(val)._initAllOptionVal()._initMenuTxt()
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

export default menuComp

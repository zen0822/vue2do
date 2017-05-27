/**
 * select 组件
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
 * @porps classify - 有值（数组类型）就开启标题下拉框 option 分类模式
 * @prop multiple - 是为多选
 * @porps search - 开启搜索过滤
 *
 * @prop selectAll - 启动全选的功能
 * @prop selectAllTxt - 全选选项的名字
 *
 */

import './select.scss'

import Vue from 'vue'
import optionComp from './select-opt'

import render from './select.render'
import store from '../../../vuex/store'
import hubStore from '../../../vuex/module/hub/type.json'
import compStore from '../../../vuex/module/comp/type.json'
import tip from '../../base/pop/tip'
import compEvent from '../../../config/event.json'

import iconComp from '../../base/icon/icon'
import inputComp from '../../base/input/input'
import checkComp from '../../base/check/check'
import scrollerComp from '../../base/scroller/scroller'

import baseMixin from '../../../mixin/base'
import formMixin from '../../../mixin/form'

import uid from '../../../util/uid'
import { dataType } from '../../../util/data/data'
import { unique as uniqueArray } from '../../../util/data/array'

// 下拉框的 border 宽度
const SELECT_BORDER_WIDTH = 1
// 搜索功能的函数节流的间隔时间
const SEARCH_KEY_UP_INTERVAL = 500

const selectComp = {
  name: 'select',

  render,

  mixins: [baseMixin, formMixin],

  store,

  components: {
    'select-opt': optionComp,
    'input-box': inputComp,
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
    this.compName = 'select'
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
      // 下拉菜单的显示状态
      selectMenuDisplay: true,
      // 下拉菜单的样式
      selectMenuStyle: {},
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
      // 下拉菜单的高度
      menuHeight: 0
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-select`
    },
    me() {
      return this
    },
    // 组件 stage 的 class 的名字
    stageClass() {
      return [{
        [`${this.cPrefix}-selected`]: !this.selectMenuDisplay
      }, {
        [`${this.cPrefix}-multiple-stage`]: this.multiple
      }].concat(this.xclass(['stage', this.themeClass]))
    },
    // 自定义下拉框的显示状态
    isCustomOption() {
      return this.initOpt.length > 0 && this.customOptionDisplay
    },
    // 多选框的默认值显示状态
    initTxtDisplay() {
      return this.multiple && this.value.length === 0
    }
  },

  watch: {
    value(val) {
      if (this.multiple && this.selectAll) {
        this.selectedAll = val.length > 0 && val.length === this.allOptionVal.length
      }

      return this._initSelectTxt().$nextTick(() => {
        this._adjustselectMenuStyle()
      })
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

      this.$refs.scroller && this.$refs.scroller.$on(compEvent.scroller.change.bar.y, ({ boxHeight }) => {
        this._adjustselectMenuStyle({
          height: boxHeight
        })
      })

      this.$refs.selectOption && this.$refs.selectOption.$on(compEvent.select.option.change, ({ value, text, index }) => {
        this.currentIndex = index
        let selectedItem = this._isExistedVal(value)

        if (this.multiple) {
          if (!selectedItem) {
            if (this.max !== 0 && this.value.length === this.max) {
              return false
            }

            return this.value.push(value)
          } else {
            return this.removeMultiSelected(value, selectedItem.index)
          }
        } else {
          this.value = value

          return this.fold()
        }
      })
    },

    /**
     * 调整多选下拉框的选择值的样式
     */
    _adjustselectMenuStyle({ height, cb } = {}) {
      let selectHeight = height || this.$el.offsetHeight
      let selectWidth = this.$el.offsetWidth
      let over100 = selectHeight > 100
      selectHeight = over100 ? 100 : selectHeight
      let top = selectHeight + SELECT_BORDER_WIDTH * 2 + 1
      let width = selectWidth - SELECT_BORDER_WIDTH * 2

      if (this.multiple) {
        if (over100) {
          top = selectHeight + SELECT_BORDER_WIDTH * 2 + 3
        } else {
          top = height ? selectHeight + SELECT_BORDER_WIDTH * 2 + 3 : selectHeight + SELECT_BORDER_WIDTH * 2 + 1
        }
      }

      this.selectMenuStyle = {
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
          [this.valName]: `${this.compPrefix}-select: search not found`,
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
     * 下拉框显示过渡完成之后
     */
    transitionBeforeEnter(el) {
      el.style.height = 0
      this.transitionFinish = false
    },

    /**
     * 下拉框显示过渡
     */
    transitionEnter(el) {
      // 获取元素高度 触发回流
      let elHeight = el.offsetHeight

      el.style.height = `${this.menuHeight}px`
    },

    /**
     * 下拉框显示过渡完成之后
     */
    transitionAfterEnter(el) {
      el.style.height = ''
      this.transitionFinish = true
    },

    /**
     * 当设备改变尺寸
     */
    changeByDeviceSize(size) {
      return this._adjustselectMenuStyle()
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
    removeMultiSelected(val, index) {
      if (this.min !== 0 && this.value.length === this.min) {
        tip(`至少需选择 ${this.min} 项！`)

        const valTmp = this.value
        this.value = []
        this.value = valTmp

        return this.value
      }

      this.value.splice(index, 1)
    },

    /**
     * 移除 多选下拉框 已选的值
     *
     * @param {String, Number} - 多选下拉框的值
     */
    clickMultiSelected(event) {
      event.stopPropagation()

      return this.removeMultiSelected(event.currentTarget.getAttribute('data-index'))
    },

    /**
     * 点击父元素
     *
     */
    clickParent() {
      return this.toggleMenuDisplay(false)
    },

    /**
    * 下拉框展示失去焦点
    *
    * @return {Object} this - 组件
    */
    blur() {
      return false
    },

    /**
    * 下拉框展示的焦点
    *
    * @return {Object} this - 组件
    */
    focus() {
      return this.toggleMenuDisplay(true)
    },

    /**
     * 点击下拉框
     *
     * @return {Object} this - 组件
     */
    select(event) {
      event.stopPropagation()

      return this.toggleMenuDisplay()
    },

    /**
     * 下拉框的显示操作
     *
     * @param {Boolean} opt - 操作状态,
     *                        （false: 隐藏， true: 显示，undefined： 切换显示状态）
     *
     * @return {Object} - this组件
     */
    toggleMenuDisplay(opt) {
      let selectHub = this.$store.state.comp.select

      for (let name in selectHub) {
        if (selectHub.hasOwnProperty(name) && !Object.is(this, selectHub[name])) {
          selectHub[name].selectMenuDisplay = true
        }
      }

      return this._adjustselectMenuStyle({
        cb: () => {
          this.selectMenuDisplay = opt === undefined
            ? !this.selectMenuDisplay : !opt
        }
      })
    },

    /**
     * 收起下拉框
     *
     * @return {Object} - this - 组件
     */
    hideMenu() {
      this.selectMenuDisplay = true
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
     * 收起下拉框
     * @return {Object} this - 组件
     */
    fold() {
      this.selectMenuDisplay = true

      return this
    },

    /**
     * 展開下拉框
     * @return {Object} this - 组件
     */
    spread() {
      this.selectMenuDisplay = false

      return this
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

    this.$nextTick(() => {
      this.menuHeight = parseFloat(getComputedStyle(this.$refs.selectMenu).height)
    })
  }
}

export default selectComp

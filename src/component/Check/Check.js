/*
 * check - 多选框组件
 *
 * @prop checkAll - 全选 checkbox 的选项
 * @prop checkAllLabel - 全选 checkbox 的选项的 label
 * @prop errorText - checkbox 没选的时候显示的错误文本
 * @prop option - 选择框数据
 *              ex: [{
 *                    value: 1,
 *                    text: 'a',
 *                    disabled: true // 不传默认是 false
 *                  }]
 * @prop multiple - 是否为多选
 * @prop required - 是否必选
 * @prop param - 参数名
 * @prop txtName - 指定读取 checkboxItems 的 text 值的 key 的名字
 * @prop value - 初始化时选中的值，默认为第一项， 是checkbox 則為數組
 * @prop valueName - 指定读取 checkboxItems 的 value 值的 key 的名字
 * @prop vertical - 选择框是否垂直分布（默认 false，是水平分布）
 *
 * @event check - 点击选择事件
 */

import './Check.scss'
import './Check.material.scss'
import './Check.bootstrap.scss'

import render from './Check.render'

import Col from '../Col/Col'
import Row from '../Row/Row'
import Icon from '../Icon/Icon'
import MotionRip from '../MotionRip/MotionRip'

import baseMixin from '../../mixin/base'
import formMixin from '../../mixin/form'
import apiMixin from './Check.api.js'

import {
  isEmpty as isEmptyArray
} from '../../util/data/array'

let checkCompConfig = {
  name: 'Check',

  mixins: [baseMixin, formMixin, apiMixin],

  render,

  components: {
    column: Col,
    row: Row,
    icon: Icon,
    'motion-rip': MotionRip
  },

  props: {
    checkAll: {
      type: Boolean,
      default: false
    },
    checkAllLabel: {
      type: String,
      default: '全选'
    },
    errorText: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    option: {
      type: Array,
      default: () => [],
      validator(val) {
        return Array.isArray(val)
      }
    },
    param: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    txtName: {
      type: String,
      default: 'text'
    },
    value: [Number, Array],
    valueName: {
      type: String,
      default: 'value'
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      compName: 'check', // 组件名字
      index: {}, // 当前已选的选择框的 index，多选是数组(默认：[])，单选是数字(默认：-1) TODO:有空实现以 index 来判断已选框
      oldIndex: {},
      stateValue: {}, // check 当前 value 值
      text: {}, // check 当前 text 值, 多选默认是 [], 单选是 'undefined'
      stateOption: [], // check 的选项值
      oldValue: [], // check 的旧的 value 值
      verified: true, // 组件的验证状态
      optionFocus: [], // 选择框组的 focus 状态
      focusedCheckAll: false, // 全选选择框的 focus 状态
      allowFocus: true, // 允许执行 focus 事件
      dangerTip: '',
      slotItems: []
    }
  },

  computed: {
    cPrefix() {
      return `${this.compPrefix}-check`
    },
    isCheckbox() {
      return this.multiple
    },
    isRadio() {
      return !this.multiple
    },
    checkedAll() { // 是否已经全选
      if (this.checkAll && this.multiple) {
        return this.index.length === this.stateOption.length
      }
    },
    checkedSome() { // 是否只选择了一部分的子选择框
      if (this.checkAll && this.multiple) {
        return this.index.length < this.stateOption.length && this.index.length > 0
      }
    },
    checkIconName() {
      switch (this.ui) {
        case 'bootstrap':
          return {
            radio: {
              uncheck: 'circle',
              checked: 'circle-check'
            },
            checkbox: {
              uncheck: 'square-bs',
              checked: 'square-check-bs',
              indeterminate: 'square-indeterminate-bs'
            }
          }
        case 'material':
        default:
          return {
            radio: {
              uncheck: 'circle-o',
              checked: 'circle-check-o'
            },
            checkbox: {
              uncheck: 'square-o',
              checked: 'square-check'
            }
          }
      }
    }
  },

  watch: {
    value(val) {
      this.stateValue = val
      this._initCheckbox()
    },
    option(val) {
      this.stateOption = val
      this._initCheckbox()
    }
  },

  methods: {
    /**
     * 设置 data 选项的默认值
     */
    _setDataOpt() {
      if (this.value === undefined) {
        this.stateValue = this.isCheckbox ? [] : -1
      } else {
        this.stateValue = this.isCheckbox ? this.value.slice() : this.value
      }

      this.index = this.isCheckbox ? [] : undefined
      this.text = this.isCheckbox ? [] : undefined

      this.stateOption = Object.assign([], this.option)
      this.optionFocus = this.option.map(() => {
        return false
      })
    },

    /**
     * 获取选择框的图标名字
     *
     * @param {Boolean} checked - 选择状态
     * @param {Boolean} multiple - 复选框
     */
    _getIconName(checked = false, indeterminate = false, multiple = this.multiple) {
      if (multiple) {
        if (indeterminate) {
          return this.checkIconName.checkbox.indeterminate
        }

        return checked ? this.checkIconName.checkbox.checked :
          this.checkIconName.checkbox.uncheck
      } else {
        return checked ? this.checkIconName.radio.checked :
          this.checkIconName.radio.uncheck
      }
    },

    /**
     * 初始化checkbox
     **/
    _initCheckbox() {
      this.setIndex()
      this.setText()

      this.verified = !this.required || (this.isCheckbox ? this.stateValue.length !== 0 : this.stateValue !== 'undefined')
    },

    /**
     * 初始化checkboxItems值
     *
     * @return {Function, Object}
     **/
    _initCheckboxItems() {
      if (!this._slotContents && !(!!this.$options._content && this.$options._content.innerHTML)) {
        return false
      }

      let $checkboxSlot = {}
      let optionContent = this.$options._content ? this.$options._content.innerHTML : ''
      let $checkboxItemSlot = $(this.$el).find('.checkbox-items-slot')

      if (optionContent) {
        $checkboxSlot = $checkboxItemSlot.html(optionContent)
      } else {
        console.warn('vm.$options._content 取不到值, 需要修复，没值情况下的问题')
        $checkboxSlot = $checkboxItemSlot.html(this._slotContents.default)
      }

      let $checkEles = $checkboxSlot.find('check-ele')

      if ($checkEles.length === 0) {
        return this
      }

      let items = []
      let checkboxItemsEmpty = isEmptyArray(this.stateOption)

      $checkEles.each((index, el) => {
        let $el = $(el)
        let val = $el.attr('value')
        let txt = ''

        val = isNaN(val) ? val : Number(val)

        if ($el[0].hasAttribute('text')) {
          txt = $el.attr('text').trim()

          // 不让生成 html 有 text 节点
          this.slotItems.push($el.html().trim())
        } else {
          txt = $el.text().trim()
        }

        if (checkboxItemsEmpty) {
          items.push({
            value: val,
            text: txt
          })
        }
      })

      $checkboxItemSlot.html('')
      checkboxItemsEmpty && this.$set('checkboxItems', items)

      this.$nextTick(() => {
        this._initCheckboxSlot()
      })

      return this
    },

    /**
     * 初始化checkboxItems 里面的 slot
     */
    _initCheckboxSlot() {
      if (this.slotItems.length === 0) {
        return false
      }

      if (typeof this.compileVm === 'undefined') {
        this.compileVm = this.$parent
      }

      $(this.$el).find(`.${this.cPrefix}-opt-slot .item`).each((index, el) => {
        if (this.slotItems[index]) {
          let dom = document.createElement('div')

          dom.innerHTML = this.slotItems[index]
          this.compileVm.$compile(dom)
          el.appendChild(dom.firstChild)
        }
      })
    },

    /**
     * 删除或者增加复选 checkbox 的 value 值
     *
     * @param {String, Number} - checkbox 的值
     * @param {Number} - checkbox 选项的索引值
     */
    _changeCheckbox(index, val) {
      let hasDelflag = false

      this.stateValue.every((item, index) => {
        if (val === item) {
          hasDelflag = true

          this.stateValue.splice(index, 1)
          this.index.splice(index, 1)

          return false
        }

        return true
      })

      if (hasDelflag) {
        return this
      }

      this.stateValue.push(val)
      this.index.push(index)
    },

    /**
     * click 事件句柄
     */
    _handlerClick(event, index) {
      this.check(event, index)
    },

    /**
     * Mousedown 事件句柄
     */
    _handlerMousedown(event, index) {
      if (this.inTouch) {
        return false
      }

      this.allowFocus = false
    },

    /**
     * Mouseup 事件句柄
     */
    _handlerMouseup(event, index) {
      if (this.inTouch) {
        return false
      }

      this.allowFocus = true
    },

    /**
     * Keyup 事件句柄
     */
    _handlerKeyup(event, index) {
      if (event.keyCode === 13) {
        return this.check(event, index)
      }
    },

    /**
     * focus 事件句柄
     */
    _handlerFocus(event, index) {
      if (this.allowFocus) {
        this.optionFocus.splice(index - 1, 1, true)
      }
    },

    /**
     * blur 事件句柄
     */
    _handlerBlur(event, index) {
      this.optionFocus.splice(index - 1, 1, false)
    },

    /**
     * 全选 Mousedown 事件句柄
     */
    _handlerMousedownCheckAll(event) {
      if (this.inTouch) {
        return false
      }

      this.allowFocus = false
    },

    /**
     * 全选 Mouseup 事件句柄
     */
    _handlerMouseupCheckAll(event) {
      if (this.inTouch) {
        return false
      }

      this.allowFocus = true
    },

    /**
     * 全选 focus 事件句柄
     */
    _handlerFocusCheckAll(event) {
      if (this.allowFocus) {
        this.focusedCheckAll = true
      }
    },

    /**
     * 全选 blur 事件句柄
     */
    _handlerBlurCheckAll(event) {
      this.focusedCheckAll = false
    }
  },

  created() {
    this._initCheckboxItems()
    this._initCheckbox()
  }
}

export default checkCompConfig

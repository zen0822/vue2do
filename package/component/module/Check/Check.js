/**
 * check - 多选框组件
 *
 * @prop checkAll - 全选 checkbox 的选项
 * @prop checkAllLabel - 全选 checkbox 的选项的 label
 * @prop checkAllDisabled - 全选 checkbox 的选项禁用
 * @prop multiple - 是否为多选
 * @prop option - 选择框数据
 *              ex: [{
 *                    value: 1,
 *                    text: 'a',
 *                    disabled: true // 默认是 false
 *                  }]
 * @prop param - 参数名
 * @prop required - 是否必选
 * @prop textName - 指定读取 checkboxItems 的 text 值的 key 的名字
 * @prop value - 初始化时选中的值，默认为第一项， 是checkbox 則為數組
 * @prop valueName - 指定读取 checkboxItems 的 value 值的 key 的名字
 * @prop vertical - 选择框是否垂直分布（默认 false，是水平分布）
 * @prop verifiedHint - checkbox 验证时候显示的错误提示（是跟 form 组件搭配使用得）
 *
 * @event click - 点击选择事件
 * @event change - 选择框的值变化
 *
 * @method check - 选择指定值得选择框
 * @method verify - 验证选择框
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
import apiMixin from './Check.method.js'

import {
  isEmpty as isEmptyArray
} from '../../util/data/array'

const checkCompConfig = {
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
    checkAllDisabled: {
      type: Boolean,
      default: false
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
    textName: {
      type: String,
      default: 'text'
    },
    value: [Number, Array],
    valueName: {
      type: String,
      default: 'value'
    },
    verifiedHint: {
      type: String,
      default: ''
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
    },
    stateValue(val) {
      this.$emit('change', {
        value: val,
        index: this.index
      })
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
      this._setIndex()
      this._setText()

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
      const optionContent = this.$options._content ? this.$options._content.innerHTML : ''
      const $checkboxItemSlot = $(this.$el).find('.checkbox-items-slot')

      if (optionContent) {
        $checkboxSlot = $checkboxItemSlot.html(optionContent)
      } else {
        console.warn('vm.$options._content 取不到值, 需要修复，没值情况下的问题')
        $checkboxSlot = $checkboxItemSlot.html(this._slotContents.default)
      }

      const $checkEles = $checkboxSlot.find('check-ele')

      if ($checkEles.length === 0) {
        return this
      }

      const items = []
      const checkboxItemsEmpty = isEmptyArray(this.stateOption)

      $checkEles.each((index, el) => {
        const $el = $(el)
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
          const dom = document.createElement('div')

          dom.innerHTML = this.slotItems[index]
          this.compileVm.$compile(dom)
          el.appendChild(dom.firstChild)
        }
      })
    },

    /**
     * 删除或者增加复选 checkbox 的 value 值
     *
     * @param {Number} - checkbox 选项的索引值
     * @param {String, Number} - checkbox 的值
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
     * 执行选择功能
     *
     * @param {Object} event
     * @param {Number} index
     */
    async _check(event, index) {
      const option = this.stateOption[index - 1]
      const val = option[this.valueName]

      if (this.isCheckbox) {
        this.oldValue = []

        this.stateValue.forEach((item) => {
          this.oldValue.push(item)
        })

        this._changeCheckbox(index - 1, val)
      } else {
        this.oldValue = this.stateValue

        this.stateValue = val
      }

      this._initCheckbox()
      await this.$nextTick()

      this.$emit('click', {
        index,
        event,
        value: this.value
      })

      this.UIMaterial && this.$refs[`motionCheck${index}`].enter()
    },

    /**
     * 执行全选复选框
     *
     * @return {Object} - this - 组件
     */
    async _checkAllOption() {
      const value = []

      this.option.forEach((item) => {
        value.push(item[this.valueName])
      })

      if (this.checkedAll) {
        this.stateValue = []
      } else {
        this.stateValue = value
      }

      this._initCheckbox()

      await this.$nextTick()

      this.UIMaterial && this.$refs.motionCheckAll.enter()
    },

    /**
     * 设置checkbox的text值
     *
     * @return {Function, String}
     **/
    _setText() {
      if (this.isRadio) {
        this.oldText = this.text

        this.text = this.index === -1 ?
          'undefined' :
          this.stateOption[this.index][this.textName]

        return this
      } else {
        this.oldText = this.text.slice()
        const checkboxText = []

        this.index.forEach((item) => {
          checkboxText.push(this.stateOption[item][this.textName])
        })

        this.text = checkboxText
      }
    },

    /**
     * 设置 currentIndex
     *
     * @return {Function, Object}
     **/
    _setIndex() {
      if (this.isRadio) {
        this.oldIndex = this.index

        return this.stateOption.every((item, index) => {
          if (item[this.valueName] === this.stateValue) {
            this.index = index

            return false
          }

          return true
        })
      } else {
        this.oldIndex = this.index.slice()
        const checkboxIndex = []

        this.stateValue.forEach((item) => {
          this.stateOption.forEach((ele, index) => {
            if (item === ele[this.valueName]) {
              checkboxIndex.push(index)
            }
          })
        })

        this.index = checkboxIndex
      }
    },

    /**
     * click 事件句柄
     */
    _handlerClick(event, index) {
      return this._check(event, index)
    },

    /**
     * Mousedown 事件句柄
     */
    _handlerMousedown() {
      if (this.inTouch) {
        return false
      }

      this.allowFocus = false
    },

    /**
     * Mouseup 事件句柄
     */
    _handlerMouseup() {
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
        return this._check(event, index)
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
    _handlerMousedownCheckAll() {
      if (this.inTouch) {
        return false
      }

      this.allowFocus = false
    },

    /**
     * 全选 Mouseup 事件句柄
     */
    _handlerMouseupCheckAll() {
      if (this.inTouch) {
        return false
      }

      this.allowFocus = true
    },

    /**
     * 全选 focus 事件句柄
     */
    _handlerFocusCheckAll() {
      if (this.allowFocus) {
        this.focusedCheckAll = true
      }
    },

    /**
     * 全选 blur 事件句柄
     */
    _handlerBlurCheckAll() {
      this.focusedCheckAll = false
    },

    /**
     * 全选 keyup 事件句柄
     */
    _handlerKeyupCheckAll(event) {
      if (event.keyCode === 13) {
        return this._checkAllOption()
      }
    }
  },

  created() {
    this._initCheckboxItems()
    this._initCheckbox()
  }
}

export default checkCompConfig

/*
 * check - 多选框组件
 *
 * @prop initVal - 初始化时选中的值，默认为第一项， 是checkbox 則為數組
 * @prop param - 参数名
 * @prop initOpt - 复选框数据
 * @prop readOnly - 只读
 * @prop required - 是否必选
 * @prop theme - 主题
 * @prop multiple - 是否为多选
 *
 * @prop errorMessage - checkbox 没选的时候显示的错误信息
 * @prop valName - 指定读取 checkboxItems 的 value 值的 key 的名字
 * @prop txtName - 指定读取 checkboxItems 的 text 值的 key 的名字
 *
 * @prop beforeCheck - 选择之前的钩子函数
 * @prop success - 选择成功的回调函数
 *
 * @prop checkAll - 全选 checkbox 的选项
 *
 */

import './Check.scss'
import './Check.material.scss'
import './Check.bootstrap.scss'

import Vue from 'vue'
import render from './Check.render'
import compEvent from '../../config/event.json'

import Col from '../Col/Col'
import Row from '../Row/Row'
import Icon from '../Icon/Icon'
import MotionRip from '../MotionRip/MotionRip'

import tip from '../Message/tip'

import baseMixin from '../../mixin/base'
import formMixin from '../../mixin/form'
import apiMixin from './Check.api.js'

import {
  isEmpty as isEmptyArray
} from '../../util/data/array'

const TYPE_RADIO = 'radio'
const TYPE_CHECKBOX = 'checkbox'

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
    initOpt: {
      type: Array,
      default: () => []
    },
    inputName: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    param: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    initVal: [Number, Array],
    beforeCheck: Function,
    success: Function,
    valName: {
      type: String,
      default: 'value'
    },
    txtName: {
      type: String,
      default: 'text'
    },
    checkAll: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      compName: 'check', // 组件名字
      index: {}, // 当前已选的选择框的 index，多选是数组，单选是数字 TODO:有空实现以 index 来判断已选框
      value: {}, // check 当前 value 值
      text: {}, // check 当前 text 值
      option: [], // check 的选项值
      oldValue: [], // check 的旧的 value 值
      verified: true, // 组件的验证状态
      motion: [], // 启动选择框的沦漪效果
      allowFocus: true, // 允许执行 focus 事件
      dangerTip: '',
      slotItems: [],
      checkedAll: false // 是否已经全选
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
    }
  },

  watch: {
    value(val) {
      this._initCheckbox()
    },
    initVal(val) {
      this.value = val
    },
    initOpt(val) {
      this.option = val
      this._initCheckbox()
    }
  },

  methods: {
    /**
     * 设置 data 选项的默认值
     */
    _setDataOpt() {
      if (typeof this.initVal === 'object') {
        this.value = Object.assign([], this.initVal)
      } else {
        this.value = this.initVal
      }

      this.option = Object.assign([], this.initOpt)
      this.motion = this.initOpt.map(() => {
        return false
      })
    },

    /**
     * 初始化checkbox
     *
     * @return {Function}
     **/
    _initCheckbox() {
      if (this.isCheckbox) {
        if (!Array.isArray(this.value)) {
          this.index = []
          this.text = []
          this.value = []
          this.oldValue = []
        }

        if (this.checkAll) {
          this.checkedAll = this.value.length === this.option.length
        }

        this.setText()
        this.verified = !this.required || this.value.length !== 0
      } else {
        if (!this.value && this.value !== 0) {
          this.index = undefined
          this.value = undefined
          this.oldValue = undefined
        } else {
          this.setIndex()
          this.setText()
        }

        if (this.required) {
          this.verified = this.value !== 'undefined'
        }
      }
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
      let checkboxItemsEmpty = isEmptyArray(this.option)

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
          let $el = $(el)
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
     */
    _changeCheckbox(val) {
      let hasDelflag = false

      this.value.every((item, index) => {
        if (val === item) {
          hasDelflag = true
          this.value.splice(index, 1)

          return false
        }

        return true
      })

      if (hasDelflag) {
        return this
      }

      return this.value.push(val)
    },

    /**
     * click 事件句柄
     */
    _handlerClick(event, index) {
      this.check(event, index)
      this.motion.splice(index - 1, 1, false)
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
        this.motion.splice(index - 1, 1, true)
      }
    },

    /**
     * blur 事件句柄
     */
    _handlerBlur(event, index) {
      this.motion.splice(index - 1, 1, false)
    }
  },

  created() {
    this._initCheckboxItems()

    this._initCheckbox()
  }
}

export default checkCompConfig

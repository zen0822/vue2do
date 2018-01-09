/**
 * input 组件
 *
 * @prop block - 将宽度设置为和父元素一样
 * @prop hidden - 设置为隐藏域
 * @prop initVal - 设置当前输入框的值
 * @prop label - 输入框的标签
 * @prop multiline - type 为 field 可以输入多行文本
 * @prop number - 输入框的数字指定为 nmuber 类型
 * @prop placeholder - 占位符
 * @prop param - 查询参数名
 * @prop readOnly - 只读，不能編輯
 * @prop required - 是否为必填，默认否
 * @prop row - textarea 的行数
 * @prop textLengthTip - 显示当前输入的长度
 * @prop type - 输入框类型( field | area )
 *
 * @prop completion - 是否启用自动搜索补全功能
 * @prop errorMessage - input 为空和格式不对的错误信息
 * @prop errorTipType - 弹出错误提示的类型（ bubble | tip ）
 * @prop formatMessage - 格式错误的提示信息
 * @prop min - input，textarea 可输入最小长度（数字）
 * @prop max - input，textarea 可输入最大长度（数字）
 * @prop minNum - input，textarea 可输入最小数字
 * @prop maxNum - input，textarea 可输入最大数字
 * @prop regex - 验证值的正则
 * @prop verifiedType - 验证值的类型
 *
 * @prop headerSpan - 输入框头附加项的横向阑珊格
 * @prop footerSpan - 输入框尾附加项的横向阑珊格
 *
 * @event change - input的值改变
 * @event blur - input的blur
 * @event focus - input的focus
 * @event keyup - input的keyup
 *
 * @slot header
 * @slot footer
 */

import './Input.scss'
import './Input.material.scss'
import './Input.bootstrap.scss'
import render from './Input.render'

import store from '../../vuex/store'
import hubStore from '../../vuex/module/hub/type.json'
import initVerfication from './validate.js'

import baseMixin from '../../mixin/base'
import formMixin from '../../mixin/form'
import apiMixin from './Input.api'

import rowComp from '../Row/Row'
import colComp from '../Col/Col'

import {
  dataType
} from '../../util/data/data'
import tip from '../Message/tip'

const TYPE_TEXT_AREA = 'area'
const TYPE_TEXT = 'field'
const ERROR_MESSAGE_TIP = 'tip'
const ERROR_MESSAGE_BUBBLE = 'bubble'
const KEYUP_INTERVAL_TIME = 100

export default {
  name: 'Input',

  render,

  mixins: [baseMixin, formMixin, apiMixin],

  components: {
    row: rowComp,
    column: colComp
  },

  store,

  props: {
    block: {
      type: Boolean,
      default: false
    },
    hidden: {
      type: Boolean,
      default: false
    },
    initVal: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    multiline: {
      type: Boolean,
      default: false
    },
    number: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    param: {
      type: String,
      default: ''
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    row: {
      type: Number,
      default: 4
    },
    textLengthTip: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'field'
    },
    required: {
      type: Boolean,
      default: true
    },
    errorMessage: {
      type: String,
      default: ''
    },
    errorTipType: {
      type: String,
      default: 'tip'
    },
    formatMessage: String,
    min: Number,
    max: Number,
    minNum: Number,
    maxNum: Number,
    regex: String,
    verifiedType: String,
    completion: {
      type: Boolean,
      default: false
    },
    headerSpan: {
      type: Number,
      default: 1
    },
    footerSpan: {
      type: Number,
      default: 1
    }
  },

  data() {
    this.compName = 'input' // 组件名字

    return {
      value: this.number ? this._switchNum(this.initVal) : this.initVal, // 输入框的当前的值
      focusing: false, // 输入框是否处于 focus 状态
      keyuping: false, // 是否处于 keyup 状态
      dangerTip: '', // 错误信息提示信息
      dataTypeName: '', // 数据类型的名称
      verified: true, // 是否验证通过
      bubbleDisplay: false, // 冒泡的错误提示显示状态
      inputTextLength: 0, // 当前输入框值的长度
      errorBorderDisplay: false // 错误提示框的显示状态
    }
  },

  computed: {
    cPrefix() { // 组件类名的前缀
      return `${this.compPrefix}-input`
    },
    _formatMessage() { // 格式不对的报错信息
      return this.errorMessage ? this.errorMessage + '格式不对' : this.dataTypeName + '格式不对'
    },
    placeholderDisplay() { // 输入框占位符的显示状态
      const empty = this.value === '' || this.value === undefined

      if (this.UIMaterial) {
        if (this.label) {
          return this.focusing && empty
        } else {
          return empty
        }
      } else {
        return empty
      }
    },
    labelFloatDisplay() { // 输入框标签浮动的状态
      if (this.focusing) {
        return true
      } else {
        return !(this.value === '' || this.value === undefined)
      }
    },
    dangerTipDisplay() {
      return !!this.dangerTip && this.bubbleDisplay
    },
    isTextarea() {
      return this.type === TYPE_TEXT_AREA
    },
    isText() {
      return this.type === TYPE_TEXT
    },
    inputHub() {
      return this.$store.getters[hubStore.input.get]
    },
    stageClass() { // 组件 stage 的 class 名字
      return [{
        [`${this.cPrefix}-textarea-stage`]: this.isTextarea
      }]
    },
    wrapClass() {
      return [
        this.xclass('wrap'),
        {
          [`${this.cPrefix}-editting`]: this.focusing
        },
        {
          [`${this.cPrefix}-error-border`]: this.errorBorderDisplay
        }
      ]
    },
    inputBoxCol() { // input 的阑珊的格数
      let slotHead = this.$slots.header
      let slotTail = this.$slots.footer

      if (slotHead && slotTail) {
        return 12 - this.footerSpan - this.headerSpan
      } else if (slotHead) {
        return 12 - this.headerSpan
      } else if (slotTail) {
        return 12 - this.footerSpan
      } else {
        return 12
      }
    }
  },

  watch: {
    initVal(val, oldVal) {
      this.value = val
    },
    value(val, oldVal) {
      // 限制长度显示
      this.limitLen = String(val).length

      if (this.completion && this.$slots.completion) {
        this.$slots.completion[0].componentInstance.search(val)
      }

      this._dispatchChange()
    }
  },

  methods: {
    /**
     * 初始化验证规则
     * @return {Object} this - 组件
     */
    _initVerfication() {
      if (this.regex) {
        this.regexObj = new RegExp(this.regex)

        return this
      }

      var verify = initVerfication(this.verifiedType)

      if (verify) {
        this.regexObj = verify.regex
        this.dataTypeName = verify.dataTypeName
      }

      return this
    },

    /**
     * 初始化验证的提示信息
     * @return {Object} this - 组件
     */
    _initVerfiedMessage() {
      let errorMessage = this.errorMessage

      if (errorMessage) {
        this.emptyMessage = errorMessage
        this.lengthMessage = errorMessage

        return this
      }

      this.emptyMessage = this.errorMessage ? this.errorMessage : '不能为空'
      this.lengthMessage = this.errorMessage ? this.errorMessage : '长度超过限制'

      return this
    },

    /**
     * 派送 value 的 change 事件
     * @return {Object} this - 组件
     */
    _dispatchChange() {
      return this.$emit('change', {
        emitter: this,
        value: this.value
      })
    },

    /**
     * 验证数据是否为空
     *
     * @return {Object} -
     *                  verified - 验证情况
     *                  dangerTip - 错误提示
     */
    _verifyEmpty(firstVerify) {
      let dangerTip = ''

      if (this.required) {
        if (this.bubbleDisplay) {
          dangerTip = firstVerify ? '' : `请输入${this.emptyMessage}!`
        } else {
          dangerTip = `请输入${this.emptyMessage}!`
        }

        return {
          verified: false,
          dangerTip
        }
      }

      return {
        verified: true,
        dangerTip
      }
    },

    /**
     * 转换为纯数字 - 超过 16 位存储为字符串
     */
    _switchNum(val) {
      if (val === 0 || val === '0') {
        return 0
      }

      let strTemp = String(val)

      if (isNaN(strTemp)) {
        let temp = strTemp

        strTemp = strTemp.replace(/[^\d.]+/g, '')

        if (temp.indexOf('-') === 0) {
          strTemp = '-' + strTemp
        }
      }

      if (isNaN(strTemp)) {
        strTemp = ''
      }

      if (val.length >= 16) {
        return strTemp
      }

      return Number(strTemp)
    },

    /**
     * 输入框 focus 状态触发的方法
     * @return {Object} this - 组件
     */
    _handlerFocus(evt) {
      this.errorBorderDisplay = false
      this.verified = true
      this.focusing = true

      return this.$emit('focus', {
        emitter: this,
        valeu: this.value,
        event: evt
      })
    },

    /**
     * 输入框 blur 状态触发的方法
     * @return {Object} this - 组件
     */
    _handlerBlur(evt) {
      this.focusing = false

      if (this.number) {
        this.value = this._switchNum(this.value)
      }

      return this.$emit('blur', {
        emitter: this,
        valeu: this.value,
        event: evt
      })
    },

    /**
     * 输入框 keyup 状态触发的方法
     * @return {Object}
     */
    _handlerKeyup() {
      if (this.keyuping) {
        return false
      }

      this.keyuping = true

      setTimeout(() => {
        this.keyuping = false
      }, KEYUP_INTERVAL_TIME)
    },

    /**
     * input 时间句柄
     * @return {Object}
     */
    _handlerInput(event) {
      this.value = this.multiline ?
        event.currentTarget.innerText :
        event.currentTarget.value
    }
  },

  created() {
    this.bubbleDisplay = this.errorTipType !== ERROR_MESSAGE_TIP
  },

  mounted() {
    this._initVerfication()
    this._initVerfiedMessage()

    this.$store.dispatch(hubStore.input.add, this)
  }
}

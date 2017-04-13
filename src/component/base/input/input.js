/**
 * input 组件
 *
 * @props hidden - 设置为隐藏域
 * @props initVal - 设置当前输入框的值
 * @props number - 输入框的数字指定为 nmuber 类型
 * @props placeholder - 占位符
 * @props queryName - 查询参数名
 * @props readOnly - 只读，不能編輯
 * @props row - textarea 的行数
 * @props textLengthTip -显示当前输入的长度
 * @props type - 输入框类型( text | textarea )
 * @props theme - 主题
 *
 * @props empty - 是否可以为空，默认是
 * @props errorTipName - 组件显示错误提示时候的名字
 * @props errorMessage - input 为空和格式不对的错误信息
 * @props errorTipType - 弹出错误提示的类型（ bubble | tip ）
 * @props formatMessage - 格式错误的提示信息
 * @props maxLength - input，textarea 可输入最大长度
 * @props regex - 验证值的正则
 * @props verifedType - 验证值的类型
 *
 * @props completion - 是否启用自动搜索补全功能
 * @props completionUrl - 补全搜索的url
 * @props completionItems - 搜索补全的值
 * @props completionProcessor - 处理搜索的补全数据的钩子
 * @props completionKeyName - 搜索到的补全值的 key 名字
 *
 * @events change - inputBox的值改变
 * @events blur - inputBox的blur
 * @events focus - inputBox的focus
 * @events keyup - inputBox的keyup
 * @events inputBoxEvent.completion.click - 点击补全搜索的下拉框触发的事件
 * @events inputBoxEvent.completion.change - 补全搜索的下拉框的值改变的事件
 *
 */

import './input.scss'
import render from './input.render'

import store from 'src/vuex/store'
import hubStore from 'src/vuex/module/hub/type.json'
import initVerfication from './validate.js'

import baseMixin from 'src/mixin/base'
import formMixin from 'src/mixin/form'

import rowComp from 'src/component/common/layout/row/row'
import colComp from 'src/component/common/layout/col/col'

import { dataType } from 'src/util/data/data'

const tip = {}

const KEYUP_INTERVAL_TIME = 500
const TYPE_TEXT_AREA = 'textarea'
const TYPE_TEXT = 'text'
const ERROR_MESSAGE_TIP = 'tip'
const ERROR_MESSAGE_BUBBLE = 'bubble'

const inputComp = {
  name: 'input',

  render,

  mixins: [baseMixin, formMixin],

  components: {
    row: rowComp,
    column: colComp
  },

  store,

  props: {
    hidden: {
      type: Boolean,
      default: false
    },

    initVal: {
      type: [String, Number],
      default: ''
    },

    number: {
      type: Boolean,
      default: false
    },

    placeholder: {
      type: String,
      default: ''
    },

    queryName: {
      type: String,
      default: ''
    },

    errorTipName: String,

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
      default: 'text'
    },

    empty: {
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

    maxLength: Number,

    regex: String,

    verifedType: String,

    completion: {
      type: Boolean,
      default: false
    },

    completionItems: {
      type: Array,
      default: () => []
    },

    completionUrl: {
      type: String,
      default: ''
    },

    completionKeyName: {
      type: String,
      require: true
    },

    completionProcessor: Function
  },

  data() {
    return {
      // 组件名字
      compName: 'input',
      // 输入框的当前的值
      value: this.number ? this._switchNum(this.initVal) : this.initVal,
      // 输入框是否处于 focus 状态
      focusing: false,
      // 是否处于 keyup 状态
      keyuping: false,
      // 错误信息提示信息
      dangerTip: '',
      // 补全信息的显示状态
      completionDisplay: false,
      // 数据类型的名称
      dataTypeName: '',
      // 是否验证通过
      verified: true,
      // 当前补全搜索的值
      currentCompletionIndex: 'undefined',
      // 冒泡的错误提示显示状态
      bubbleDisplay: false,
      // 当前输入框值的长度
      inputTextLength: 0,
      staticCompletionItems: this.completionItems.slice()
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-input`
    },
    // 格式不对的报错信息
    _formatMessage() {
      return this.errorMessage ? this.errorMessage + '格式不对' : this.dataTypeName + '格式不对'
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
    errorBorderDisplay() {
      return !this.verified
    },
    inputHub() {
      return this.$store.getters[hubStore.input.get]
    },
    // 组件 stage 的 class 名字
    stageClass() {
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
    // input 的阑珊的格数
    inputBoxCol() {
      let slotHead = this.$slots.head
      let slotTail = this.$slots.tail

      if (slotHead && slotTail) {
        return 10
      } else if (slotHead || slotTail) {
        return 11
      } else {
        return 12
      }
    }
  },

  methods: {
    /**
     * 初始化验证规则
     * @return {Object} this - 组件
     */
    _initVerfication() {
      if (this.regex) {
        this.regex = new RegExp(this.regex)

        return this
      }

      var verify = initVerfication(this.verifedType)

      if (verify) {
        this.regex = verify.regex
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
     * 获取搜索补全的数据
     * @return {Object} this - 组件
     */
    _fetchCompletion(key) {
      if (!this.completion) {
        this.completionDisplay = this.completionItems.length !== 0

        return false
      }

      if (this.completion && !this.completionUrl) {
        this.completionItems = this.staticCompletionItems.filter((item) => {
          return item.text.indexOf(key) > -1
        })

        this._processCompletion()
        this.completionDisplay = this.completionItems.length !== 0

        return
      }

      $.ajax({
        type: 'get',
        url: this.completionUrl,
        data: {
          [this.completionKeyName]: key
        },
        success: (result) => {
          if (result.code === 0) {
            this.completionItems = result.data
            this._processCompletion()
          } else {
            this.completionItems = []
          }

          this.completionDisplay = this.completionItems.length !== 0

          return this
        }
      })

      return this
    },

    /**
     * 派送 value 的 change 事件
     * @return {Object} this - 组件
     */
    _dispatchChange() {
      return this.$emit('change', this.value)
    },

    /**
     * 验证数据是否为空
     *
     * @return {Object} - this - 组件
     */
    _verifyEmpty(firstVerify) {
      if (!this.empty) {
        if (this.bubbleDisplay) {
          this.dangerTip = firstVerify ? '' : `请输入${this.emptyMessage}!`
        } else {
          this.dangerTip = `请输入${this.emptyMessage}!`
        }
        this.verified = false
        return false
      }

      return true
    },

    /**
     * 点击搜索补全的数据
     *
     * @return {Object}
     */
    _clickCompletion(item, index) {
      this.value = item.text
      this.currentCompletionIndex = index

      return this
    },

    /**
     * 处理搜索补全的数据
     *
     * @return {Object}
     */
    _processCompletion() {
      if (!this.edit) {
        return this
      }

      this.completionProcessor && this.completionProcessor.call(null, this.completionItems)

      return this
    },

    /**
     * 验证数据格式
     *
     * @param {Boolean} - 是否是第一次验证
     * @return {Object} - this - 组件
     */
    verify(firstVerify) {
      this.value = $.trim(this.value)
      if (!this.value && this.value !== 0) {
        if (!this._verifyEmpty()) {
          this.verified = false

          // TODO bug
          // $(window).scrollTop($(this.$el).scrollTop())

          return false
        }

        this.verified = true
        this.dangerTip = ''

        return this
      } else {
        if (this.number && isNaN(this.value)) {
          this.dangerTip = `${this.errorMessage}请输入数字类型`
          this.verified = false

          return false
        }

        if (this.maxLength) {
          if (this.value.toString().length > this.maxLength) {
            this.dangerTip = this.number
              ? `${this.lengthMessage}不能超过${this.maxLength}位数!`
              : `${this.lengthMessage}长度不超过${this.maxLength}个字符!`

            this.verified = false

            return false
          }
        }

        if (this.regex || this.verifedType) {
          if (!this.regex.test(this.value)) {
            this.dangerTip = firstVerify ? '' : this.formatMessage
            this.verified = false

            return false
          }
        }

        this.verified = true
        this.dangerTip = ''
        return this
      }
    },

    /**
     * 验证数据格式并且弹出错误
     *
     * @return {Object} - this - 组件
     */
    validate() {
      this.verify()

      if (!this.verified) {
        tip(this.dangerTip)

        return false
      }

      return this
    },

    /**
     * 获取补全搜索的text 和 value
     * @param {Number} - 不传则是默认是当前的值
     */
    getCompletionItem(index = this.currentCompletionIndex) {
      if (this.currentCompletionIndex === 'undefined') {
        return 'undefined'
      }

      return this.completionItems[index]
    },

    /**
     * 输入框 focus 状态触发的方法
     * @return {Object} this - 组件
     */
    focus(evt) {
      this.verified = true
      this.focusing = true

      return this.$emit('focus', {
        valeu: this.value,
        event: evt
      })
    },

    /**
     * 输入框 blur 状态触发的方法
     * @return {Object} this - 组件
     */
    blur(evt) {
      this.focusing = false

      if (this.number) {
        this.value = this._switchNum(this.value)
      }

      return this.$emit('blur', {
        valeu: this.value,
        event: evt
      })
    },

    /**
     * 输入框 keyup 状态触发的方法
     * @return {Object}
     */
    keyup() {
      if (this.keyuping) {
        return false
      }

      this.keyuping = true
      setTimeout(() => {
        this.keyuping = false
      }, KEYUP_INTERVAL_TIME)

      return this._fetchCompletion(this.value)
    },

    /**
     * 折叠补全搜索数据的下拉框
     *
     * @return {Object}
     */
    fold() {
      this.completionDisplay = false

      return this
    },

    /**
     * 展开补全搜索数据的下拉框
     *
     * @return {Object}
     */
    spread() {
      this.completionDisplay = true

      return this
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
    }
  },

  watch: {
    initVal(val, oldVal) {
      this.value = val
    },
    value(val, oldVal) {
      // 限制长度显示
      this.limitLen = String(val).length

      // 补全搜索不触发 但是值为空时触发
      if ((this.completion && val !== '') ||
        Object.is(val, oldVal) || val === oldVal) {
        return false
      } else {
        this._dispatchChange()
        this.bubbleDisplay && this.verify()
      }
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

export default inputComp

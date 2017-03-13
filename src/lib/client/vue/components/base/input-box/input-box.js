/**
 * input-box 组件
 *
 * @props theme - 主题
 * @props value - 当前输入框的值
 * @props placeholder - 占位符
 * @props readOnly - 只读，不能編輯
 * @props queryName - 搜索参数名
 * @props autoCompletion - 是否启用自动搜索补全功能
 * @props completionUrl - 补全搜索的url
 * @props completionItems - 搜索补全的值
 * @props keyQuery - 补全的值的参数值
 * @props processCompletion - 处理搜索的补全数据的钩子
 * @props empty - 是否为空
 * @props verifedType - 验证值的类型
 * @props regex - 验证值的正则
 * @props type - 输入框类型( text | textarea )
 * @props row - textarea 的行数
 * @props hidden - 隐藏域
 * @props errorMessage - input 为空和格式不对的错误信息
 * @props maxLength - input可输入最大长度
 * @props errorTip - 弹出错误提示的类型（ bubble | tip ）
 * @props number - 数字指定为 nmuber 类型
 * @props formatMessage - 格式错误的提示信息
 * @props addon - 为输入框添加度量单位（ex: 小时/元）
 * @props showLimit -显示当前输入的长度
 *
 * @events change - inputBox的值改变
 * @events blur - inputBox的blur
 * @events focus - inputBox的focus
 * @events keyup - inputBox的keyup
 * @events inputBoxEvent.completion.click - 点击补全搜索的下拉框触发的事件
 * @events inputBoxEvent.completion.change - 补全搜索的下拉框的值改变的事件
 */

const Vue = require('vue');

require('./input-box.scss');
const template = require('./input-box.tpl');

const { ajaxRtn } = require('src/common/utils/utils');
const { initVerfication } = require('./validate.js');
const { inputBox: inputBoxEvent } = require('components/config/event.json');
const { inputBox: inputBoxHub } = require('components/config/componentHub.json');
const dataUtil = require('src/common/utils/data');
const baseMixin = require('components/mixin/base');
const formMixin = require('components/mixin/form');

const tip = require('components/base/pop/tip');

const keyUpInterval = 500;
const TYPE_TEXT_AREA = 'textarea';
const TYPE_TEXT = 'text';
const ERROR_MESSAGE_TIP = 'tip';
const ERROR_MESSAGE_BUBBLE = 'bubble';

const InputBox = {
  name: "InputBox",

  template,

  mixins: [baseMixin, formMixin],

  props: {
    theme: {
      type: String,
      default: "primary"
    },

    value: {
      type: [String, Number],
      default: ""
    },

    placeholder: {
      type: String,
      default: ""
    },

    readOnly: {
      type: Boolean,
      default: false
    },

    queryName: {
      type: String,
      default: ""
    },

    completionItems: {
      type: Array,
      default: () => []
    },

    completionUrl: {
      type: String,
      default: ""
    },

    autoCompletion: {
      type: Boolean,
      default: false
    },

    keyQuery: {
      type: String,
      require: true
    },

    empty: {
      type: Boolean,
      default: true
    },

    maxLength: Number,

    hidden: {
      type: Boolean,
      default: false
    },

    type: {
      type: String,
      default: "text"
    },

    row: {
      type: Number,
      default: 4
    },

    verifedType: String,

    regex: String,

    processCompletion: Function,

    errorMessage: {
      type: String,
      default: ""
    },

    errorTip: {
      type: String,
      default: "tip"
    },

    number: {
      type: Boolean,
      default: false
    },

    formatMessage: String,

    addon: String,
    showLimit:{
      type:Boolean,
      default:false
    },

    keyup: Function

  },

  data() {
    return {
      themeClass: this.theme ? `theme-${this.theme}` : '',
      focusInput: false,
      focusCls:false,
      completionDisplay: false,
      keyuped: false,
      dangerTip: "",
      dataTypeName: "",
      verified: true,
      currentCompletionIndex: 'undefined',
      bubbleDisplay: false,
      limitLen:0,
      staticCompletionItems: this.completionItems.slice(0)
    }
  },

  methods: {
    /**
     * 初始化验证规则
     * @return {Object} this - 组件
     */
    _initVerfication() {
      if (this.regex) {
        this.regex = new RegExp(this.regex);

        return this;
      }

      var verify = initVerfication(this.verifedType);

      if (verify) {
        this.regex = verify.regex;
        this.dataTypeName = verify.dataTypeName;
      }

      return this;
    },

    /**
     * 初始化验证的提示信息
     * @return {Object} this - 组件
     */
    _initVerfiedMessage() {
      this.emptyMessage = this.errorMessage ? this.errorMessage : '不能为空';
      this.lengthMessage = this.errorMessage ? this.errorMessage : '长度超过限制';

      if(!this.formatMessage){
        this.formatMessage = this.errorMessage ? this.errorMessage + '格式不对' : this.dataTypeName + '格式不对';
      }

      return this;
    },

    /**
     * 处理搜索补全的钩子
     * @return {Object} this - 组件
     */
    _processCompletion() {
      this.processCompletion && this.processCompletion.call(null, this.completionItems);

      return this;
    },
    /**
    *返回自动完成过滤结果
    **/
    _getCompleFilter(key){
     // let _arr
    },
    /**
     * 获取搜索补全的数据
     * @return {Object} this - 组件
     */
    _fetchCompletion(key) {
      if (!this.autoCompletion) {
        this.completionDisplay = this.completionItems.length === 0 ? false : true;

        return false;
      }

      if(this.autoCompletion && !this.completionUrl){

        this.completionItems = this.staticCompletionItems.filter((item) => { return item.text.indexOf(key)>-1});
        this._processCompletion();
        this.completionDisplay = this.completionItems.length === 0 ? false : true;

        return;
      }

      $.ajax({
        type: 'get',
        url: this.completionUrl,
        data: {
          [this.keyQuery]: key
        },
        success: (result) => {
          if (result.code === 0) {
            this.completionItems = result.data;
            this._processCompletion();
          } else {
            this.completionItems = [];
          }

          this.completionDisplay = this.completionItems.length === 0 ? false : true;

          return this;
        }
      });

      return this;
    },

    /**
     * 派送 value 的 change 事件
     * @return {Object} this - 组件
     */
    _dispatchChange() {
      this.$dispatch(inputBoxEvent.change, {
        dispatcher: this,
        value: this.value,
        queryName: this.queryName
      });

      return this;
    },

    /**
     * 验证数据格式
     *
     * @param {Boolean} - 是否是第一次验证
     * @return {Object} - this - 组件
     */
    verify(firstVerify) {
      this.value = $.trim(this.value);
      if (!this.value && this.value !== 0) {
        if(!this._verifyEmpty()) {
          this.verified = false;

          // TODO bug
          $(window).scrollTop($(this.$el).scrollTop())

          return false;
        }

        this.verified = true;
        this.dangerTip = '';

        return this;
      } else {
        if (this.number && isNaN(this.value)) {
          this.dangerTip = `${this.errorMessage}请输入数字类型`;
          this.verified = false;

          return false;
        }

        if(this.maxLength){
          if (this.value.toString().length > this.maxLength) {
            this.dangerTip = this.number ?
                `${this.lengthMessage}不能超过${this.maxLength}位数!` :
                `${this.lengthMessage}长度不超过${this.maxLength}个字符!`;

            this.verified = false;

            return false;
          }
        }

        if (this.regex || this.verifedType) {
          if (!this.regex.test(this.value)) {
            this.dangerTip = firstVerify ? '' : this.formatMessage;
            this.verified = false;

            return false;
          }
        }

        this.verified = true;
        this.dangerTip = '';
        return this;
      }
    },

    /**
     * 验证数据是否为空
     *
     * @return {Object} - this - 组件
     */
    _verifyEmpty() {
      if(!this.empty) {
        if (this.bubbleDisplay) {
          this.dangerTip = firstVerify ? '' : `请输入${this.emptyMessage}!`;
        } else {
          this.dangerTip = `请输入${this.emptyMessage}!`;
        }
        this.verified = false;
        return false;
      }

      return true;
    },

    /**
     * 验证数据格式并且弹出错误
     *
     * @return {Object} - this - 组件
     */
    validate() {
      this.verify();

      if (!this.verified) {
        tip(this.dangerTip);

        return false;
      }

      return this;
    },

    /**
     * 点击搜索补全的数据
     *
     * @return {Object}
     */
    _clickCompletion(item, index) {
      this.value = item.text;
      this.currentCompletionIndex = index;

      this.fold().$dispatch(inputBoxEvent.completion.click, {
        value: item.value,
        text: item.text,
        dispatcher: this
      });

      this.$dispatch(inputBoxEvent.completion.change, {
        value: this.completionItems[index].value,
        text: this.completionItems[index].text,
        queryName: this.queryName,
        dispatcher: this
      });

      return this;
    },

    /**
     * 处理搜索补全的数据
     *
     * @return {Object}
     */
    _processCompletion() {
      if (!this.edit) {
        return this;
      }

      this.processCompletion && this.processCompletion.call(null, this.completionItems);

      return this;
    },

    /**
     * 获取补全搜索的text 和 value
     * @param {Number} - 不传则是默认是当前的值
     */
    getCompletionItem(index = this.currentCompletionIndex) {
      if (this.currentCompletionIndex === 'undefined') {
        return 'undefined';
      }

      return this.completionItems[index];
    },

    /**
     * 输入框 focus 状态触发的方法
     * @return {Object} this - 组件
     */
    focus() {
      this.verified = true;
      this.focusCls = true;
      this.$dispatch(inputBoxEvent.focus, {
        dispatcher: this
      });
    },

    /**
     * 输入框 blur 状态触发的方法
     * @return {Object} this - 组件
     */
    blur() {
      this.$dispatch(inputBoxEvent.blur, {
        dispatcher: this
      });
      this.focusCls = false;
      this.focusInput = false;
    },

    /**
     * 输入框 keyup 状态触发的方法
     * @return {Object}
     */
    keyup() {
      this.$dispatch(inputBoxEvent.keyup, {
        dispatcher: this
      });

      if (this.keyuped) {
        return false;
      }

      this.keyuped = true;
      setTimeout(() => {
        this.keyuped = false;
      }, keyUpInterval);

      return this._fetchCompletion(this.value);
    },

    /**
     * 折叠补全搜索数据的下拉框
     *
     * @return {Object}
     */
    fold() {
      this.completionDisplay = false;

      return this;
    },

    /**
     * 展开补全搜索数据的下拉框
     *
     * @return {Object}
     */
    spread() {
      this.completionDisplay = true;

      return this;
    }
  },

  watch: {
    'value'(val, oldVal) {
      if (dataUtil.dataType(val) !== 'number'
          && this.nubmer && val !== '' && val && !isNaN(val)) {
        this.value = Number(val);
      }

      //限制长度显示
      this.limitLen = String(val).length;

      // 补全搜索不触发 但是值为空时触发
      if ((this.autoCompletion && val !== '')
          || Object.is(val, oldVal) || val === oldVal) {

        return false;
      } else {
        this._dispatchChange()
        this.bubbleDisplay && this.verify();
      }

    }
  },

  computed: {
    dangerTipDisplay() {
      return !!this.dangerTip && this.bubbleDisplay;
    },
    isTextarea() {
      return this.type === TYPE_TEXT_AREA
    },
    isText() {
      return this.type === TYPE_TEXT
    },
    errorBorderDisplay() {
      return !this.verified;
    }
  },

  created() {
    this.bubbleDisplay = this.errorTip === ERROR_MESSAGE_TIP ? false : true;
  },

  compiled () {
    this._initVerfication();
    this._initVerfiedMessage();

    COMMON.componentHub[inputBoxHub].push(this);
  }
}

module.exports = Vue.component('input-box', InputBox);

/**
 * form-area 组件
 *
 * @props theme - 主题
 * @props action - 提交url
 * @props type - ( Post | Get)
 * @props success - 提交成功的回调函数
 * @props fail - 提交失败的回调函数
 * @props beforeSubmit - 提交之前的钩子函数
 * @props jsonData - 提交 json 数据格式
 *
 * @slot - 加进来的表单控件
 *
 */

const Vue = require('vue');

const baseMixin = require('components/mixin/base');
const {
  btn: btnEvent,
  checkbox: checkboxEvent,
  dropMenu: dropMenuEvent,
  inputBox: inputBoxEvent,
  dateTime: dateTimeEvent } = require('components/config/event.json');

const tip = require('components/base/pop/tip');

const template = require('./form-area.tpl');
require('./form-area.scss');

const INIT_FORM_CONTROL = ['DropMenu', 'InputBox', 'Checkbox', 'DateTime', 'Upload'];
const VERIFY_FORM_CONTROL = ['DropMenu', 'InputBox', 'Checkbox', 'DateTime', 'Upload'];
const TYPE_POST = "post";
const TYPE_GET = "get";

const FormArea = {
  name: "FormArea",

  mixins: [baseMixin],

  template,

  props: {
    theme: {
      type: String,
      default: "primary"
    },

    action: {
      type: String,
      default: ""
    },

    type: {
      type: String,
      default: "post"
    },

    success: {
      type: Function,
      default: () => {
        return () => { };
      }
    },

    beforeSubmit: Function,

    jsonData: {
      type: Boolean,
      default: false
    }
  },

  data: function () {
    return {
      queryOpt: {},
      queryInfo: {}
    }
  },

  methods: {
    /**
     * 初始化
     * @return {Object}
     */
    _init() {
      this._initFormData();
    },

    /**
     * set action
     * @return {Object}
     */
    setAction(str = '') {

      this.action = str;

      return this;
    },

    /**
     * 初始化表单数据
     * @return {Object}
     */
    _initFormData() {
      var _self = this;

      var deepInit = function (comp) {
        comp.$children.forEach((comp, index) => {

          INIT_FORM_CONTROL.forEach((controlName) => {
            if (comp.constructor.name === controlName) {
              if (!comp.queryName || (typeof comp.value === 'undefined')) {
                return false;
              }

              var compQueryName = comp.queryName
              var queryOpt = _self.queryOpt

              if (compQueryName in queryOpt) {
                _self.query (comp, {toArray: true})
              } else {
                _self.query (comp)
              }
            }
          });

          if (comp.$children.length > 0) {
            return deepInit(comp);
          }

        });
      }

      this.query (null, {empty: true})
      deepInit(this)
    },

    /**
     * 操作 queryOpt 和 queryInfo 的值和信息
     *
     * @param {Object} comp - 组件的上下文
     * @param {Object} opt
     *                   toArray - 是否是需要将 query 值转换成多个
     *                   empty - 清空 query 值
     */
    query (comp = {}, {toArray, empty} = {}) {
      if (empty) {
        this.queryOpt = {}
        this.queryInfo = {}

        return true
      }

      var compQueryName = comp.queryName
      var queryOpt = this.queryOpt
      var queryInfo = this.queryInfo

      var setQueryOpt = (comp, change, couple) => {
        if (change) {
          queryOpt[compQueryName] = [queryOpt[compQueryName]];
          queryInfo[compQueryName] = [queryInfo[compQueryName]]
        } else {
          queryOpt[compQueryName].push(comp.value);

          if (couple) {
            queryInfo[compQueryName].push({
              value: comp.value,
              text: comp.text
            });
          } else {
            queryInfo[compQueryName].push(comp.value);
          }
        }
      }

      switch (comp.constructor.name) {
        case 'DropMenu':
          if (toArray) {
            if (comp.multiple) {
              // 判断是否有两层的数组
              if (!Array.isArray(queryOpt[compQueryName][0])) {
                setQueryOpt (comp, true, true)
              }

              setQueryOpt (comp, false, true)
            } else {
              if (!Array.isArray(queryOpt[compQueryName])) {
                setQueryOpt (comp, true, true)
              }

              setQueryOpt (comp, false, true)
            }

            break
          }

          queryOpt[compQueryName] = comp.value
          queryInfo[compQueryName] = {
            value: comp.value,
            text: comp.text
          }

          break
        case 'Upload':
          if (comp.isImg) {
            var uploadVal = comp.value
            var uploadItems = comp.uploadItems

            if (uploadVal.length === 0) {
              return false
            }

            if (comp.max === 1) {
              this.queryOpt[comp.queryName] = uploadVal[0]
              this.queryInfo[comp.queryName] = uploadItems
            } else {
              this.queryOpt[comp.queryName] = uploadVal
              this.queryInfo[comp.queryName] = uploadItems
            }
          } else {
            console.warn('未知上传文件类型！！请解决')
          }

          break
        default:
          if (toArray) {
            if (this._isArrayValue (comp)) {
              // 判断是否有两层的数组
              if (!Array.isArray(queryOpt[compQueryName][0])) {
                setQueryOpt (comp, true, false)
              }

              setQueryOpt (comp, false, false)
            } else {
              if (!Array.isArray(queryOpt[compQueryName])) {
                setQueryOpt (comp, true, false)
              }

              setQueryOpt (comp, false, false)
            }

            break
          }

          queryOpt[compQueryName] = comp.value
          queryInfo[compQueryName] = comp.value

          break
      }
    },

    /**
     * 设置 queryOpt 值
     *
     */
    setQueryOpt (opt) {
      if (typeof opt === 'undefined') {
        return this.queryOpt
      }

      this.queryOpt = opt

      return this
    },

    /**
     * 是否组件本身的 value 是数组
     * @return {Object}
     */
    _isArrayValue(comp) {
      if (comp.constructor.name === 'DropMenu' && comp.multiple) {
        return true
      }
      if (comp.constructor.name === 'Checkbox' && comp.isCheckbox) {
        return true
      }

      return false
    },

    /**
     * 验证表单控件里是否有格式不对的
     * @return {Boolean} - 是够验证成功
     */
    verify() {
      var verifitation = true;

      var deepVerify = function (comp) {
        comp.$children.every((comp, index) => {

          if (comp.$children.length > 0) {
            deepVerify(comp);
            if (!verifitation) {
              return false;
            }
          }

          return VERIFY_FORM_CONTROL.every((controlName) => {
            if (comp.constructor.name === controlName) {
              if (!comp.verify()) {
                verifitation = false;
                tip(comp.dangerTip);

                return false;
              }
            }

            return true;
          });
        });
      }

      if (this.$children && this.$children.length !== 0) {
        deepVerify(this);
      }

      return verifitation;
    },

    /**
     * 提交表单
     * @param {Object} opt - 选项
     *                     test {Function} - 提交数据成功之后测试的回调函数
     * @return {Object} this - 组件
     */
    submit(opt = {}) {
      if (!this.verify()) {
        return false;
      }

      this._initFormData()

      if (this.beforeSubmit && this.beforeSubmit.call(null, this.queryOpt, this) === false) {
        return false
      }

      var ajaxConf = {
        type: this.type,
        url: this.action,
        data: this.queryOpt,
        success: (rtn) => {
          this.$nextTick (() => {
            this.success.call (null, rtn)
          })
        }
      };

      if (this.jsonData) {
        ajaxConf = Object.assign(ajaxConf, {
          data: JSON.stringify(this.queryOpt),
          contentType: 'application/json'
        });
      }

      return $.ajax(ajaxConf);
    },

    /**
     * 重设表单数据
     * @return {Object}
     */
    reset() {
     this.$children.forEach((comp, index) => {

        INIT_FORM_CONTROL.forEach((controlName) => {
          if (comp.constructor.name === controlName) {
            switch (controlName) {
              case 'DropMenu':
                break;
              case 'Checkbox':
                break;
              case 'InputBox':
                comp.value = '';
                break;
              default:
                break;
            }
          }
       });

      });

      return this;
    },

    /**
     * 单元测试的 submit
     */
    testSubmit (opt) {
      var ajaxConf = {
        type: this.type,
        url: this.action,
        data: this.queryOpt
      };

      if (this.jsonData) {
        ajaxConf = Object.assign(ajaxConf, {
          data: JSON.stringify(this.queryOpt),
          contentType: 'application/json'
        });
      }

      return $.ajax(ajaxConf);
    }
  },

  events: {
    [btnEvent.click](opt) {
      if (opt.dispatcher.submit) {
        this.submit();
      }

      return false;
    }
  }
}

module.exports = Vue.component('form-area', FormArea);
/**
 * form 组件
 *
 * @props action - 提交url
 * @props jsonData - 提交 json 数据格式
 * @props type - ( Post | Get)
 *
 * @props beforeSubmit - 提交之前的钩子函数
 * @props success - 提交成功的回调函数
 * @props fail - 提交失败的回调函数
 *
 * @slot - 表单控件
 *
 */

require('./form.scss')
const template = require('./form.tpl')

import baseMixin from 'vue2/mixin/base'
import tip from 'vue2/component/base/pop/tip'

const INIT_FORM_CONTROL = ['select', 'input', 'check', 'data', 'upload']
const VERIFY_FORM_CONTROL = ['select', 'input', 'check', 'data', 'upload']

const TYPE_POST = 'post'
const TYPE_GET = 'get'

const formComp = {
  name: 'form',

  mixins: [baseMixin],

  template,

  props: {
    action: String,

    jsonData: {
      type: Boolean,
      default: false
    },

    type: {
      type: String,
      default: 'post'
    },

    success: Function,

    beforeSubmit: Function
  },

  data: function () {
    return {
      queryOpt: {},
      queryInfo: {}
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-form`
    }
  },

  methods: {
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
     * 初始化表单数据
     * @return {Object}
     */
    _initFormData() {
      var _self = this

      var deepInit = function (comp) {
        comp.$children.forEach((comp, index) => {
          if (comp.queryName && comp.value !== 'undefined') {
            INIT_FORM_CONTROL.forEach((controlName) => {
              if (comp.compName === controlName) {
                let compQueryName = comp.queryName
                let queryOpt = _self.queryOpt

                if (compQueryName in queryOpt) {
                  _self.query(comp, { toArray: true })
                } else {
                  _self.query(comp)
                }
              }
            })
          }

          if (comp.$children.length > 0) {
            return deepInit(comp)
          }
        })
      }

      this.query(null, { empty: true })
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
    query(comp = {}, {toArray, empty} = {}) {
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
          queryOpt[compQueryName] = [queryOpt[compQueryName]]
          queryInfo[compQueryName] = [queryInfo[compQueryName]]
        } else {
          queryOpt[compQueryName].push(comp.value)

          if (couple) {
            queryInfo[compQueryName].push({
              value: comp.value,
              text: comp.text
            })
          } else {
            queryInfo[compQueryName].push(comp.value)
          }
        }
      }

      switch (comp.compName) {
        case 'select':
          if (toArray) {
            if (comp.multiple) {
              // 判断是否有两层的数组
              if (!Array.isArray(queryOpt[compQueryName][0])) {
                setQueryOpt(comp, true, true)
              }

              setQueryOpt(comp, false, true)
            } else {
              if (!Array.isArray(queryOpt[compQueryName])) {
                setQueryOpt(comp, true, true)
              }

              setQueryOpt(comp, false, true)
            }

            break
          }

          queryOpt[compQueryName] = comp.value
          queryInfo[compQueryName] = {
            value: comp.value,
            text: comp.text
          }

          break
        case 'upload':
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
            if (this._isArrayValue(comp)) {
              // 判断是否有两层的数组
              if (!Array.isArray(queryOpt[compQueryName][0])) {
                setQueryOpt(comp, true, false)
              }

              setQueryOpt(comp, false, false)
            } else {
              if (!Array.isArray(queryOpt[compQueryName])) {
                setQueryOpt(comp, true, false)
              }

              setQueryOpt(comp, false, false)
            }

            break
          }

          queryOpt[compQueryName] = comp.value
          queryInfo[compQueryName] = comp.value

          break
      }
    },

    /**
     * set action
     * @return {Object}
     */
    setAction(str = '') {
      this.action = str

      return this
    },

    /**
     * 设置 queryOpt 值
     *
     */
    setQueryOpt(opt) {
      if (typeof opt === 'undefined') {
        return this.queryOpt
      }

      this.queryOpt = opt

      return this
    },

    /**
     * 验证表单控件里是否有格式不对的
     * @return {Boolean} - 是否验证成功
     */
    verify() {
      this._initFormData()

      let verifitation = true

      const deepVerify = function (comp) {
        comp.$children.every((comp, index) => {
          if (comp.$children.length > 0) {
            deepVerify(comp)

            if (!verifitation) {
              return false
            }
          }

          if (comp.verify && comp.verify()) {
            verifitation = true

            return true
          }

          return VERIFY_FORM_CONTROL.every((controlName) => {
            if (comp.compName === controlName) {
              verifitation = false
              tip(comp.dangerTip)

              return false
            }

            return true
          })
        })
      }

      if (this.$children && this.$children.length !== 0) {
        deepVerify(this)
      }

      return verifitation
    },

    /**
     * 提交表单
     * @param {Object} opt - 选项
     *                     test {Function} - 提交数据成功之后测试的回调函数
     * @return {Object} this - 组件
     */
    submit(opt = {}) {
      if (!this.action) {
        console.error('提交表单的地址（action）不能为空！')

        return false
      }

      if (!this.verify()) {
        return false
      }

      if (this.beforeSubmit && this.beforeSubmit.call(null, this.queryOpt, this) === false) {
        return false
      }

      const ajaxConf = {
        type: this.type,
        url: this.action,
        data: this.queryOpt,
        success: (rtn) => {
          this.$nextTick(() => {
            this.success.call(null, rtn)
          })
        }
      }

      if (this.jsonData) {
        Object.assign(ajaxConf, {
          data: JSON.stringify(this.queryOpt),
          contentType: 'application/json'
        })
      }

      return $.ajax(ajaxConf)
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
                break
              case 'Checkbox':
                break
              case 'InputBox':
                comp.value = ''
                break
              default:
                break
            }
          }
        })
      })

      return this
    },

    /**
     * 单元测试的 submit
     */
    testSubmit(opt) {
      var ajaxConf = {
        type: this.type,
        url: this.action,
        data: this.queryOpt
      }

      if (this.jsonData) {
        ajaxConf = Object.assign(ajaxConf, {
          data: JSON.stringify(this.queryOpt),
          contentType: 'application/json'
        })
      }

      return $.ajax(ajaxConf)
    }
  },

  mounted() {
    this._initFormData()
  }
}

export default formComp

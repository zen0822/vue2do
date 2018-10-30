/**
 * form 组件
 *
 * @slot - 表单控件
 */

import './Form.scss'
import render from './Form.render.js'

import baseMixin from '../../mixin/base'
import tip from '../Message/tip'

const INIT_FORM_CONTROL = ['select', 'input', 'check', 'data', 'upload']
const VERIFY_FORM_CONTROL = ['select', 'input', 'check', 'data', 'upload']

const TYPE_POST = 'post'
const TYPE_GET = 'get'

const formComp = {
  name: 'Form',

  mixins: [baseMixin],

  render,

  props: {
    // TODO
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
          if (comp.param && comp.value !== 'undefined') {
            INIT_FORM_CONTROL.forEach((controlName) => {
              if (comp.compName === controlName) {
                let compParamName = comp.param
                let queryOpt = _self.queryOpt

                if (compParamName in queryOpt) {
                  _self._query(comp, { toArray: true })
                } else {
                  _self._query(comp)
                }
              }
            })
          }

          if (comp.$children.length > 0) {
            return deepInit(comp)
          }
        })
      }

      this._query(null, { empty: true })
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
    _query(comp = {}, {toArray, empty} = {}) {
      if (empty) {
        this.queryOpt = {}
        this.queryInfo = {}

        return true
      }

      var compParamName = comp.param
      var queryOpt = this.queryOpt
      var queryInfo = this.queryInfo

      var setQueryOpt = (comp, change, couple) => {
        if (change) {
          queryOpt[compParamName] = [queryOpt[compParamName]]
          queryInfo[compParamName] = [queryInfo[compParamName]]
        } else {
          queryOpt[compParamName].push(comp.value)

          if (couple) {
            queryInfo[compParamName].push({
              value: comp.value,
              text: comp.text
            })
          } else {
            queryInfo[compParamName].push(comp.value)
          }
        }
      }

      switch (comp.compName) {
        case 'select':
          if (toArray) {
            if (comp.multiple) {
              // 判断是否有两层的数组
              if (!Array.isArray(queryOpt[compParamName][0])) {
                setQueryOpt(comp, true, true)
              }

              setQueryOpt(comp, false, true)
            } else {
              if (!Array.isArray(queryOpt[compParamName])) {
                setQueryOpt(comp, true, true)
              }

              setQueryOpt(comp, false, true)
            }

            break
          }

          queryOpt[compParamName] = comp.val()
          queryInfo[compParamName] = {
            value: comp.val(),
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
              this.queryOpt[comp.param] = uploadVal[0]
              this.queryInfo[comp.param] = uploadItems
            } else {
              this.queryOpt[comp.param] = uploadVal
              this.queryInfo[comp.param] = uploadItems
            }
          } else {
            console.warn('未知上传文件类型！！请解决')
          }

          break
        default:
          if (toArray) {
            if (this._isArrayValue(comp)) {
              // 判断是否有两层的数组
              if (!Array.isArray(queryOpt[compParamName][0])) {
                setQueryOpt(comp, true, false)
              }

              setQueryOpt(comp, false, false)
            } else {
              if (!Array.isArray(queryOpt[compParamName])) {
                setQueryOpt(comp, true, false)
              }

              setQueryOpt(comp, false, false)
            }

            break
          }

          queryOpt[compParamName] = comp.val()
          queryInfo[compParamName] = comp.val()

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
              tip(comp.verifiedHint)

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
     * 获取表单控件的形参和参数值
     */
    query() {
      return this.queryInfo
    }
  },

  mounted() {
    this._initFormData()
  }
}

export default formComp

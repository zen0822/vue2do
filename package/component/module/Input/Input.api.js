/**
 * input api
 */

import tip from '../Message/tip'

export default {
  methods: {
    /**
     * 验证数据格式
     *
     * @param {Boolean} - 是否是第一次验证
     * @return {Object} - this - 组件
     */
    verify(firstVerify) {
      let verified = true
      let verifiedHint = ''

      const returnFun = () => {
        if (!verified) {
          this.$el.offsetParent.scrollTop = this.$el.offsetTop
        }

        this.verified = verified
        this.verifiedHint = verifiedHint

        return verified
      }

      if (!this.number) {
        this.stateValue = this.stateValue.trim()
      }

      if (!this.stateValue && this.stateValue !== 0) {
        const verifyEmpty = this._verifyEmpty()

        verified = verifyEmpty.verified
        verifiedHint = verifyEmpty.verifiedHint

        return returnFun()
      } else {
        if (this.number && isNaN(this.stateValue)) {
          verifiedHint = `${this.errorMsg}请输入数字类型`
          verified = false

          return returnFun()
        }

        if (this.min) {
          if (this.number) {
            verified = this.min <= this.stateValue
            verifiedHint = verified ? '' : `${this.name}不能小于${this.min}!`
          } else {
            verified = this.min <= this.stateValue.toString().length
            verifiedHint = verified ? '' : `${this.name}长度不能小于${this.min}个字符!`
          }

          if (!verified) {
            return returnFun()
          }
        }

        if (this.max) {
          verified = this.max >= this.stateValue.toString().length
          verifiedHint = verified ? '' : `${this.name}长度不能大于${this.max}个字符!`

          if (!verified) {
            return returnFun()
          }
        }

        if (this.minNum && this.number) {
          const value = Number(this.stateValue)

          verified = this.minNum <= value
          verifiedHint = verified ? '' : `${this.name}不能小于${this.minNum}!`

          if (!verified) {
            return returnFun()
          }
        }

        if (this.maxNum && this.number) {
          const value = Number(this.stateValue)

          verified = this.maxNum >= value
          verifiedHint = verified ? '' : `${this.name}不能大于${this.maxNum}!`

          if (!verified) {
            return returnFun()
          }
        }

        if ((this.regex || this.verifiedType) && !this.regexObj.test(this.stateValue)) {
          verified = false

          if (firstVerify) {
            verifiedHint = ''
          } else {
            verifiedHint = this.formatText ? this.formatText : this._formatMessage
          }

          return returnFun()
        }
      }

      return returnFun()
    },

    /**
     * 验证数据格式并且弹出错误
     *
     * @return {Object} - this - 组件
     */
    validate() {
      this.verify()

      if (!this.verified) {
        tip(this.verifiedHint)

        return false
      }

      return this
    },

    /**
     * 获取当前值
     *
     * @return {String, Number} - 输入框的值
     */
    val() {
      return this.stateValue
    }
  }
}

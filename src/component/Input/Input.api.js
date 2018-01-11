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
      let errorTip = ''

      const returnFun = () => {
        if (!verified) {
          document.body.scrollTop = this.$el.offsetTop
        }

        this.verified = verified
        this.errorTip = errorTip

        return verified
      }

      if (!this.number) {
        this.value = this.value.trim()
      }

      if (!this.value && this.value !== 0) {
        let verifyEmpty = this._verifyEmpty()

        verified = verifyEmpty.verified
        errorTip = verifyEmpty.errorTip

        return returnFun()
      } else {
        if (this.number && isNaN(this.value)) {
          errorTip = `${this.errorMsg}请输入数字类型`
          verified = false

          return returnFun()
        }

        if (this.min) {
          if (this.number) {
            verified = this.min <= this.value
            errorTip = verified ? '' : `${this.name}不能小于${this.min}!`
          } else {
            verified = this.min <= this.value.toString().length
            errorTip = verified ? '' : `${this.name}长度不能小于${this.min}个字符!`
          }

          if (!verified) {
            return returnFun()
          }
        }

        if (this.max) {
          verified = this.max >= this.value.toString().length
          errorTip = verified ? '' : `${this.name}长度不能大于${this.max}个字符!`

          if (!verified) {
            return returnFun()
          }
        }

        if (this.minNum && this.number) {
          let value = Number(this.value)

          verified = this.minNum <= value
          errorTip = verified ? '' : `${this.name}不能小于${this.minNum}!`

          if (!verified) {
            return returnFun()
          }
        }

        if (this.maxNum && this.number) {
          let value = Number(this.value)

          verified = this.maxNum >= value
          errorTip = verified ? '' : `${this.name}不能大于${this.maxNum}!`

          if (!verified) {
            return returnFun()
          }
        }

        if ((this.regex || this.verifiedType) && !this.regexObj.test(this.value)) {
          verified = false

          if (firstVerify) {
            errorTip = ''
          } else {
            errorTip = this.formatText ? this.formatText : this._formatMessage
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
        this.errorBorderDisplay = true
        tip(this.errorTip)

        return false
      }

      return this
    }
  }
}

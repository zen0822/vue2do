/**
 * input api
 */

import tip from '../../base/message/tip'

const KEYUP_INTERVAL_TIME = 100

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
      let dangerTip = ''

      const returnFun = () => {
        if (!verified) {
          document.body.scrollTop = this.$el.offsetTop
        }

        this.verified = verified
        this.dangerTip = dangerTip

        return verified
      }

      if (!this.number) {
        this.value = this.value.trim()
      }

      if (!this.value && this.value !== 0) {
        let verifyEmpty = this._verifyEmpty()

        verified = verifyEmpty.verified
        dangerTip = verifyEmpty.dangerTip

        return returnFun()
      } else {
        if (this.number && isNaN(this.value)) {
          dangerTip = `${this.errorMessage}请输入数字类型`
          verified = false

          return returnFun()
        }

        if (this.min) {
          if (this.number) {
            verified = this.min <= this.value
            dangerTip = verified ? '' : `${this.lengthMessage}不能小于${this.min}!`
          } else {
            verified = this.min <= this.value.toString().length
            dangerTip = verified ? '' : `${this.lengthMessage}长度不能小于${this.min}个字符!`
          }

          if (!verified) {
            return returnFun()
          }
        }

        if (this.max) {
          verified = this.max >= this.value.toString().length
          dangerTip = verified ? '' : `${this.lengthMessage}长度不能大于${this.max}个字符!`

          if (!verified) {
            return returnFun()
          }
        }

        if (this.minNum && this.number) {
          let value = Number(this.value)

          verified = this.minNum <= value
          dangerTip = verified ? '' : `${this.lengthMessage}不能小于${this.minNum}!`

          if (!verified) {
            return returnFun()
          }
        }

        if (this.maxNum && this.number) {
          let value = Number(this.value)

          verified = this.maxNum >= value
          dangerTip = verified ? '' : `${this.lengthMessage}不能大于${this.maxNum}!`

          if (!verified) {
            return returnFun()
          }
        }

        if ((this.regex || this.verifiedType) && !this.regexObj.test(this.value)) {
          verified = false

          if (firstVerify) {
            dangerTip = ''
          } else {
            dangerTip = this.formatMessage ? this.formatMessage : this._formatMessage
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
        tip(this.dangerTip)

        return false
      }

      return this
    },

    /**
     * 输入框 focus 状态触发的方法
     * @return {Object} this - 组件
     */
    focus(evt) {
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
    blur(evt) {
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
    keyup() {
      if (this.keyuping) {
        return false
      }

      this.keyuping = true

      setTimeout(() => {
        this.keyuping = false
      }, KEYUP_INTERVAL_TIME)
    }
  }
}

import Vue from 'vue'
import tip from '../Message/tip'

export default {
  methods: {
    /**
     * checkbox的icon的样式
     *
     * @param { String } - checkbox当前值
     * @return { Function, Object }
     **/
    iconName(val) {
      return this.isRadio ?
        this._getIconName(this.value === val) :
        this._getIconName(this.value.includes(val))
    },

    /**
     * 选择 checkbox
     */
    check(evt, index) {
      let option = this.option[index - 1]
      let val = option.value

      if (this.beforeCheck && this.beforeCheck.call(null, this) === false) {
        return false
      }

      if (this.isCheckbox) {
        this.oldValue = []

        this.value.forEach((item) => {
          this.oldValue.push(item)
        })

        this._changeCheckbox(val)
      } else {
        this.oldValue = this.value

        this.value = val
      }

      this.$nextTick(() => {
        this.success && this.success(this)
        this.UIMaterial && this.$refs[`motionCheck${index}`].enter()
      })
    },

    /**
     * 设置checkbox的text值
     *
     * @return {Function, String}
     **/
    setText() {
      if (this.isRadio) {
        this.text = this.option[this.index][this.txtName]

        return this
      } else {
        if (!Array.isArray(this.value)) {
          return false
        }

        this.text = []

        return this.value.forEach((item) => {
          this.option.forEach((ele) => {
            if (item === ele[this.valName]) {
              this.text.push(item)
            }
          })
        })
      }
    },

    /**
     * 设置 currentIndex
     *
     * @return {Function, Object}
     **/
    setIndex() {
      if (this.isRadio) {
        return this.option.forEach((item, index) => {
          if (item[this.valName] === this.value) {
            this.index = index
          }
        })
      }

      return this
    },

    /**
     * 验证数据格式
     *
     * @return {Object} - this - 组件
     */
    verify() {
      this.dangerTip = `请选择${this.errorMessage}${this.errorMessage ? '的' : ''}${this.isRadio ? '单选框' : '复选框'}!`

      return this.verified
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
     * 全选复选框
     *
     * @return {Object} - this - 组件
     */
    checkAllOption() {
      let value = []

      this.option.forEach((item) => {
        value.push(item[this.valName])
      })

      if (this.checkedAll) {
        this.value = []
      } else {
        this.value = value
      }
    }
  }
}

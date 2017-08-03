import Vue from 'vue'
import tip from '../../base/message/tip'

export default {
  methods: {
    /**
     * checkbox的icon的样式
     *
     * @param { String } - checkbox当前值
     * @return { Function, Object }
     **/
    iconName(val) {
      if (this.isRadio) {
        return this.value === val ? 'circle-check-o' : 'circle-o'
      } else if (this.isCheckbox && Array.isArray(this.value)) {
        return this.value.indexOf(val) !== -1 ? 'square-check-o' : 'square-o'
      }
    },

    /**
     * 选择 checkbox
     */
    check(evt) {
      let index = evt.currentTarget.getAttribute(this.xclass('data-index'))
      let option = this.option[parseInt(index, 10)]
      let val = option.value

      if (this.beforeCheck && this.beforeCheck.call(null, this) === false) {
        return false
      }

      option.pressing = true

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
        this.success && this.success.call(null, this)
      })
    },

    /**
     * 设置checkbox的text值
     *
     * @return {Function, String}
     **/
    setText() {
      if (this.isRadio) {
        this.text = this.option[this.currentIndex][this.txtName]

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
    setCurrentIndex() {
      if (this.isRadio) {
        return this.option.forEach((item, index) => {
          if (item[this.valName] === this.value) {
            this.currentIndex = index
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
      if (!this.selectAllVal) {
        let value = []

        this.option.forEach((item) => {
          value.push(item[this.valName])
        })

        this.value = value
        this.selectAllVal = value
      }

      if (this.checkedAll) {
        this.value = []
      } else {
        this.value = this.selectAllVal
      }

      this.checkedAll = !this.checkedAll
    }
  }
}

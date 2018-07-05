import Vue from 'vue'
import tip from '../Message/tip'

export default {
  methods: {
    /**
     * 选择 checkbox
     * @param {Number} index - 第几个选择框
     */
    async check(evt, index) {
      let option = this.stateOption[index - 1]
      let val = option[this.valueName]

      if (this.isCheckbox) {
        this.oldValue = []

        this.stateValue.forEach((item) => {
          this.oldValue.push(item)
        })

        this._changeCheckbox(index - 1, val)
      } else {
        this.oldValue = this.stateValue

        this.stateValue = val
      }

      this._initCheckbox()
      await this.$nextTick()

      this.$emit('check', {
        currentIndex: index,
        value: this.value
      })

      this.UIMaterial && this.$refs[`motionCheck${index}`].enter()
    },

    /**
     * 设置checkbox的text值
     *
     * @return {Function, String}
     **/
    setText() {
      if (this.isRadio) {
        this.oldText = this.text

        this.text = this.index === -1 ?
          'undefined' :
          this.stateOption[this.index][this.txtName]

        return this
      } else {
        this.oldText = this.text.slice()
        let checkboxText = []

        this.index.forEach((item) => {
          checkboxText.push(this.stateOption[item][this.txtName])
        })

        this.text = checkboxText
      }
    },

    /**
     * 设置 currentIndex
     *
     * @return {Function, Object}
     **/
    setIndex() {
      if (this.isRadio) {
        this.oldIndex = this.index

        return this.stateOption.every((item, index) => {
          if (item[this.valueName] === this.stateValue) {
            this.index = index

            return false
          }

          return true
        })
      } else {
        this.oldIndex = this.index.slice()
        let checkboxIndex = []

        this.stateValue.forEach((item) => {
          this.stateOption.forEach((ele, index) => {
            if (item === ele[this.valueName]) {
              checkboxIndex.push(index)
            }
          })
        })

        this.index = checkboxIndex
      }
    },

    /**
     * 验证数据格式
     *
     * @return {Object} - this - 组件
     */
    verify() {
      this.dangerTip = `请选择${this.errorText}${this.errorText ? '的' : ''}${this.isRadio ? '单选框' : '复选框'}!`

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
    async checkAllOption() {
      let value = []

      this.option.forEach((item) => {
        value.push(item[this.valueName])
      })

      if (this.checkedAll) {
        this.stateValue = []
      } else {
        this.stateValue = value
      }

      this._initCheckbox()

      await this.$nextTick()

      this.UIMaterial && this.$refs.motionCheckAll.enter()
    }
  }
}

import Vue from 'vue'
import tip from '../Message/tip'

export default {
  methods: {
    /**
     * 选择 checkbox
     * @param {Number} index - 第几个选择框
     */
    async check(evt, index) {
      let option = this.option[index - 1]
      let val = option.value

      if (this.isCheckbox) {
        this.oldValue = []
        this.oldIndex = []

        this.stateValue.forEach((item) => {
          this.oldValue.push(item)
        })

        this.index.forEach((item) => {
          this.oldIndex.push(item)
        })

        this._changeCheckbox(index - 1, val)
      } else {
        this.oldValue = this.stateValue
        this.oldIndex = this.index

        this.stateValue = val
        this.index = index - 1
      }

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
        this.text = this.index === -1 ?
          'undefined' :
          this.option[this.index][this.txtName]

        return this
      } else {
        this.text = []

        return this.index.forEach((item) => {
          this.text.push(this.option[item][this.txtName])
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
        this.index = -1

        return this.option.forEach((item, index) => {
          if (item[this.valueName] === this.stateValue) {
            this.index = index
          }
        })
      } else {
        this.index = []

        return this.stateValue.forEach((item) => {
          this.option.forEach((ele, index) => {
            if (item === ele[this.valueName]) {
              this.index.push(index)
            }
          })
        })
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

      this.item.forEach((item) => {
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

import Vue from 'vue'
import tip from '../Message/tip'

export default {
  methods: {
    /**
     * 选择 checkbox
     * @param {Number | String} value - 选择框的值
     */
    check(value) {

    },

    /**
     * 验证选择框
     *
     * @return {Object} - this - 组件
     */
    verify() {
      return new Promise((resolve, reject) => {
        resolve({
          verified: this.verified,
          verifiedHint: this.verifiedHint
        })
      })
    }
  }
}

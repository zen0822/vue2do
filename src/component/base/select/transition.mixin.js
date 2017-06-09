import { childrenHeight } from '../../../util/dom/element'

export default {
  methods: {
    /**
     * 下拉框显示过渡完成之前
     */
    transitionBeforeEnter(el) {
      el.style.height = '0px'
      this.transitionFinish = false
      this.selectMenuStyle = {
        visibility: ''
      }
      return new Promise((resolve, reject) => {
        resolve(el)
      })
    },

    /**
     * 下拉框显示过渡
     */
    transitionEnter(el) {
      el.style.height = childrenHeight(el) + 'px'

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(el)
        }, 300)
      })
    },

    /**
     * 下拉框显示过渡完成之后
     */
    transitionAfterEnter(el) {
      el.style.height = ''
      this.transitionFinish = true
    },
    /**
       * 下拉框隐藏过渡完成之前
       */
    transitionBeforeLeave(el) {
      el.style.height = childrenHeight(el) + 'px'

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(el)
        }, 0)
      })
    },

    /**
     * 下拉框隐藏过渡
     */
    transitionLeave(el) {
      el.style.height = '0px'
      this.transitionFinish = false

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(el)
        }, 300)
      })
    },

    /**
     * 下拉框隐藏过渡完成之后
     */
    transitionAfterLeave(el) {
      this.selectMenuStyle = {
        visibility: 'hidden'
      }

      el.style.height = ''
      this.transitionFinish = true
    }
  }
}
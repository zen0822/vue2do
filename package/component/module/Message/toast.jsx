/**
 * toast 底部提示组件
 */

import Vue from 'vue'
import Message from './Message'

import store from '../../vuex/store'
import commonStore from '../../vuex/module/common/type.json'
import baseMixin from '../../mixin/base'

let toasting = false
const toastHub = []

/**
 * 创建 toast 组件的实例
 **/
const createToast = () => {
  const toastCompVm = new Vue({
    name: 'toast',
    mixins: [baseMixin],
    computed: {
      cPrefix() {
        return `${this.compPrefix}-toast`
      }
    },
    components: {
      message: Message
    },
    store,
    render() {
      return (
        <div class={[this.cPrefix]}>
          <Message position='bottom' align='center' ref='toast' />
        </div>
      )
    },
    mounted() {
      this.$store.dispatch(commonStore.toast.add, this)
    }
  }).$mount()

  document.body.appendChild(toastCompVm.$el)
}

const commonVuex = new Vue({
  store
})

/**
 * 调用 toast
 *
 * @param {string, object} option -
 *                                 message - 信息
 *                                 align - 信息的两边对齐方式 （left, center, right)
 **/
const toast = (opt = '') => {
  if (toasting) {
    toastHub.push(opt)

    return false
  }

  toasting = true

  let option = {}

  if (typeof opt === 'string') {
    option = {
      message: opt.toString()
    }
  } else {
    option = {
      ...option,
      ...opt
    }
  }

  return commonVuex
    .$store
    .getters[commonStore.toast.get]
    .$refs
    .toast
    .set({
      message: option.message,
      type: option.type,
      align: option.align,
      hideCb: () => {
        toasting = false

        option.cb && option.cb()

        if (toastHub.length > 0) {
          return toast(toastHub.shift())
        }
      }
    })
    .show()
}

createToast()

export default toast

/**
 * toast 底部提示组件
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import messageComp from './Message'

import store from '../../vuex/store'
import commonStore from '../../vuex/module/common/type.json'
import baseMixin from '../../mixin/base'

Vue.use(VueRouter)

let toasting = false
let toastHub = []

/**
 * 创建 toast 组件的实例
 **/
const createToast = () => {
  const toastCompVm = new Vue({
    name: 'toast',
    mixins: [baseMixin],
    computed: {
      // 组件类名的前缀
      cPrefix() {
        return `${this.compPrefix}-toast`
      }
    },
    components: {
      message: messageComp
    },
    store,
    render(h) {
      return h('div', {
        class: [this.cPrefix]
      }, [
        h('message', {
          props: {
            position: 'bottom'
          },
          ref: 'toast'
        })
      ])
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
 **/
const toast = (opt) => {
  if (toasting) {
    toastHub.push(opt)

    return false
  }

  let option = {}

  if (opt === undefined) {
    Object.assign(option, {
      message: '信息格式不正确！'
    })
  } else if (typeof opt === 'string') {
    Object.assign(option, {
      message: opt.toString()
    })
  } else {
    option = opt
  }

  return commonVuex
    .$store
    .getters[commonStore.toast.get]
    .$refs
    .toast
    .set({
      message: option.message,
      type: option.type,
      hideCb: () => {
        toasting = false
        option.cb && option.cb()

        if (toastHub.length > 0) {
          return toast(toastHub.shift())
        }
      }
    })
    .show({
      cb: () => {
        toasting = true
      }
    })
}

createToast()

export default toast

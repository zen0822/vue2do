/**
 * confirm 组件
 */

import Vue from 'vue'
import modalComp from './Modal'
import store from '../../vuex/store'
import commonStore from '../../vuex/module/common/type.json'
import baseMixin from '../../mixin/base'

let confirming = false
let confirmHub = []

/**
 * 创建 confirm 组件的实例
 **/
const createConfirm = () => {
  const confirmCompVm = new Vue({
    name: 'confirm',
    mixins: [baseMixin],
    computed: {
      cPrefix() { // 组件类名的前缀
        return `${this.compPrefix}-confirm`
      }
    },
    components: {
      modal: modalComp
    },
    store,
    render(h) {
      return h('div', {
        class: this.cPrefix
      }, [
        h('modal', {
          props: {
            type: 'confirm'
          },
          ref: 'confirm'
        })
      ])
    },
    mounted() {
      this.$store.dispatch(commonStore.confirm.add, this)
    }
  }).$mount()

  document.body.appendChild(confirmCompVm.$el)
}

const commonVuex = new Vue({
  store
})

/**
 * 调用 confirm
 **/
const confirm = (opt = '') => {
  if (confirming) {
    confirmHub.push(opt)

    return false
  }

  confirming = true

  let option = {}

  if (typeof opt === 'string') {
    Object.assign(option, {
      message: opt.toString()
    })
  } else {
    option = opt
  }

  return commonVuex
    .$store
    .getters[commonStore.confirm.get]
    .$refs
    .confirm
    .set({
      theme: option.theme,
      ui: option.ui,
      title: option.title,
      message: option.message,
      okCb: (vm) => {
        option.cb && option.cb()
        vm.hide()
      },
      hideCb: () => {
        confirming = false

        if (confirmHub.length > 0) {
          confirm(confirmHub.shift())
        }
      }
    })
    .show(() => {})
}

window.addEventListener('load', () => {
  createConfirm()
})

export default confirm

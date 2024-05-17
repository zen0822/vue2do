/**
 * confirm 组件
 */

import Vue from 'vue'
import Modal from './Modal'
import store from '../../vuex/store'
import commonStore from '../../vuex/module/common/type.json'
import baseMixin from '../../mixin/base'

let confirming = false
const confirmHub = []

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
      modal: Modal
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

  const confirmVm = commonVuex
    .$store
    .getters[commonStore.alert.get]
    .$refs
    .alert

  confirmVm.set({
    theme: option.theme,
    ui: option.ui,
    title: option.title,
    message: option.message,
    okCb: () => {
      option.cb && option.cb()
      confirmVm.hide()
    },
    hideCb: () => {
      confirming = false

      if (confirmHub.length > 0) {
        confirm(confirmHub.shift())
      }
    }
  })

  confirmVm.show(() => { /* nothing */ })
}

createConfirm()

export default confirm

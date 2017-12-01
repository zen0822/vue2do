/**
 * confirm 组件
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import modalComp from './Modal'
import store from '../../vuex/store'
import commonStore from '../../vuex/module/common/type.json'
import baseMixin from '../../mixin/base'

Vue.use(VueRouter)

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
      // 组件类名的前缀
      cPrefix() {
        return `${this.compPrefix}-confirm`
      }
    },
    components: {
      modal: modalComp
    },
    store,
    template: `
      <div :class="[cPrefix]">
        <modal type="confirm" ref="confirm"></modal>
      </div>
    `,
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

createConfirm()

export default confirm

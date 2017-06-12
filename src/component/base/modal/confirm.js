/**
 * confirm 组件
 */

import Vue from 'vue'

import modalComp from './modal'
import store from '../../../vuex/store'
import commonStore from '../../../vuex/module/common/type.json'
import baseMixin from '../../../mixin/base'

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
        <modal ref="confirm"></modal>
      </div>
    `,
    mounted() {
      this.$store.dispatch(commonStore.confirm.add, this)
    }
  }).$mount()

  document.body.appendChild(confirmCompVm.$el)
}

/**
 * 调用 confirm
 **/
const confirm = (opt) => {
  let option = {}

  if (opt === undefined) {
    Object.assign(option, {
      message: 'vue2do: 调用 confirm 传的参数错误!'
    })
  } else if (typeof opt === 'string') {
    Object.assign(option, {
      message: opt.toString()
    })
  } else {
    option = opt
  }

  if (confirming) {
    confirmHub.push(option)

    return false
  }

  const commonVuex = new Vue({
    store
  })

  return commonVuex
    .$store
    .getters[commonStore.confirm.get]
    .$refs
    .confirm
    .title(option.title)
    .info(option.message)
    .setOkCb((vm) => {
      confirming = false

      if (confirmHub.length > 0) {
        confirm(confirmHub.shift())
      }

      option.cb && option.cb()
      vm.hide()
    })
    .show(() => {
      confirming = true
    })
}

createConfirm()

export default confirm

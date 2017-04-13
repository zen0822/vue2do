/**
 * confirm 组件
 */

import Vue from 'vue'

import popComp from './pop'
import store from '../../../vuex/store'
import commonStore from '../../../vuex/module/common/type.json'
import baseMixin from '../../../mixin/base'

let confirming = false
let confirmHub = []

/**
 * 创建 confirm 组件的实例
 **/
const createTip = () => {
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
      pop: popComp
    },
    store,
    template: `
      <div :class="[cPrefix]">
        <pop
            ref="confirm"
            type="confirm"></pop>
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
  if (confirming) {
    confirmHub.push(opt)

    return false
  }

  if (opt === undefined) {
    opt.message = '未知错误！'
  } else if (typeof opt === 'string') {
    opt = {
      message: opt
    }
  }

  const commonVuex = new Vue({
    store
  })

  return commonVuex
    .$store
    .getters[commonStore.confirm.get]
    .$refs
    .confirm
    .title(opt.title)
    .info(opt.message)
    .setOkCb((vm) => {
      confirming = false

      if (confirmHub.length > 0) {
        confirm(confirmHub.shift())
      }

      opt.cb && opt.cb()
      vm.hide()
    })
    .show(() => {
      confirming = true
    })
}

createTip()

export default confirm

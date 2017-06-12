/**
 * alert 组件
 */

import Vue from 'vue'

import modalComp from './modal'
import store from '../../../vuex/store'
import commonStore from '../../../vuex/module/common/type.json'
import baseMixin from '../../../mixin/base'

let alerting = false
let alertHub = []

/**
 * 创建 alert 组件的实例
 **/
const createAlert = () => {
  const alertCompVm = new Vue({
    name: 'alert',
    mixins: [baseMixin],
    computed: {
      // 组件类名的前缀
      cPrefix() {
        return `${this.compPrefix}-alert`
      }
    },
    components: {
      modal: modalComp
    },
    store,
    template: `
      <div :class="[cPrefix]">
        <modal
            no-btn=""
            ref="alert"
            type="alert"></modal>
      </div>
    `,
    mounted() {
      this.$store.dispatch(commonStore.alert.add, this)
    }
  }).$mount()

  document.body.appendChild(alertCompVm.$el)
}

/**
 * 调用 alert
 **/
const alert = (opt) => {
  let option = {}

  if (opt === undefined) {
    Object.assign(option, {
      message: 'vue2do: 调用 alert 传的参数错误!'
    })
  } else if (typeof opt === 'string') {
    Object.assign(option, {
      message: opt.toString()
    })
  } else {
    option = opt
  }

  if (alerting) {
    alertHub.push(option)

    return false
  }

  const commonVuex = new Vue({
    store
  })

  return commonVuex
    .$store
    .getters[commonStore.alert.get]
    .$refs
    .alert
    .title(option.title)
    .info(option.message)
    .setOkCb((vm) => {
      alerting = false

      if (alertHub.length > 0) {
        alert(alertHub.shift())
      }

      option.cb && option.cb()
      vm.hide()
    })
    .show(() => {
      alerting = true
    })
}

createAlert()

export default alert


/**
 * alert 组件
 */

import Vue from 'vue'
import modalComp from './Modal'
import store from '../../vuex/store'
import commonStore from '../../vuex/module/common/type.json'
import baseMixin from '../../mixin/base'

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

const commonVuex = new Vue({
  store
})

/**
 * 调用 alert
 **/
const alert = (opt = '') => {
  if (alerting) {
    alertHub.push(opt)

    return false
  }

  alerting = true

  let option = {}

  if (typeof opt === 'string') {
    option = {
      message: opt
    }
  } else {
    option = opt
  }

  return commonVuex
    .$store
    .getters[commonStore.alert.get]
    .$refs
    .alert
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
        alerting = false

        if (alertHub.length > 0) {
          alert(alertHub.shift())
        }
      }
    })
    .show()
}

createAlert()

export default alert

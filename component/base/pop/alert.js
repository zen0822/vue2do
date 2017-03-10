/**
 * alert 组件
 */

import Vue from 'vue'

import popComp from './pop'
import store from 'vue2/vuex/store'
import commonStore from 'vue2/vuex/module/common/type.json'
import baseMixin from 'vue2/mixin/base'

let alerting = false
let alertHub = []

/**
 * 创建 alert 组件的实例
 **/
const createTip = () => {
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
      pop: popComp
    },
    store,
    template: `
      <div :class="[cPrefix]">
        <pop
            ref="alert"
            type="alert"></pop>
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
  if (alerting) {
    alertHub.push(opt)

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
    .getters[commonStore.alert.get]
    .$refs
    .alert
    .title(opt.title)
    .info(opt.message)
    .setOkCb((vm) => {
      alerting = false

      if (alertHub.length > 0) {
        alert(alertHub.shift())
      }

      opt.cb && opt.cb()
      vm.hide()
    })
    .show(() => {
      alerting = true
    })
}

createTip()

export default alert


/**
 * tip 组件
 */

import Vue from 'vue'

import popComp from './pop'
import alert from './alert'

import store from 'vue2/vuex/store'
import commonStore from 'vue2/vuex/module/common/type.json'
import baseMixin from 'vue2/mixin/base'

let tiping = false
let tipHub = []

/**
 * 创建 tip 组件的实例
 **/
const createTip = () => {
  const tipCompVm = new Vue({
    name: 'tip',
    mixins: [baseMixin],
    computed: {
      // 组件类名的前缀
      cPrefix() {
        return `${this.compPrefix}-tip`
      }
    },
    components: {
      pop: popComp
    },
    store,
    template: `
      <div :class="[cPrefix]">
        <pop
            ref="tip"
            type="tip"></pop>
      </div>
    `,
    mounted() {
      this.$store.dispatch(commonStore.tip.add, this)
    }
  }).$mount()

  document.body.appendChild(tipCompVm.$el)
}

/**
 * 调用 tip
 **/
const tip = (opt) => {
  if (tiping) {
    tipHub.push(opt)

    return false
  }

  if (opt === undefined) {
    opt.message = '未知错误！'
  } else if (typeof opt === 'string') {
    opt = {
      message: opt
    }
  }

  if (opt.message.length > 20) {
    alert(opt)

    return false
  }

  const commonVuex = new Vue({
    store
  })

  return commonVuex
    .$store
    .getters[commonStore.tip.get]
    .$refs
    .tip
    .info(opt.message)
    .setOkCb(() => {
      tiping = false

      if (tipHub.length > 0) {
        tip(tipHub.shift())
      }

      opt.cb && opt.cb()
    })
    .show(() => {
      tiping = true
    })
}

createTip()

export default tip

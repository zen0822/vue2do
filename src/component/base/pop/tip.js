/**
 * tip 组件
 */

import Vue from 'vue'

import popComp from './pop'
import alert from './alert'

import store from '../../../vuex/store'
import commonStore from '../../../vuex/module/common/type.json'
import baseMixin from '../../../mixin/base'

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
        <pop ref="tip" type="tip"></pop>
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

  if (option.message.length > 20) {
    alert(option)

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
    .info(option.message)
    .setOkCb(() => {
      tiping = false

      if (tipHub.length > 0) {
        tip(tipHub.shift())
      }

      option.cb && option.cb()
    })
    .show(() => {
      tiping = true
    })
}

createTip()

export default tip

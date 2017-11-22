/**
 * tip 组件
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import messageComp from './Message'

import store from '../../vuex/store'
import commonStore from '../../vuex/module/common/type.json'
import baseMixin from '../../mixin/base'

Vue.use(VueRouter)

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
      message: messageComp
    },
    store,
    render(h) {
      return h('div', {
        class: [this.cPrefix]
      }, [
        h('message', {
          ref: 'tip'
        })
      ])
    },
    mounted() {
      this.$store.dispatch(commonStore.tip.add, this)
    }
  }).$mount()

  document.body.appendChild(tipCompVm.$el)
}

const commonVuex = new Vue({
  store
})

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

  return commonVuex
    .$store
    .getters[commonStore.tip.get]
    .$refs
    .tip
    .set({
      message: option.message,
      type: option.type,
      hideCb: () => {
        tiping = false
        option.cb && option.cb()

        if (tipHub.length > 0) {
          return tip(tipHub.shift())
        }
      }
    })
    .show({
      cb: () => {
        tiping = true
      }
    })
}

createTip()

export default tip

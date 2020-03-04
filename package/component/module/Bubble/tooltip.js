/**
 * 冒泡样式的 tooltip 组件
 */

import Vue from 'vue'
import Bubble from './Bubble'
import store from '../../vuex/store'
import commonStore from '../../vuex/module/common/type.json'
import baseMixin from '../../mixin/base'

/**
 * 创建 tooltip 组件的实例
 **/
const createTooltip = () => {
  const tooltipCompVm = new Vue({
    name: 'tooltip',
    mixins: [baseMixin],
    computed: {
      cPrefix() { // 组件类名的前缀
        return `${this.compPrefix}-tooltip`
      }
    },
    components: {
      bubble: Bubble
    },
    store,
    render(h) {
      return h('div', {
        class: [this.cPrefix]
      }, [
        h('bubble', {
          ref: 'tooltip'
        })
      ])
    },
    mounted() {
      this.$store.dispatch(commonStore.tooltip.add, this)
    }
  }).$mount()

  document.body.appendChild(tooltipCompVm.$el)
}

const commonVuex = new Vue({
  store
})

/**
 * 调用 tooltip
 **/
const tooltip = (opt = '') => {
  let option = {}

  if (typeof opt === 'string') {
    option = {
      message: opt
    }
  } else {
    option = opt
  }

  const tooltipVm = commonVuex.$store.getters[commonStore.tooltip.get].$refs.tooltip

  tooltipVm.set({
    message: option.message,
    target: opt.target
  }).show()

  return tooltipVm
}

window.addEventListener('load', () => {
  createTooltip()
})

export default tooltip

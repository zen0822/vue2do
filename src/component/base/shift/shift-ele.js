/**
 * shifting-ele - 切换组件的个体
 *
 */

import baseMixin from '../../../mixin/base'

export default {
  mixins: [baseMixin],

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-shift-ele`
    }
  },

  render(h) {
    return h('div', {
      class: [this.cPrefix]
    }, this.$slots.default)
  }
}

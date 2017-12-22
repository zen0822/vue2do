/**
 * tab-ele - 切换按钮组件
 *
 */

import baseMixin from '../../mixin/base'

export default {
  name: 'TabEle',
  mixins: [baseMixin],
  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-tab-ele`
    }
  },
  render(h) {
    return h('div', {
      class: [this.cPrefix]
    }, this.$slots.default)
  }
}

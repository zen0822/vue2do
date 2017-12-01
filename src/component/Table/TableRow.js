/**
 * table-row 组件
 */

import baseMixin from '../../mixin/base'

const tableRowComp = {
  name: 'table-row',
  mixins: [baseMixin],
  computed: {
    cPrefix() {
      return `${this.compPrefix}-table-row`
    }
  },
  render(h) {
    return h(
      'tr',
      {
        class: [this.cPrefix]
      },
      this.$slots.default
    )
  }
}

export default tableRowComp

import baseMixin from '../../mixin/base'

export default {
  name: 'fold-content',
  mixins: [baseMixin],
  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-fold-content`
    }
  },
  render(h) {
    return h('div', {
      class: [this.cPrefix]
    }, this.$slots.default)
  }
}

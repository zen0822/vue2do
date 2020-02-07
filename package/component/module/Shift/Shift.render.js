/**
 * shift.render
 */

export default function (h) {
  const shiftOption = []

  this.$slotKey.forEach((item, index) => {
    if (item === 'default') {
      return false
    }

    shiftOption.push(
      h('column', {
        class: [{
          [this.beforeClass]: this.currentIndex !== index + 1
        }, {
          [this.afterClass]: this.currentIndex === index + 1
        }, this.xclass('col')]
      }, this.$slots[item])
    )
  })

  return h('div', {
    class: [this.cPrefix]
  }, [
    h('row', {
      class: [this.xclass('row')],
      props: {
        wrap: 'nowrap',
        justify: this.justify
      }
    }, shiftOption)
  ])
}

/**
 * shift.render
 */

export default function (h) {
  let shiftOption = []

  this.$slotKey.forEach((item, index) => {
    if (item === 'default') {
      return false
    }

    shiftOption.push(
      h('li', {
        class: [{
          [this.beforeClass]: this.currentIndex !== index + 1
        }, {
          [this.afterClass]: this.currentIndex === index + 1
        }, this.xclass('li')]
      }, this.$slots[item])
    )
  })

  return h('div', {
    class: [this.cPrefix]
  }, [
    h('ul', {
      class: [`${this.compPrefix}-ul`, this.xclass('ul')]
    }, shiftOption)
  ])
}

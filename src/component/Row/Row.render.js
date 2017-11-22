/**
 * row.render.js
 */

export default function (h) {
  let classOpt = []
  let $slots = this.$slots.default

  $slots = $slots.filter((item) => {
    return !item.text
  })

  return h(
    'div', {
      class: this.compClass
    },
    $slots
  )
}

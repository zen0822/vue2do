/**
 * row.render.js
 */

export default function (h) {
  let $slots = this.$slots.default

  $slots = !Array.isArray($slots) ? null : $slots.filter((item) => {
    return !item.text
  })

  return h(
    'div', {
      class: this.compClass
    },
    $slots
  )
}

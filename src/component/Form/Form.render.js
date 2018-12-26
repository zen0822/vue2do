/**
 * form.render.js
 */

export default function (h) {
  return h(
    'div',
    {
      class: this.cPrefix
    },
    this.$slots.default
  )
}

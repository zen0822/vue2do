/**
 * row.render.js
 */

export default function (h) {
  let classOpt = []
  let $slots = this.$slots.default

  if (this.gap > 0) {
    classOpt.push(`${this.cPrefix}-gap-${this.gap}`)
  }

  classOpt.push(this.cPrefix, `${this.cPrefix}-${this.wrap}`)

  $slots = $slots.filter((item) => {
    return item.componentOptions && item.componentOptions.tag === 'column'
  })

  return h(
    'div',
    {
      class: classOpt
    },
    $slots
  )
}

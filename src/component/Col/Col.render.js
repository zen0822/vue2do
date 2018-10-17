/**
 * col.render.js
 */

export default function (h) {
  let classOpt = [this.cPrefix]
  let deviceType = ['xs', 's', 'm', 'l', 'xl', 'span']

  if (this.pull > 0) {
    classOpt.push(`${this.cPrefix}-pull-${this.pull}`)
  }

  if (this.push > 0) {
    classOpt.push(`${this.cPrefix}-push-${this.push}`)
  }

  if (this.offset > 0) {
    classOpt.push(`${this.cPrefix}-offset-${this.offset}`)
  }

  if (!this.grid) {
    deviceType.forEach((item) => {
      if (this[item] > 0) {
        classOpt.push(`${this.cPrefix}-${item}-${this[item]}`)
      }
    })
  } else {
    deviceType.forEach((item) => {
      if (this[item] > 0) {
        classOpt.push(`${this.cPrefix}-${item}-${this[item]}`)
      } else if (this.grid[item] > 0) {
        classOpt.push(`${this.cPrefix}-${item}-${this.grid[item]}`)
      }
    })
  }

  return h(
    'div',
    {
      class: classOpt,
      style: this.compStyle
    },
    this.$slots.default
  )
}

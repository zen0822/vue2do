/**
 * omit.render.js
 */

export default function (h) {
  const linetextlength = this.lineText.length

  return h('div', {
    class: [this.cPrefix]
  }, [
    h('span', {
      class: [this.xclass('font-width')],
      ref: 'font'
    }),
    this.lineText.map((item, index) => {
      if (item !== undefined && item !== '') {
        return h('div', {
          class: [
            this.xclass('line'),
            {
              [this.xclass('line-last')]: index + 1 === linetextlength
            }
          ]
        }, item)
      } else {
        return null
      }
    })
  ])
}

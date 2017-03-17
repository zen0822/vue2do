/**
 * table.render
 */

export default function (h) {
  let scrollerChildren = []

  let tableEle = {}
  let tableChildren = []
  let theadRowChildren = []
  let tbodyRowChildren = []

  if (this.theadItem.length > 0) {
    theadRowChildren = this.theadItem.map((item) => {
      return h('th', {
        class: [this.xclass('col')]
      }, item)
    })
  } else {
    theadRowChildren = this.$slots.thead
  }

  if (this.tbodyItem.length > 0) {
    tbodyRowChildren = this.tbodyItem.map((item, index) => {
      return h('tr', {
        class: [this.xclass('row')]
      }, this.$scopedSlots.tbody({
        index: index,
        item: item
      }))
    })
  } else {
    tbodyRowChildren = [
      h('tr',
        [
          h('td', {
            attrs: {
              colspan: 8
            },
            class: [this.xclass('empty-data')]
          }, this.emptyDataText)
        ]
      )
    ]
  }

  tableChildren.push(
    h('thead', {
      class: [this.xclass('header-group')]
    }, [h('tr', {
      class: [this.xclass('row')]
    }, theadRowChildren)])
  )

  tableChildren.push(
    h('tbody', {
      class: [this.xclass('row-group')]
    }, tbodyRowChildren)
  )

  tableEle = h('table', {
    class: [this.xclass('wrap')]
  }, tableChildren)

  return h('div',
    { class: [this.cPrefix, this.xclass(this.themeClass)] },
    [
      h('scroller',
        {
          class: [this.xclass('scroller')],
          props: {
            autoHide: this.scrollerAutoHide
          },
          on: {
            scroll: this.scroll
          },
          ref: 'scroller'
        }, [tableEle]
      ),
      h(
        'page',
        {
          class: [this.xclass('page'), `${this.compPrefix}-m-t-double`],
          directives: [{
            name: 'show',
            value: this.pagerDisplay && this.pager
          }],
          props: {
            data: this.pageData
          },
          on: {
            'switch': this.switchPage
          },
          ref: 'pager'
        }
      )
    ]
  )
}

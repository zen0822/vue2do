/**
 * table.render
 */

export default function (h) {
  const colCompOption = []
  const tableChildren = []
  let tableEle = {}
  let theadRowChildren = []
  let tbodyRowChildren = []
  let headLength = 0

  if (this.theadItem.length > 0) {
    headLength = this.theadItem.length

    theadRowChildren = this.theadItem.map((item) => {
      return h('th', {
        class: [this.xclass('col')]
      }, item)
    })
  } else {
    theadRowChildren = this.$slots.thead
    headLength = theadRowChildren.length

    theadRowChildren.forEach(
      (item) => colCompOption.push({
        maxWidth: item.componentOptions.propsData.maxWidth,
        minWidth: item.componentOptions.propsData.minWidth,
        width: item.componentOptions.propsData.width,
        omit: item.componentOptions.propsData.omit
      })
    )
  }

  if (!this.list) {
    this.$slotKey.forEach((item) => {
      if (item === 'thead') {
        return false
      }

      const rowSlot = this.$slots[item]

      rowSlot[0].componentOptions && rowSlot[0].componentOptions.children.forEach((rowSlotItem, rowSlotItemIndex) => {
        if (rowSlotItem.componentOptions === undefined) {
          rowSlotItem.componentOptions = {}
          rowSlotItem.componentOptions.propsData = {}
        }

        Object.assign(rowSlotItem.componentOptions.propsData, colCompOption[rowSlotItemIndex])
      })

      tbodyRowChildren.push(rowSlot)
    })
  } else if (this.tbody.length > 0 && this.tbodyItem.length > 0) {
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
      h('tr', [
        h('td', {
          attrs: {
            colspan: headLength
          },
          class: [this.xclass('empty-data')]
        }, this.emptyDataText)
      ])
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
    class: [this.xclass('wrap')],
    style: {
      'min-width': `${this.scrollerWidth}px`
    }
  }, tableChildren)

  return h('div', {
    class: this.compClass
  }, [
    h('scroller', {
      class: [this.xclass('scroller')],
      props: {
        autoHide: this.scrollerAutoHide,
        height: 300,
        width: '100%'
      },
      on: {
        scrollY: this.scroll
      },
      ref: 'scroller'
    }, [tableEle]),
    h(
      'page', {
        class: [this.xclass('page'), `${this.compPrefix}-m-t-double`],
        directives: [{
          name: 'show',
          value: this.pagerDisplay
        }],
        props: {
          data: this.pageData
        },
        on: {
          'switch': this.switchPage
        },
        ref: 'pager'
      }
    ),
    h('loading', {
      props: {
        ui: this.ui,
        theme: this.theme
      },
      ref: 'loading'
    })
  ])
}

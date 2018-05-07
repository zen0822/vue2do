/**
 * list.render
 */

export default function (h) {
  let listChildren = []
  let scrollerChildren = []
  let loadingOfNum = []

  if (this.stateItem.length > 0) {
    let listItems = []

    this.stateItem.forEach((item, index) => {
      let $scopedSlots = [this.$scopedSlots.default({
        index: index + 1,
        item
      })]
      let $slot = this.$scopedSlots ? $scopedSlots : this.$slots.default

      listItems.push(
        h('li', {
          class: [this.xclass('li')]
        }, $slot)
      )
    })

    scrollerChildren = [h('ul', {
      attrs: {
        class: `${this.compPrefix}-ul`
      },
      class: [this.xclass('ul')],
      style: {
        'min-width': `${this.scrollerWidth}px`
      }
    }, listItems)]
  } else {
    scrollerChildren = [h('div', {
      class: [this.xclass('empty-data')]
    }, '暂无数据')]
  }

  scrollerChildren.push(
    h('page', {
      class: [this.xclass('page')],
      directives: [{
        name: 'show',
        value: this.pagerDisplayStatus
      }],
      props: {
        data: this.pageData,
        type: this.pageType,
        loadMoreText: this.loadMoreText,
        ui: this.ui,
        theme: this.theme
      },
      on: {
        'switch': this.switchPage
      },
      ref: 'page'
    }, (() => {
      if (this.isPageTypeMore) {
        return [
          h(
            'div', {
              slot: 'loadMore'
            }, [
              h('loading', {
                class: [`${this.compPrefix}-m-r-half`].concat(
                  this.xclass(['loading', 'loading-more'])
                ),
                props: {
                  display: this.isPageTypeMore,
                  ui: this.ui,
                  theme: this.theme
                },
                ref: 'loadingOfMore'
              })
            ]
          )
        ]
      }

      return null
    })())
  )

  if (!this.isPageTypeMore) {
    loadingOfNum.push(h('loading', {
      class: this.xclass(['loading', 'loading-num']),
      props: {
        bgDisplay: true,
        ui: this.ui,
        theme: this.theme
      },
      ref: 'loading'
    }))
  }

  listChildren.push(
    h('scroller', {
      class: [this.xclass('scroller')],
      props: {
        autoHide: this.autoHideScroller,
        height: this.scrollerHeight,
        width: '100%'
      },
      ref: 'scroller'
    }, scrollerChildren)
  )

  listChildren.push(loadingOfNum)

  return h('div', {
    class: [
      this.cPrefix,
      this.xclass(this.themeClass)
    ]
  }, listChildren)
}

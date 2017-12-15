/**
 * list.render
 */

export default function (h) {
  let listChildren = []
  let scrollerChildren = []
  let loadingOfNum = []

  if (this.listItem.length > 0) {
    let listItems = []

    this.listItem.forEach((item, index) => {
      let $slot = this.$scopedSlots ? [this.$scopedSlots.default({
          index: index + 1,
          item
        })] :
        this.$slots.default

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
      class: [this.xclass('ul')]
    }, listItems)]
  } else {
    scrollerChildren = [h('div', {
      class: [this.xclass('empty-data')]
    }, '暂无数据')]
  }

  if (!this.isPageTypeMore) {
    loadingOfNum.push(h('loading', {
      class: this.xclass(['loading', 'loading-num']),
      props: {
        'bg-display': true
      },
      ref: 'loading'
    }))
  }

  listChildren.push(
    h('scroller', {
      class: [this.xclass('scroller')],
      props: {
        autoHide: this.autoHideScroller,
        height: this.scrollerHeight
      },
      on: {
        scrollY: this.scroll
      },
      ref: 'scroller'
    }, scrollerChildren)
  )

  if (!this.pageHide) {
    listChildren.push(
      h('slide-transition', {
        props: {
          direction: 'north',
          offset: this.pageDetail.bottom
        },
        ref: 'pageSlideTransition'
      }, [
        h(
          'page', {
            class: [this.xclass('page')],
            props: {
              data: this.pageData,
              type: this.pageType,
              loadMoreText: this.loadMoreText
            },
            on: {
              'switch': this.switchPage
            },
            ref: 'page',
            style: this.pagerStyle
          }, (() => {
            let ele = [
              h('icon', {
                class: [`${this.compPrefix}-m-r-half`],
                props: {
                  kind: 'arrow'
                }
              }),
              h('span', this.loadMoreText)
            ]

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
                      ref: 'loadingOfMore'
                    }),
                    h('icon', {
                      class: [`${this.compPrefix}-m-r-half`],
                      directives: [{
                        name: 'show',
                        value: this.arrowOfMoreDisplay
                      }],
                      props: {
                        kind: 'arrow'
                      }
                    }),
                    h('span', this.loadMoreText)
                  ]
                )
              ]
            }

            return ele
          })()
        )
      ])
    )
  }

  listChildren.push(loadingOfNum)

  return h('div', {
    class: [
      this.cPrefix,
      this.xclass(this.themeClass)
    ]
  }, listChildren)
}

/**
 * list.render
 */

export default function (h) {
  let scrollerChildren = []

  if (this.listItem.length > 0) {
    let listItems = []

    this.listItem.forEach((item, index) => {
      let $slot = this.$scopedSlots
        ? [this.$scopedSlots.default({
          index,
          item
        })]
        : this.$slots.default

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


  let loadingOfNum = []

  if (!this.isPageTypeMore) {
    loadingOfNum.push(h('loading', {
      class: this.xclass(['loading', 'loading-num']),
      props: {
        'bg-display': true
      },
      ref: 'loading'
    }))
  }

  return h('div',
    { class: [this.cPrefix, this.xclass(this.themeClass)] },
    [
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
      }, scrollerChildren),
      h('transition',
        {
          props: {
            name: this.prefix('slide-up')
          }
        },
        [
          h(
            'page',
            {
              class: [this.xclass('page')],
              directives: [{
                name: 'show',
                value: this.pagerDisplay && this.pager
              }],
              props: {
                data: this.pageData,
                type: this.pageType,
                loadMoreText: this.loadMoreText
              },
              on: {
                'switch': this.switchPage
              },
              ref: 'pager'
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
                    'div',
                    {
                      slot: 'loadMore'
                    },
                    [
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
                  )]
              }

              return ele
            })()
          )
        ]
      )
    ].concat(loadingOfNum)
  )
}

/**
 * page.render
 */

export default function (h) {
  return h('div', {
    class: [
      this.cPrefix,
      this.xclass(this.themeClass),
      this.xclass('type-' + this.type)
    ],
    directives: [{
      name: 'show',
      value: this.pageDisplay
    }],
    on: {
      selectstart(event) {
        event.preventDefault()
      }
    }
  }, [
    h('div', {
      class: [this.xclass('more')],
      directives: [{
        name: 'show',
        value: this.moreDisplay
      }],
      on: {
        click: this.more
      }
    }, [
      h('div', {
        class: [this.xclass('load')]
      }, (() => {
        return this.$slots.loadMore ? this.$slots.loadMore : this.loadMoreText
      })())
    ]),
    h(
      'div', {
        class: [this.xclass('num')],
        directives: [{
          name: 'show',
          value: this.numDisplay
        }]
      }, [
        h('row', {
          props: {
            gap: 10
          }
        }, [
          h('column', {
            props: {
              xs: 12,
              s: 12,
              l: 1,
              xl: 1
            }
          }, [
            h('div', {
              class: [this.xclass('length')]
            }, `共 ${this.pageData.length} 条`)
          ]),
          h('column', {
            props: {
              xs: 12,
              s: 12,
              l: 6,
              xl: 6
            }
          }, [
            h('row', [
              h('column', [
                h(
                  'div', {
                    class: [
                      this.xclass('ele')
                    ],
                    directives: [{
                      name: 'show',
                      value: this.pageData.current !== 1
                    }],
                    on: {
                      click: this.start
                    }
                  }, [
                    h('icon', {
                      props: {
                        kind: 'arrow-west-fast'
                      }
                    })
                  ]
                )
              ]),
              h('column', [
                h(
                  'div', {
                    class: [
                      this.xclass('ele'),
                      {
                        [`${this.compPrefix}-invisible`]: this.preDisplay
                      }
                    ],
                    on: {
                      click: this.pre
                    }
                  }, [
                    h('icon', {
                      props: {
                        kind: 'arrow-west'
                      }
                    })
                  ]
                )
              ]),
              h('column', [
                h('ul', {
                  class: [this.xclass('ul'), `${this.compPrefix}-ul`]
                }, this.pageData.item.map((item, index) => {
                  let pageNum = index + 1

                  return h('li', {
                    class: [
                      this.xclass('li'),
                      this.xclass('ele'),
                      {
                        [this.xclass('li-active')]: pageNum === this.pageData.current
                      }
                    ],
                    on: {
                      click: (event) => this.click(event, pageNum)
                    }
                  }, pageNum)
                }))
              ]),
              h('column', [
                h(
                  'div', {
                    class: [
                      this.xclass('ele'),
                      {
                        [`${this.compPrefix}-invisible`]: this.nextDisplay
                      }
                    ],
                    on: {
                      click: this.next
                    }
                  }, [
                    h('icon', {
                      props: {
                        kind: 'arrow-east'
                      }
                    })
                  ]
                )
              ]),
              h('column', [
                h(
                  'div', {
                    class: [
                      this.xclass('ele'),
                      {
                        [`${this.compPrefix}-invisible`]: this.nextDisplay
                      }
                    ],
                    directives: [{
                      name: 'show',
                      value: this.pageData.length !== this.pageData.current
                    }],
                    on: {
                      click: this.end
                    }
                  }, [
                    h('icon', {
                      props: {
                        kind: 'arrow-east-fast'
                      }
                    })
                  ]
                )
              ])
            ])
          ]),
          h('column', {
            props: {
              xs: 12,
              s: 12,
              l: 5,
              xl: 5
            }
          }, [
            h(
              'div', {
                class: [this.xclass('search')]
              }, [
                h('span', {
                  class: [this.xclass('total')]
                }, `共 ${this.pageData.total} 页 `),
                h('span', '第 '),
                h('input-box', {
                  class: [this.xclass('jump-box')],
                  ref: 'jumpInput'
                }),
                h('span', ' 页 '),
                h('btn', {
                  class: [this.xclass('jump-btn')],
                  props: {
                    kind: 'default',
                    value: 'GO'
                  },
                  on: {
                    click: this.jump
                  }
                }, 'GO')
              ]
            )
          ])
        ])
      ]
    )
  ])
}

/**
 * menu.render.js
 */
export default function (h) {
  let selectOptEle = []
  let scopedSlots = {}

  if (this.$parent.multiple && this.$parent.selectAll) {
    selectOptEle.push(
      h('div', {
        class: [this.xclass('li')],
        on: {
          click: this.$parent.selectAllOption
        }
      }, [
        h('check', {
          props: {
            multiple: true,
            initVal: this.$parent.selectAll ? [-1] : [],
            initOpt: this.selectedAllCheckOpt
          }
        }),
        h('span', this.$parent.selectAllTxt)
      ])
    )
  }

  scopedSlots = ({
    item,
    index
  }) => {
    let element = []
    let optTxt = item[this.txtName]
    let optVal = item[this.valName]
    let rowEle = []

    if (this.multiple && !item.classify) {
      rowEle.push(
        h('column', {
          props: {
            span: 1
          }
        }, [
          h('check', {
            class: [this.xclass('li-check')],
            props: {
              theme: 'default',
              multiple: true,
              initVal: this.optRoot.checkboxVal(optVal),
              initOpt: this.selectedAllCheckOpt
            }
          })
        ])
      )
    }

    if (this.$scopedSlots[index]) {
      rowEle.push(
        h('column', {
          props: {
            span: 11
          }
        }, [
          this.$scopedSlots[index]({
            item
          })
        ])
      )
    } else {
      rowEle.push(
        h('column', {
          props: {
            span: 11
          }
        }, [
          h('span', {
            class: [this.xclass('li-text')],
            directives: [{
              name: 'bubble',
              value: {
                text: optTxt && optTxt.length > 9 ? optTxt : ''
              }
            }]
          }, optTxt)
        ])
      )
    }

    element.push(
      h('row', {
        props: {
          justify: 'justify'
        }
      }, rowEle)
    )

    if (this.hasSubOption(item)) {
      element.push(
        h('icon', {
          props: {
            kind: 'caret-right'
          }
        }),
        h('menu-opt', {
          props: {
            multiple: this.multiple,
            option: item.sub,
            optRoot: this.optRoot
          }
        })
      )
    }

    return h('div', {
      class: [this.liClass(item.classify, optVal)],
      on: {
        click: (event) => this.selectOption(event, index)
      }
    }, [
      element, h('motion-rip', {
        props: {
          switch: this.pressing
        },
        on: {
          'afterEnter': () => {
            this.pressing = false
          }
        }
      })
    ])
  }

  selectOptEle.push(
    h('list', {
      class: this.xclass('list'),
      props: {
        auto: true,
        item: this.option,
        pageSize: 6,
        pageType: 'more',
        pager: true,
        scrollerHeight: 200,
        theme: 'default'
      },
      scopedSlots: {
        default: scopedSlots
      },
      ref: 'list'
    })
  )

  return h('div', {
    class: [{
        [this.xclass('search-option-wrap')]: this.$parent.searchFilter
      },
      this.xclass('ul'),
      this.xclass(this.compClass)
    ]
  }, selectOptEle)
}

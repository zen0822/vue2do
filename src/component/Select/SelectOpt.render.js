/**
 * menu.render.js
 */
export default function (h) {
  let selectOptEle = []

  const scopedSlots = ({
    item,
    index
  }) => {
    let element = []
    let optTxt = item[this.textName]
    let optVal = item[this.valueName]
    let rowEle = []

    if (this.multiple && !item.classify) {
      rowEle.push(
        h('column', {
          props: {
            span: 1
          },
          style: {
            width: '20px'
          }
        }, [
          h('check', {
            class: [this.xclass('li-check')],
            props: {
              multiple: true,
              value: this.optRoot.checkboxVal(optVal),
              option: this.selectedAllCheckOpt,
              ui: this.ui,
              theme: this.theme
            }
          })
        ])
      )
    }

    if (this.$scopedSlots[index]) {
      rowEle.push(
        h('column', {
          props: {
            span: this.multiple ? 11 : 12
          },
          style: {
            width: this.multiple ? 'calc(100% - 20px)' : undefined
          }
        }, [
          this.$scopedSlots[index]({
            item
          })
        ])
      )
    } else {
      let attrs = {}
      const omitTxt = false // TODO: 计算字符是否被省略了

      if (omitTxt) {
        Object.assign(attrs, {
          title: optTxt
        })
      }

      rowEle.push(
        h('column', {
          props: {
            span: this.multiple ? 11 : 12
          },
          style: {
            width: this.multiple ? 'calc(100% - 20px)' : undefined
          }
        }, [
          h('span', {
            attrs,
            class: [this.xclass('li-text')],
            directives: [{
              name: 'bubble',
              value: {
                text: optTxt === undefined ? '' : optTxt
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
            kind: 'caret-right',
            ui: this.ui,
            theme: this.theme
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
      class: [
        this.liClass(item.classify, optVal),
        {
          [this.xclass('li-focus')]: index - 1 === this.focusIndex
        }
      ],
      on: {
        click: (event) => this._handlerClick(event, index),
        mouseenter: (event) => this._handlerMouseenter(event, index)
      },
      ref: `option${index}`,
      style: {
        minWidth: `${this.menuWidth}px`
      }
    }, [
      element,
      h('motion-rip', {
        props: {
          overflow: true,
          speed: 'fast'
        },
        ref: `rip${index}`
      })
    ])
  }

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
            value: this.$parent.selectAll ? [-1] : [],
            option: this.selectedAllCheckOpt,
            ui: this.ui,
            theme: this.theme
          }
        }),
        h('span', this.$parent.selectAllTxt)
      ])
    )
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
        height: 200,
        ui: this.ui,
        theme: this.theme
      },
      scopedSlots: {
        default: scopedSlots
      },
      ref: 'list'
    })
  )

  return h('div', {
    class: [
      {
        [this.xclass('search-option-wrap')]: this.$parent.searchFilter
      },
      this.xclass('ul'),
      this.xclass(this.compClass)
    ]
  }, selectOptEle)
}

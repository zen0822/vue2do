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
    let optTxt = item[this.txtName]
    let optVal = item[this.valName]
    let rowEle = []

    if (this.multiple && !item.classify) {
      rowEle.push(
        h('column', {
          props: {
            span: 1,
            ui: this.ui,
            theme: this.theme
          }
        }, [
          h('check', {
            class: [this.xclass('li-check')],
            props: {
              multiple: true,
              initVal: this.optRoot.checkboxVal(optVal),
              initOpt: this.selectedAllCheckOpt,
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
          justify: 'justify',
          ui: this.ui,
          theme: this.theme
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
        click: (event) => this._handlerClidk(event, index),
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
          overflow: true
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
            initVal: this.$parent.selectAll ? [-1] : [],
            initOpt: this.selectedAllCheckOpt,
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

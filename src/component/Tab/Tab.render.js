/**
 * tab.render
 */

export default function (h) {
  let tabOption = []

  if (this.initOpt.length > 0) {
    tabOption = this.option.map((item, index) => {
      return h('div', {
        class: [this.xclass('ele')],
        on: {
          click: (event) => this.tab(event, index + 1)
        },
        slot: index + 1
      }, item.text)
    })
  } else {
    let optionTmp = []

    this.$slotKey.forEach((item, index) => {
      if (item === 'default') {
        return false
      }

      const $slot = this.$slots[item][0]
      const $slotAttr = $slot.data.attrs
      let optionItem = {}

      if ($slotAttr.text) {
        Object.assign(optionItem, {
          value: $slotAttr.value,
          text: $slotAttr.text
        })
      } else {
        Object.assign(optionItem, {
          value: $slotAttr.value,
          text: $slot.componentOptions.children[0].text.trim()
        })
      }

      optionTmp.push(optionItem)

      tabOption.push(
        h('div', {
          on: {
            click: (event) => this.tab(event, index + 1)
          },
          slot: item
        }, this.$slots[item])
      )
    })

    this.option = optionTmp
  }

  return h(
    'div', {
      class: [this.cPrefix, this.xclass(this.themeClass)]
    }, [
      h('shift', {
        class: [this.xclass('shift')],
        props: {
          after: `${this.cPrefix}-active`
        },
        ref: 'shift'
      }, tabOption)
    ]
  )
}

/**
 * tab.render
 */

export default function (h) {
  let tabOption = []
  let scrollerChildren = []
  const tabBtnEle = (children, index) => {
    return h('btn', {
      class: [this.xclass('btn')],
      on: {
        click: (event) => this.tab(event, index + 1)
      },
      props: {
        type: 'flat',
        ui: this.ui,
        theme: 'grey',
        radius: 'none'
      }
    }, children)
  }

  if (this.initOpt.length > 0) {
    tabOption = this.option.map((item, index) => {
      return h('div', {
        class: [this.xclass('ele')],
        slot: index + 1
      }, [
        tabBtnEle(item.text, index)
      ])
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
          slot: item
        }, [
          tabBtnEle(this.$slots[item], index)
        ])
      )
    })

    this.option = optionTmp
  }

  scrollerChildren.push(
    h('shift', {
      class: [this.xclass('shift')],
      props: {
        after: `${this.cPrefix}-active`,
        ui: this.ui,
        theme: this.theme,
        justify: this.shiftJustify
      },
      ref: 'shift'
    }, tabOption)
  )

  if (this.UIMaterial) {
    let currentIndex = this.currentIndex <= 1 ? 1 : this.currentIndex

    scrollerChildren.push(
      h('div', {
        class: [this.xclass('bar')],
        style: {
          width: `${this.tabEleWidth}px`,
          left: `${this.tabEleWidth * (currentIndex - 1)}px`
        }
      })
    )
  }

  return h(
    'div', {
      class: [
        this.cPrefix,
        this.xclass([this.themeClass, this.uiClass])
      ]
    }, [
      h('scroller', {
        props: {
          width: '100%',
          hide: true
        },
        ref: 'scroller'
      }, scrollerChildren)
    ]
  )
}

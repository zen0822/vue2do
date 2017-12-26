/**
 * menu.render.js
 */
export default function (h) {
  let triggerChildren = []
  let menuChildren = []
  let menuMenuEle = []

  triggerChildren.push(
    h('input', {
      class: [this.xclass('trigger-input')],
      on: {
        focus: this.focus,
        blur: this.blur
      }
    }),
    this.$slots.trigger
  )

  menuChildren.push(
    h('scroller', {
      props: {
        height: 200
      },
      ref: 'scroller'
    }, [
      h('div', {
        class: this.xclass('opt')
      }, [this.$slots.default])
    ])
  )

  menuMenuEle = [
    h('div', {
      class: [this.xclass('panel')],
      directives: [{
        name: 'show',
        value: false
      }],
      style: [this.menuMenuPoiStyle, this.menuMenuStyle],
      ref: 'menuPanel'
    }, [menuChildren])
  ]

  return h('div', {
    class: this.menuClass,
    directives: [{
      name: 'clickParent',
      expression: this.clickParent
    }],
    on: {
      keydown: this.keydown
    }
  }, [
    h('div', {
      class: [this.xclass('ban')],
      directives: [{
        name: 'show',
        value: this.ban
      }]
    }),

    h('div', {
      class: [this.xclass('trigger')],
      on: {
        click: this.click
      }
    }, [triggerChildren]),

    h('motion', {
        props: {
          height: this.menuHeight,
          width: this.menuWidth,
          slideLength: this.triggerHeight,
          sync: true
        },
        ref: 'motion'
      },
      menuMenuEle
    )
  ])
}

export default function (h) {
  let footerChildren = []

  if (this.noBtn) {
    footerChildren.push(h('btn', {
      props: {
        value: this.noBtn,
        type: 'flat',
        ui: this.ui,
        theme: this.theme
      },
      on: {
        click: this.no
      }
    }))
  }

  if (this.okBtn) {
    footerChildren.push(
      h('btn', {
        props: {
          value: this.okBtn,
          type: 'flat',
          ui: this.ui,
          theme: this.theme
        },
        on: {
          click: this.ok
        }
      })
    )
  }

  return footerChildren
}

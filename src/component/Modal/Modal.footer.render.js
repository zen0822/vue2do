export default function (h) {
  let footerChildren = []

  if (this.noBtn) {
    footerChildren.push(h('btn', {
      props: {
        value: this.noBtn,
        type: this.UIMaterial ? 'flat' : 'button',
        ui: this.state.ui,
        theme: 'grey'
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
          type: this.UIMaterial ? 'flat' : 'button',
          ui: this.state.ui,
          theme: this.state.theme
        },
        on: {
          click: this.ok
        }
      })
    )
  }

  return footerChildren
}

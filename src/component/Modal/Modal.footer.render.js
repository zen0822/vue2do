export default function (h) {
  let footerChildren = []

  if (this.noBtn) {
    footerChildren.push(h('btn', {
      props: {
        value: this.noBtn,
        type: this.UIMaterial ? 'flat' : 'button',
        ui: this.stateUI,
        theme: 'white'
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
          ui: this.stateUI,
          theme: this.stateTheme
        },
        on: {
          click: this.ok
        }
      })
    )
  }

  return footerChildren
}

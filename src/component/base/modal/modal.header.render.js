export default function (h) {
	let headerChildren = []

	if (this.isFull) {
    if (!this.isBiggerFull) {
      headerChildren.push(
        h('column',
          {
            class: [this.xclass('header-nav')],
            props: {
              xs: 2,
              l: 1
            },
            nativeOn: {
              click: this.clickFullNav
            }
          },
          [
            h('icon', {
              props: {
                kind: this.commit ? 'close' : 'arrow-left',
                size: 'L'
              }
            })
          ]
        )
      )
    }

    headerChildren.push(
      h('column',
        {
          props: {
            xs: this.commit ? 8 : 9,
            l: this.commit ? 10 : 11,
          }
        },
        [
          h('span', {
            class: this.xclass('header-title')
          }, this.modalHeader)
        ]
      )
    )

    if (!this.isBiggerFull && this.commit) {
      headerChildren.push(
        h('column', {
          props: {
            xs: 2,
            l: 1
          }
        }, [h('span', this.okBtn)])
      )
    }
  } else {
    headerChildren.push(
      h('column', { props: { span: 12 } },
        [
          h('span', {
            class: this.xclass('header-title')
          }, this.modalHeader)
        ]
      )
    )
  }

	return headerChildren
}
/**
 * complete.render.js
 */

export default function (h) {
  return h('div', {
    class: [this.cPrefix]
  }, [
    (() => {
      if (this.input) {
        return h('input-box', {
          props: {
            ui: this.ui,
            theme: this.theme
          },
          class: [this.xclass('input')]
        })
      } else {
        return null
      }
    })(),
    h('div', {
      class: [this.xclass('match')],
      directives: [{
        name: 'show',
        value: this.matchDisplay
      }]
    }, [
      h('list', {
        props: {
          item: this.matchOpt,
          pageSize: 6,
          auto: true,
          pageType: 'more',
          pager: true,
          scrollerHeight: 150,
          ui: this.ui,
          theme: this.theme
        },
        scopedSlots: {
          default: (props) => {
            return h('div', {
              class: [this.xclass('list-content')],
              on: {
                click: (event) => this._clickMatchOpt(event, props.index)
              }
            }, [
              h('span', props.item.text)
            ])
          }
        }
      })
    ])
  ])
}

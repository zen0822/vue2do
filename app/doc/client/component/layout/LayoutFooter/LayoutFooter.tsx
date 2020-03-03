import './LayoutFooter.scss'
import { CreateElement, VNode } from 'vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'LayoutFooter',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(this: any, h: CreateElement): VNode {
    return (
      <div class='footer-layout-stage'>
        Copyright © 2020 Zen. nobody can keep the right
      </div>
    )
  }
})

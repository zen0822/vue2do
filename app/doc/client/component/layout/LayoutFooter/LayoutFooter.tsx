import './LayoutFooter.scss'
import { VNode } from 'vue'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'LayoutFooter',
  setup() {
    return (): VNode => (
      <div class='footer-layout-stage'>
        Copyright © 2020 Zen. nobody can keep the right
      </div>
    )
  }
})

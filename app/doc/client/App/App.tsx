import './App.scss'
import {
  onMounted,
  defineComponent,
  watch,
  ref
} from '@vue/composition-api'

import {
  useStore,
  useState
} from '../vuex/store'

import { VNode } from 'vue'
import commonStore from '../vuex/module/common/type.json'

import LayoutHeader from '../component/layout/LayoutHeader/LayoutHeader'
import LayoutFooter from '../component/layout/LayoutFooter/LayoutFooter'

require('file-loader?name=favicon.ico!../asset/img/favicon.png')

const store = useStore()

export default defineComponent({
  name: 'App',
  props: {
    testData: String
  },
  setup() {
    const appContentRef = ref<{ $el: any }>(null)
    const headerRef = ref<{ $el: any }>(null)
    const footerRef = ref<{ $el: any }>(null)
    const contentHeight = ref(0)

    const windowProps = useState(commonStore.window.get)
    const deviceSize = useState(commonStore.deviceSize)
    const appStyle = useState(commonStore.deviceSize)

    onMounted(function () {
      store.dispatch(commonStore.window.add, {
        prop: 'innerHeight',
        value: window.innerHeight
      })
      store.dispatch(commonStore.appContent.add, appContentRef.value)
    })

    watch(windowProps, (val) => {
      if (val) {
        contentHeight.value = val.innerHeight
          - (headerRef?.value?.$el.offsetHeight) ?? 0
          - (footerRef?.value?.$el.offsetHeight) ?? 0
      }
    })

    return (): VNode => (
      <div class='app-container' data-size={deviceSize.value}>
        <LayoutHeader ref={headerRef} />
        <div
          class='app-content'
          style={appStyle.value}
          ref={appContentRef}
        >
          <router-view />
        </div>
        <LayoutFooter ref={footerRef} />
      </div>
    )
  }
})

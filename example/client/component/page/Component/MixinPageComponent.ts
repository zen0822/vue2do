import Vue from 'vue'
import commonStore from '../../../vuex/module/common/type.json'
import Component from 'vue-class-component'

import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
import {
  debounce
} from '../../../../../src/util'

// import store from '../../../vuex/store'
const vuexStore = namespace('../../../vuex/store')

let testOpt: Array<object> = []

for (let i = 0, len = 33; i < len; i++) {
  testOpt.push({
    text: 'test-' + i,
    name: 'name-' + i,
    size: 'size-' + i,
    en: 'en-' + i,
    value: i
  })
}

@Component
export default class MixinPageComponent extends Vue {
  mixinValue = 'Hello'

  @Getter(commonStore.appContent.get) getterAppContent: string = ''

  get varPrefix() {
    return 'VUE2DO'
  }

  get testOpt() {
    return testOpt
  }

  get appContent() {
    return this.$store.getters[commonStore.appContent.get]
  }

  // get compStage() {
  //   return this.$store.getters[commonStore.compStage.get]
  // }

  // get typeUI() {
  //   return this.$store.getters[commonStore.typeUI.get]
  // }

  // get typeTheme() {
  //   return this.$store.getters[commonStore.typeTheme.get]
  // }

  // get deviceSize() {
  //   return this.$store.getters[commonStore.deviceSize]
  // }

  private _initComp() {
    console.log(this.getterAppContent)
  }

  anchorLink(name: string) {
    return this.$route.path + '#' + name
  }

  // goAnchor(evt: { currentTarget: object }) {
  //   let anchor:any = evt.currentTarget

  //   this.compStage.scrollTop = anchor.offsetTop
  // }

  mounted() {
    this._initComp()

    const updateDeviceSize = () => {
      const deviceSizeEle = document.querySelector('.z-css-device-size')
      let deviceType = ''

      if (deviceSizeEle) {
        deviceType = getComputedStyle(deviceSizeEle, ':after').getPropertyValue('content')

        this.$store.dispatch(commonStore.deviceSize, deviceType)
      }
    }

    window.addEventListener('resize', debounce(updateDeviceSize, 100))

    updateDeviceSize()
  }
}

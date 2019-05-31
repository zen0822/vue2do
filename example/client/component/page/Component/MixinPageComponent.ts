import Vue from 'vue'
import commonStore from '../../../vuex/module/common/type.json'
import Component from 'vue-class-component'

import {
  Getter,
  namespace
} from 'vuex-class'
import {
  debounce
} from '../../../../../src/util'

namespace('../../../vuex/store')

let testOpt: Array<object> = []

for (let i = 0; i < 33; i++) {
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
  @Getter(commonStore.appContent.get) getterAppContent: object | undefined
  @Getter(commonStore.compStage.get) getterCompStage: { scrollTop: number } | undefined
  @Getter(commonStore.typeUI.get) getterTypeUI: string | undefined
  @Getter(commonStore.typeTheme.get) getterTypeTheme: string | undefined
  @Getter(commonStore.deviceSize) getterDeviceSize: string | undefined

  get varPrefix() {
    return 'VUE2DO'
  }

  get testOpt() {
    return testOpt
  }

  get appContent() {
    return this.getterAppContent
  }

  get compStage() {
    return this.getterCompStage
  }

  get typeUI() {
    return this.getterTypeUI
  }

  get typeTheme() {
    return this.getterTypeTheme
  }

  get deviceSize() {
    return this.getterDeviceSize
  }

  private _initComp() {
    // console.log(this.typeUI)
  }

  anchorLink(name: string) {
    return this.$route.path + '#' + name
  }

  goAnchor(evt: { currentTarget: object }) {
    let anchor: any = evt.currentTarget

    if (this.compStage) {
      this.compStage.scrollTop = anchor.offsetTop
    }
  }

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

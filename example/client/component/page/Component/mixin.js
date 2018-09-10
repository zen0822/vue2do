import store from '../../../vuex/store'
import commonStore from '../../../vuex/module/common/type.json'
import {
  throttle
} from 'vue2do/src/util'

let testOpt = []

for (let i = 0, len = 33; i < len; i++) {
  testOpt.push({
    text: 'test-' + i,
    name: 'name-' + i,
    size: 'size-' + i,
    en: 'en-' + i,
    value: i
  })
}

export default {
  store,

  methods: {
    _initComp() {

    },

    anchorLink(name) {
      return this.$route.path + '#' + name
    },

    goAnchor(evt) {
      let anchor = evt.currentTarget
      this.compStage.scrollTop = anchor.offsetTop
    }
  },

  computed: {
    varPrefix() {
      return 'VUE2DO'
    },
    testOpt() {
      return testOpt
    },
    appContent() {
      return this.$store.getters[commonStore.appContent.get]
    },
    compStage() {
      return this.$store.getters[commonStore.compStage.get]
    },
    typeUI() {
      return this.$store.getters[commonStore.typeUI.get]
    },
    typeTheme() {
      return this.$store.getters[commonStore.typeTheme.get]
    },
    deviceSize() {
      return this.$store.getters[commonStore.deviceSize]
    }
  },

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

    window.addEventListener('resize', throttle(updateDeviceSize))

    updateDeviceSize()
  }
}

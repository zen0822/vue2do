import {
  useStore,
  useState
} from '../../../vuex/store'
import commonStore from '../../../vuex/module/common/type.json'
import {
  debounce
} from '@vue2do/component/util'
import {
  ref
} from '@vue/composition-api'

const store = useStore()

const testOptTemp = []

for (let i = 0, len = 33; i < len; i++) {
  testOptTemp.push({
    text: 'test-' + i,
    name: 'name-' + i,
    size: 'size-' + i,
    en: 'en-' + i,
    value: i
  })
}

const varPrefix = ref('VUE2DO')
const testOpt = ref(testOptTemp)
const appContent = useState(commonStore.appContent.get)
const compStage = useState(commonStore.compStage.get)
const deviceSize = useState(commonStore.deviceSize.get)
const typeUI = useState(commonStore.typeUI.get)
const typeTheme = useState(commonStore.typeTheme.get)

const goAnchor = function (evt) {
  const anchor = evt.currentTarget
  compStage.scrollTop = anchor.offsetTop
}

const anchorLink = function (route, name) {
  return route.path + '#' + name
}

const mounted = function () {
  const updateDeviceSize = () => {
    const deviceSizeEle = document.querySelector('.z-css-device-size')
    let deviceType = ''

    if (deviceSizeEle) {
      deviceType = getComputedStyle(deviceSizeEle, ':after').getPropertyValue('content')

      store.dispatch(commonStore.deviceSize, deviceType)
    }
  }

  window.addEventListener('resize', debounce(updateDeviceSize, 100))

  updateDeviceSize()
}

export const mixinConf = {
  store,

  methods: {
    _initComp() {
      // TODO
    },

    anchorLink(name) {
      return this.$route.path + '#' + name
    },

    goAnchor(evt) {
      const anchor = evt.currentTarget
      this.compStage.scrollTop = anchor.offsetTop
    }
  },

  computed: {
    varPrefix() {
      return varPrefix
    },
    testOpt() {
      return testOptTemp
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

    window.addEventListener('resize', debounce(updateDeviceSize, 100))

    updateDeviceSize()
  }
}

export default mixinConf

export {
  appContent,
  compStage,
  deviceSize,
  typeUI,
  typeTheme,
  testOpt,
  goAnchor,
  anchorLink,
  mounted
}

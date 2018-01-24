import store from '../../../vuex/store'
import commonStore from '../../../vuex/module/common/type.json'

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
    testOpt() {
      return testOpt
    },
    appContent() {
      return this.$store.getters[commonStore.appContent.get]
    },
    compStage() {
      return this.$store.getters[commonStore.compStage.get]
    }
  },

  mounted() {
    this._initComp()
  }
}

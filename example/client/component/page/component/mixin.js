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
  methods: {
    _init() {

    },

    anchorLink(name) {
      return this.$route.path + '#' + name
    },

    goAnchor(evt) {
      let anchor = evt.currentTarget
      document.body.scrollTop = anchor.offsetTop
    }
  },

  computed: {
    testOpt() {
      return testOpt
    }
  },

  mounted() {
    this._init()
  }
}

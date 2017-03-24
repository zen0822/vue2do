export default {
  methods: {
    anchorLink(name) {
      return this.$route.path + '#' + name
    },

    goAnchor(evt) {
      let anchor = evt.currentTarget
      document.body.scrollTop = anchor.offsetTop
    }
  }
}

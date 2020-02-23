import store from '../../vuex/store'
import commonStore from '../../vuex/module/common/type.json'

export default {
  store,

  computed: {
    typeUI() {
      return this.$store.getters[commonStore.typeUI.get]
    },
    typeTheme() {
      return this.$store.getters[commonStore.typeTheme.get]
    }
  }
}

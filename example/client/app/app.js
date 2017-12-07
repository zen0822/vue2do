import './app.scss'
import template from './app.pug'

import store from '../vuex/store'
import commonStore from '../vuex/module/common/type.json'

import headerLayout from 'ex/client/component/layout/header-layout/header-layout'
import footerLayout from 'ex/client/component/layout/footer-layout/footer-layout'

require('file-loader?name=favicon.ico!src/asset/img/favicon.ico')

export default {
  name: 'app',

  store,

  data() {
    return {
      bodyHeight: 0
    }
  },

  template: template(),

  components: {
    'header-layout': headerLayout,
    'footer-layout': footerLayout
  },

  computed: {
    windowProps() {
      return this.$store.getters[commonStore.window.get]
    }
  },

  watch: {
    'windowProps' (val) {
      let bodyHeight = document.body.offsetHeight

      if (bodyHeight < val.innerHeight) {
        this.bodyHeight = val.innerHeight - this.$refs.header.$el.offsetHeight
      }
    }
  },

  mounted() {
    this.$store.dispatch(commonStore.window.add, {
      prop: 'innerHeight',
      value: window.innerHeight
    })
  }
}

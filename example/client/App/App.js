import './App.scss'
import template from './App.pug'

import store from '../vuex/store'
import commonStore from '../vuex/module/common/type.json'

import LayoutHeader from 'ex/client/component/layout/LayoutHeader/LayoutHeader'
import LayoutFooter from 'ex/client/component/layout/LayoutFooter/LayoutFooter'

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
    'header-layout': LayoutHeader,
    'footer-layout': LayoutFooter
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

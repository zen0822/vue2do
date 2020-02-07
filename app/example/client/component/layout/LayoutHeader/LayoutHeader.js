import './LayoutHeader.scss'
import template from './LayoutHeader.pug'
import mixin from '../mixin'

export default {
  name: 'header-layout',

  template: template(),

  mixins: [mixin],

  data() {
    return {
      logoUrl: require('file-loader?name=favicon.ico!../../../asset/img/favicon.ico'),
      menuOpt: [{
        'name': '组件',
        'route': '/component/start'
      }, {
        'name': '构建',
        'route': '/build'
      }, {
        'name': '关于',
        'route': '/about'
      }],
      sortIconDisplay: true
    }
  },

  methods: {
    showMenu() {
      this.sortIconDisplay = false
      this.$refs.mobileMenu.show()
    },

    hideMenu() {
      this.sortIconDisplay = true
    }
  }
}

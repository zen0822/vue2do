import './LayoutHeader.scss'
import template from './LayoutHeader.pug'
import compMenuOpt from '../../page/Component/menuOpt.json'

export default {
  name: 'header-layout',

  template: template(),

  data() {
    return {
      logoUrl: require('src/asset/img/z-white.png'),
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

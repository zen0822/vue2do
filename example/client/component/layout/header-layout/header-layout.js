import './header-layout.scss'
import template from './header-layout.tpl'
import compMenuOpt from '../../page/component/menuOpt.json'

export default {
  name: 'header-layout',

  template,

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

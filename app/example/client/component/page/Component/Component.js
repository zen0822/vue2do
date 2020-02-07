import './Component.scss'
import template from './Component.pug'
import menuOpt from './menuOpt.json'
import mixin from './mixin'
import commonStore from '../../../vuex/module/common/type.json'

import alert from '@vue2do/component/module/Modal/alert'

export default {
  name: 'PageComponent',

  template: template(),

  mixins: [mixin],

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$nextTick(() => {
        vm.goAnchor(to.hash.replace('#', ''))
      })
    })
  },

  data() {
    return {
      menuOpt,
      testName: 'test',
      dropMenuOpt: [],
      classifyOpt: {
        recent: [{
          value: 1,
          text: 'test1'
        }],
        hot: [{
          value: 1,
          text: 'test1'
        }, {
          value: 2,
          text: 'test2'
        }, {
          value: 3,
          text: 'test3'
        }]
      },

      initVal: []
    }
  },

  computed: {
    componentStyle() {
      if (!this.appContent || this.deviceSize === 'xs') {
        return {
          height: ''
        }
      }

      return {
        height: this.appContent.offsetHeight + 'px'
      }
    }
  },

  methods: {
    optProcessor(option) {
      option.unshift({
        value: -1,
        text: 'optProcessor'
      })

      return option
    },

    clickIcon() {
      // TODO
    },

    submit() {
      this.$refs.submit.openLoading()
      this.$refs.formArea.verify()
      alert(`提交的数据：${this.$refs.formArea.queryOpt}`)
    },

    next() {
      this.$refs.shift.rotate()
    },

    goAnchor(hash) {
      if (!hash) {
        return false
      }

      const anchor = document.getElementById(hash)

      anchor && (this.compStage.scrollTop = anchor.offsetTop)
    },

    afterEnter() {
      return this.goAnchor(this.$route.hash.replace('#', ''))
    }
  },

  created() {
    for (let i = 0, len = 33; i < len; i++) {
      this.dropMenuOpt.push({
        text: 'test-' + i,
        name: 'name-' + i,
        size: 'size-' + i,
        en: 'en-' + i,
        value: i
      })
    }
  },

  beforeMount() {
    const localStorageTheme = window.localStorage.getItem(`${this.varPrefix}_THEME`)
    const localStorageUI = window.localStorage.getItem(`${this.varPrefix}_UI`)

    if (localStorageTheme) {
      this.$store.dispatch(commonStore.typeTheme.add, localStorageTheme)
    } else {
      this.$store.dispatch(commonStore.typeTheme.add, 'primary')
      window.localStorage.setItem(`${this.varPrefix}_THEME`, 'primary')
    }

    if (localStorageUI) {
      this.$store.dispatch(commonStore.typeUI.add, localStorageUI)
    } else {
      this.$store.dispatch(commonStore.typeUI.add, 'material')
      window.localStorage.setItem(`${this.varPrefix}_UI`, 'material')
    }
  },

  mounted() {
    this.$refs.theme.$on('change', ({
      value
    }) => {
      this.$store.dispatch(commonStore.typeTheme.add, value)

      window.localStorage.setItem(`${this.varPrefix}_THEME`, value)
    })

    this.$refs.ui.$on('change', ({
      value
    }) => {
      this.$store.dispatch(commonStore.typeUI.add, value)

      window.localStorage.setItem(`${this.varPrefix}_UI`, value)
    })

    setTimeout(() => {
      this.dropMenuOpt = this.dropMenuOpt.concat([{
        value: 4,
        text: 'test4'
      }, {
        value: 5,
        text: 'test5'
      }, {
        value: 6,
        text: 'test6'
      }])

      this.initVal = ['2', '4']
    }, 3000)

    this.$nextTick(() => {
      this.$store.dispatch(commonStore.compStage.add, this.$refs.compStage)
    })
  }
}

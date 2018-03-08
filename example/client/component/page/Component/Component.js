import './Component.scss'
import template from './Component.pug'
import menuOpt from './menuOpt.json'
import mixin from './mixin'
import commonStore from '../../../vuex/module/common/type.json'

import {
  alert,
  confirm,
  tip
} from 'vue2do/index.js'

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
      const appContent = this.appContent
      const deviceSizeEle = document.querySelector('.z-css-device-size')
      let deviceType = ''

      if (deviceSizeEle) {
        deviceType = getComputedStyle(deviceSizeEle, ':after').getPropertyValue('content')
      }

      if (!appContent || deviceType === '"xs"') {
        return {}
      }

      return {
        height: appContent.offsetHeight + 'px'
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

    clickIcon() {},

    submit() {
      this.$refs.submit.openLoading()
      this.$refs.formArea.verify()
      console.log(this.$refs.formArea.queryOpt)
    },

    next() {
      this.$refs.shift.rotate()
    },

    goAnchor(hash) {
      if (!hash) {
        return false
      }

      let anchor = document.getElementById(hash)

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

  mounted() {
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

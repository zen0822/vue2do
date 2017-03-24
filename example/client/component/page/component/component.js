import './component.scss'
import template from './component.tpl'
import tip from 'src/component/base/pop/tip'
import alert from 'src/component/base/pop/alert'
import menuOpt from './menuOpt.json'
import mixin from './mixin'

export default {
  name: 'page-component-layout',

  template,

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

  methods: {
    optProcessor(option) {
      option.unshift({
        value: -1,
        text: 'optProcessor'
      })

      return option
    },

    clickIcon() {
    },

    submit() {
      this.$refs.submit.openLoading()
      this.$refs.formArea.verify()
      console.log(this.$refs.formArea.queryOpt)
    },

    next() {
      this.$refs.shift.rotate()
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
  }
}

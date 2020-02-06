import './Select.scss'
import pug from './Select.pug'
import mixin from '../../mixin'

export default {
  name: 'PageCompSelect',

  template: pug(),

  mixins: [mixin],

  data() {
    return {
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
    selectOpt() {
      this.testOpt.unshift({
        value: -1,
        text: '请选择'
      })

      return this.testOpt
    }
  },

  created() {
    const testOpt = []

    for (let i = 0, len = 13; i < len; i++) {
      testOpt.push({
        text: 'test-' + i,
        name: 'name-' + i,
        size: 'size-' + i,
        en: 'en-' + i,
        value: i
      })
    }

    this.dropMenuOpt = testOpt

    setTimeout(() => {
      this.dropMenuOpt.push(...testOpt)
    }, 10000)
  }
}

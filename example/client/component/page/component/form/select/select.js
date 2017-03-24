import './select.scss'
import template from './select.tpl'
import mixin from '../../mixin'

export default {
  template,

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
  }
}

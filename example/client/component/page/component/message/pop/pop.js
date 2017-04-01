import './pop.scss'
import template from './pop.tpl'
import mixin from '../../mixin'
import alert from 'src/component/base/pop/alert'
import confirm from 'src/component/base/pop/confirm'

export default {
  template,

  mixins: [mixin],

  data() {
    return {
      testName: 'test'
    }
  },

  methods: {
    alert() {
      alert({
        message: '这是一个弹窗'
      })
    },

    confirm() {
      confirm({
        message: '这是一个弹窗'
      })
    }
  }
}

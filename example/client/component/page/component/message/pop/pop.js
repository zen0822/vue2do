import './pop.scss'
import pugTpl from './pop.pug'
import mixin from '../../mixin'
import alert from 'src/component/base/pop/alert'
import confirm from 'src/component/base/pop/confirm'

export default {
  template: pugTpl(),

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

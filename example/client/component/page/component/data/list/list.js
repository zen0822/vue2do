import './list.scss'
import pug from './list.pug'
import mixin from '../../mixin'

export default {
  template: pug(),

  mixins: [mixin],

  data() {
    return {
      testName: 'test',
      pageData: {
        current: 1,
        size: 10,
        total: 2
      }
    }
  },

  mounted() {
    this.$refs.list.$on('switchPage', ({ currentPage }) => {
      this.pageData.total++
      this.pageData.current++
    })
  }
}

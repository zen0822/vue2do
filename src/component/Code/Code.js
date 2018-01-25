/**
 * code 组件
 *
 * @prop code - 代码
 * @prop type - 语言类型
 *
 */

import './Code.scss'
import render from './Code.render.js'
import baseMixin from '../../mixin/base'
import scrollerComp from '../Scroller/Scroller'

export default {
  name: 'Code',

  mixins: [baseMixin],

  render,

  components: {
    scroller: scrollerComp
  },

  props: {
    code: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },

  data() {
    return {
      lineNum: 3,
      preWidth: 0 // pre 的宽度
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-code`
    }
  },

  methods: {
    _initComp() {
      this.preWidth = this.$refs.article.offsetWidth - 50
    },

    _binder() {
      this.$refs.scroller.$on('change', () => {
        this.preWidth = this.$refs.article.offsetWidth - 50
      })
    }
  }
}

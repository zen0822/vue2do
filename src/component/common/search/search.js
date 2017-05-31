/**
 * search 组件
 *
 * @prop input - 显示输入框，默认显示
 * @prop option - 搜索选项数据
 * @prop keyword - 搜索关键字
 *
 * @event change - 搜索结果改变
 */

import './search.scss'
import render from './search.render'
import baseMixin from '../../../mixin/base'

import inputComp from '../../base/input/input'
import listComp from '../../common/list/list'

const searchComp = {
  name: 'search',

  render,

  mixins: [baseMixin],

  components: {
    list: listComp,
    'input-box': inputComp
  },

  props: {
    input: {
      type: Boolean,
      default: true
    },
    option: {
      type: Array,
      default: () => []
    },
    keyword: {
      type: [String, Number],
      default: ''
    }
  },

  data() {
    return {
      // 组件名字
      compName: 'search',
      // 搜索结果的显示状态
      matchDisplay: false,
      // 匹配的补全值
      matchOpt: []
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-search`
    }
  },

  watch: {
    keyword(val) {
      this.search(val)
    }
  },

  methods: {
    _setDataOpt() {
      this.matchOpt = this.option.slice()
    },

    _init() {
      this.search(this.keyword)
    },

    // 点击匹配的搜索选项
    _clickMatchOpt() {

    },

    /**
     * 获取搜索补全的数据
     * @return {Object} this - 组件
     */
    search(keyword) {
      if ((keyword === 0 || !keyword) || !(Array.isArray(this.option) && this.option.length > 0)) {
        this.matchOpt = []
      } else {
        this.matchOpt = this.option.filter((item) => {
          return item.text.indexOf(keyword) > -1
        })
      }

      this.$emit('change', {
        emitter: this,
        matchOpt: this.matchOpt
      })

      this.matchDisplay = this.matchOpt.length !== 0
    }
  }
}

export default searchComp

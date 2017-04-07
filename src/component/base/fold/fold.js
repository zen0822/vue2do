/**
 * fold 组件
 *
 * @props initOpt - 折叠版的初始化数据
 * @props initIndex - 当前展开的折叠板
 * @props spread-all - 展开全部
 * @props one - 开启一次只能展开一个面板功能
 * @props type - 布局类型
 *
 */

import Vue from 'vue'
import './fold.scss'
import render from './fold.render.js'
import baseMixin from 'src/mixin/base'
import iconComp from 'src/component/base/icon/icon'
import foldTransition from 'src/component/transition/fold'

const foldTitleComp = {
  name: 'fold-title',
  mixins: [baseMixin],
  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-fold-title`
    }
  },
  render(h) {
    return h('div', {
      class: [this.cPrefix]
    }, this.$slots.default)
  }
}

const foldContentComp = {
  name: 'fold-content',
  mixins: [baseMixin],
  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-fold-content`
    }
  },
  render(h) {
    return h('div', {
      class: [this.cPrefix]
    }, this.$slots.default)
  }
}

const foldComp = {
  name: 'fold',

  mixins: [baseMixin],

  render,

  components: {
    icon: iconComp,
    'fold-transition': foldTransition
  },

  props: {
    initIndex: Number,

    initOpt: {
      type: Array,
      default: () => []
    },

    spreadAll: {
      type: Boolean,
      default: false
    },

    one: {
      type: Boolean,
      default: false
    },

    type: {
      type: String,
      default: 'horizontal'
    }
  },

  data() {
    return {
      // 折叠板的有效 slot 信息
      foldChildren: [],
      // 当前展开的面板
      currentIndex: 1,
      // 折叠版数据
      foldData: []
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-fold`
    }
  },

  watch: {
    initIndex(val) {
      this.currentIndex = val
    },

    spreadAll() {
      this._initFold()
    }
  },

  methods: {
    _initFold() {
      this.foldChildren.forEach((item, index) => {
        if (this.one) {
          if (this.initIndex) {
            this.foldData[index] = {
              folding: index !== this.initIndex - 1
            }
          } else {
            this.foldData[index] = {
              folding: true
            }
          }
        } else {
          if (this.spreadAll) {
            this.foldData[index] = {
              folding: false
            }
          } else if (this.initIndex) {
            this.foldData[index] = {
              folding: index !== this.initIndex - 1
            }
          } else {
            this.foldData[index] = {
              folding: true
            }
          }
        }
      })
    },

    clickTitle(evt) {
      evt.stopPropagation()

      let currentIndex = Number(evt.currentTarget.dataset.index) - 1
      let currentData = this.foldData[currentIndex]
      let folding = currentData.folding

      if (!currentData) {
        return false
      }

      Vue.set(this.foldData, currentIndex, Object.assign(currentData, {
        folding: !folding
      }))
    },

    foldingStatus(currentIndex) {
      let currentData = this.foldData[currentIndex - 1]

      return currentData && currentData.folding
    },

    foldTitleIcon(contentIndex) {
      return this.foldingStatus(contentIndex) ? 'fold' : 'spread'
    },

    foldContentActive(contentIndex) {
      return this.foldingStatus(contentIndex) ? `${this.cPrefix}-folding` : ''
    }
  },

  created() {
    this.$slotKey.forEach((item, index) => {
      if (item === 'default') {
        return false
      }

      let contentIndex = Number(item.split('-')[1]) - 1

      if (this.foldChildren[contentIndex] === undefined) {
        this.foldChildren[contentIndex] = {}
      }

      if (/content-/.test(item)) {
        this.foldChildren[contentIndex].content = this.$slots[item]
      } else if (/title-/.test(item)) {
        this.foldChildren[contentIndex].title = this.$slots[item]
      }
    })

    this._initFold()
  }
}

export {
  foldComp,
  foldTitleComp,
  foldContentComp
}

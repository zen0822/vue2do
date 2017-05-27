/**
 * fold 组件
 *
 * @prop initOpt - 折叠版的初始化数据
 * @prop initIndex - 当前展开的折叠板
 * @prop spread-all - 展开全部
 * @prop only - 开启一次只能展开一个面板功能
 * @prop type - 布局类型
 *
 */

import Vue from 'vue'
import './fold.scss'
import render from './fold.render.js'
import baseMixin from '../../../mixin/base'
import iconComp from '../../base/icon/icon'
import foldTransition from '../../transition/fold'

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

    only: {
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
      // 前一个打开的面板
      preIndex: 1,
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
    },

    only(val) {
      this._initFold()
    }
  },

  methods: {
    _initFold() {
      let foldChildren = []
      let foldData = []

      this.$slotKey.forEach((item, index) => {
        if (item === 'default') {
          return false
        }

        let contentIndex = Number(item.split('-')[1]) - 1

        if (foldChildren[contentIndex] === undefined) {
          foldChildren[contentIndex] = {}
        }

        if (/content-/.test(item)) {
          foldChildren[contentIndex].content = this.$slots[item]
        } else if (/title-/.test(item)) {
          foldChildren[contentIndex].title = this.$slots[item]
        }
      })


      foldChildren.forEach((item, index) => {
        if (this.only) {
          if (this.initIndex) {
            foldData[index] = {
              folding: index !== this.initIndex - 1
            }
          } else {
            foldData[index] = {
              folding: true
            }
          }
        } else {
          if (this.spreadAll) {
            foldData[index] = {
              folding: false
            }
          } else if (this.initIndex) {
            foldData[index] = {
              folding: index !== this.initIndex - 1
            }
          } else {
            foldData[index] = {
              folding: true
            }
          }
        }
      })

      this.foldChildren = foldChildren
      this.foldData = foldData
    },

    clickTitle(evt) {
      evt.stopPropagation()

      let currentIndex = Number(evt.currentTarget.getAttribute('data-index'))
      let currentData = this.foldData[currentIndex - 1]
      let folding = currentData.folding

      if (this.currentIndex !== currentIndex) {
        this.preIndex = this.currentIndex
        this.currentIndex = currentIndex
      }

      if (!currentData) {
        return false
      }

      if (this.only) {
        Vue.set(this.foldData, this.preIndex - 1, Object.assign(this.foldData[this.preIndex - 1], {
          folding: true
        }))
      }

      Vue.set(this.foldData, currentIndex - 1, Object.assign(currentData, {
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
    this._initFold()
  }
}

export {
  foldComp,
  foldTitleComp,
  foldContentComp
}

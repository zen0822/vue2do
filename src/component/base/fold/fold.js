/**
 * fold 组件
 *
 * @props initOpt - 折叠版的初始化数据
 * @props initIndex - 但钱展开的折叠板
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
    icon: iconComp
  },

  props: {
    initIndex: Number,

    initOpt: Array,

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
    }
  },

  methods: {
    clickTitle(evt) {
      let currentIndex = Number(evt.currentTarget.getAttribute('data-index')) - 1

      if (!this.foldData[currentIndex]) {
        return false
      }

      Vue.set(this.foldData, currentIndex, Object.assign(this.foldData[currentIndex], {
        folding: false
      }))
    },

    foldTitleIcon(contentIndex) {
      let currentIndex = contentIndex - 1

      if (this.foldData[currentIndex]) {
        return 'fold'
      }

      return this.foldData[currentIndex].folding ? 'fold' : 'spread'
    }
  },

  created() {
    this.$slotKey.forEach((item, index) => {
      if (item === 'default' || !/content-/.test(item)) {
        return false
      }

      let contentIndex = Number(item.split('-')[1]) - 1

      if (this.spreadAll) {
        this.foldData[contentIndex] = {
          folding: true
        }
      } else if (this.initIndex) {
        this.foldData[contentIndex] = {
          folding: index === this.initIndex - 1
        }
      } else {
        this.foldData[contentIndex] = {
          folding: true
        }
      }
    })
  }
}

export {
  foldComp,
  foldTitleComp,
  foldContentComp
}

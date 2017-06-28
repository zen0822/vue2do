/**
 * tab 组件
 *
 * @prop initOpt - tab 的初始选项
 * @prop initVal - 初始化 tab 的当前 value 值
 * @prop query - 开启根据网址的 search 参数来选择选项卡
 *
 * @event click - 点击 tab
 */

import './tab.scss'
import baseMixin from '../../../mixin/base'
import render from './tab.render.js'
import shiftComp from '../../base/shift/shift'
import { search as urlSearch } from '../../../util/url'

export default {
  name: 'tab',

  mixins: [baseMixin],

  render,

  components: {
    shift: shiftComp
  },

  props: {
    initOpt: {
      type: Array,
      default: () => []
    },
    initVal: [Number, String],
    query: {
      type: Boolean,
      default: false
    }
  },

  data: function () {
    return {
      value: {},
      option: [],
      currentIndex: 0
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-tab`
    }
  },

  watch: {
    initVal(val) {
      this.value = val

      let currentIndex = this.queryIndexByValue(val)
      this.switch(currentIndex)
    },
    currentIndex(val) {
      return this.$refs.shift.switch(val)
    }
  },

  methods: {
    _setDataOpt() {
      this.value = this.initVal
      this.option = this.initOpt

      let urlHash = window.location.hash
      this.urlSearchOpt = urlSearch(urlHash.slice(urlHash.indexOf('?')))
    },

    _init() {
      let hasOption = this._initOptionSlot({
        slotRef: this.$refs.optionSlot,
        compClass: `${this.compPrefix}-tab-ele`
      })

      if (hasOption) {
        this.option = hasOption
      }

      if (this.query) {
        this.currentIndex = this.queryIndexByValue(this.urlSearchOpt.tab, true)
      }
    },

    /**
     * 根据 value 查找对应的 index
     *
     * @param {String, Number} val
     * @param {Boolean} weak - 是否是弱对比
     */
    queryIndexByValue(val, weak = false) {
      let currentIndex = 0

      this.option.every((item, index) => {
        if ((weak && item.value == val) || (!weak && item.value === val)) {
          currentIndex = index + 1

          return false
        }

        return true
      })

      return currentIndex
    },

    /**
     * 点击tab触发的事件
     *
     * @param { Number } - 点击tab按钮
     * @return { Object }
     */
    tab(evt) {
      let currentIndex = parseInt(evt.currentTarget.getAttribute('data-index'), 10)

      this.currentIndex = currentIndex

      this.$emit('click')
    }
  }
}

/**
 * tab 组件
 *
 * @props initOpt - tab 的初始选项
 * @props initVal - 初始化 tab 的当前 value 值
 *
 * @events click - 点击 tab
 */

import './tab.scss'
import baseMixin from '../../../mixin/base'
import render from './tab.render.js'
import shiftComp from '../../base/shift/shift'

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
    initVal: [Number, String]
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
    }
  },

  methods: {
    _setDataOpt() {
      this.value = this.initVal
      this.option = this.initOpt
    },

    _init() {
      let hasOption = this._initOptionSlot({
        slotRef: this.$refs.optionSlot,
        compClass: `${this.compPrefix}-tab-ele`
      })

      if (hasOption) {
        this.option = hasOption
      }
    },

    /**
     * 根据 value 查找对应的 index
     */
    queryIndexByValue(val) {
      let currentIndex = 0

      this.option.every((item, index) => {
        if (item.value === val) {
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
      let currentIndex = evt.currentTarget.getAttribute('data-index')
      this.currentIndex = currentIndex
      this.$refs.shift.switch(currentIndex)

      this.$emit('click')
    }
  }
}

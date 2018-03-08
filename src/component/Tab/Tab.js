/**
 * tab 组件
 *
 * @prop initOpt - tab 的初始选项
 * @prop initVal - 初始化 tab 的当前 value 值
 * @prop query - 开启根据网址的 search 参数来选择选项卡
 *
 * @event click - 点击 tab
 *
 * @slotScope - tab 内容
 */

import './Tab.scss'
import './Tab.material.scss'
import './Tab.bootstrap.scss'

import Shift from '../Shift/Shift'
import Scroller from '../Scroller/Scroller'
import Btn from '../Btn/Btn'

import baseMixin from '../../mixin/base'
import render from './Tab.render.js'
import {
  search as urlSearch
} from '../../util/url'

export default {
  name: 'Tab',

  mixins: [baseMixin],

  render,

  components: {
    shift: Shift,
    scroller: Scroller,
    btn: Btn
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
      tabEleWidth: 0, // 选项卡下的棍棒的宽度
      value: {},
      option: [],
      currentIndex: 0,
      refTabEle: null // 选项卡的元素
    }
  },

  computed: {
    cPrefix() { // 组件类名的前缀
      return `${this.compPrefix}-tab`
    },
    shiftJustify() { // shift 组件的 justify 属性
      return (this.deviceSize === 's' || this.deviceSize === 'xs') ? 'justify' : 'start'
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
    },
    option() {
      this.$nextTick(() => {
        this.tabEleWidth = this.refTabEle.offsetWidth
      })
    }
  },

  methods: {
    _binder() {
      this.$refs.scroller.$on('change', () => {
        this.tabEleWidth = this.refTabEle.offsetWidth
      })
    },

    _setDataOpt() {
      this.value = this.initVal
      this.option = this.initOpt

      let urlHash = window.location.hash
      this.urlSearchOpt = urlSearch(urlHash.slice(urlHash.indexOf('?')))
    },

    _initComp() {
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
        if ((weak && Number(item.value) === Number(val)) || (!weak && item.value === val)) {
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
     * @return { Object }
     */
    tab(evt, index) {
      this.currentIndex = index

      this.$emit('click', {
        emitter: this,
        value: this.value,
        text: this.initOpt[index - 1].text
      })
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.refTabEle = this.$refs.shift.$el.getElementsByClassName('z-tab-active')[0]
      this.tabEleWidth = this.refTabEle.offsetWidth
    })
  }
}

/**
 * shift - 切换组件（轮播之类的）
 *
 * @prop index - 显示当前第几个
 * @prop type - 切换模式 （可供选择的模式），不传默认是显示\隐藏的切换模式
 * @prop before - 切换前的 class 名字
 * @prop after - 切换后的 class 名字
 *
 */

import './Shift.scss'
import render from './Shift.render.js'
import baseMixin from '../../mixin/base'
import Row from '../Row/Row'
import Col from '../Col/Col'

// 可供选择的切换模式
const SHIFT_TYPE = ['display', 'move', 'opacity']

export default {
  name: 'Shift',

  render,

  mixins: [baseMixin],

  components: {
    row: Row,
    column: Col
  },

  props: {
    after: String,
    before: String,
    index: {
      type: Number,
      default: 1
    },
    justify: {
      type: String,
      default: 'justify'
    },
    type: {
      type: String,
      default: 'display',
      validator(val) {
        return SHIFT_TYPE.includes(val)
      }
    }
  },

  data() {
    return {
      // 当前 shift 的索引值
      currentIndex: 0,
      // 组件 $slot 的 key 值
      shiftSlotKey: 0,
      // 组件 $slot 的 key 值的长度
      shiftNum: 0
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-shift`
    },
    // 切换前的 class
    beforeClass() {
      if (this.before) {
        return this.before
      } else if (this.after) {
        return ''
      } else {
        return `${this.cPrefix}-before-${this.type}`
      }
    },
    // 切换后的 class
    afterClass() {
      if (this.after) {
        return this.after
      } else if (this.before) {
        return ''
      } else {
        return `${this.cPrefix}-after-${this.type}`
      }
    }
  },

  watch: {
    index(val) {
      this.currentIndex = val
    }
  },

  methods: {
    _setDataOpt() {
      this.currentIndex = this.index

      this.$slotKey.forEach((item) => {
        if (item !== 'default') {
          this.shiftNum++
        }
      })
    },

    /**
     * 切换到指定的 index
     *
     * @return {Object}
     */
    switch(index) {
      this.currentIndex = index
    },

    /**
     * 切换下一个
     *
     * @return {Object}
     */
    next() {
      this.currentIndex + 1 <= this.shiftNum && this.currentIndex++

      return this
    },

    /**
     * 切换上一个
     *
     * @return {Object}
     */
    pre() {
      this.currentIndex - 1 > 0 && this.currentIndex--

      return this
    },

    /**
     * 轮流切换
     *
     * @return {Object}
     */
    rotate() {
      if (this.currentIndex + 1 > this.shiftNum) {
        this.currentIndex = 1
      } else {
        this.currentIndex++
      }

      return this
    }
  }
}

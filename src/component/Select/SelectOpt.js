/**
 * select-option -- 作为 select 的 option 的局部组件
 *
 * @prop multiple - 是否为多选
 * @prop option - 下拉框option数据
 * @prop optRoot - 递归调用的父元素
 * @prop valName - 下拉框 options 的 value 值的 key name
 * @prop txtName - 下拉框 options 的 text 值的 key name
 *
 * @event change - checkbox的option值改变
 * @event changeScroller - 滚动区域的高度/宽度变化
 */

import './SelectOpt.scss'
import Vue from 'vue'
import render from './SelectOpt.render'
import compEvent from '../../config/event.json'

import iconComp from '../Icon/Icon'
import checkComp from '../Check/Check'
import listComp from '../List/List'
import rowComp from '../Row/Row'
import colComp from '../Col/Col'

import MotionRip from '../MotionRip/MotionRip'
import baseMixin from '../../mixin/base'

export default {
  name: 'SelectOpt',

  render,

  mixins: [baseMixin],

  components: {
    icon: iconComp,
    check: checkComp,
    list: listComp,
    row: rowComp,
    column: colComp,
    'motion-rip': MotionRip
  },

  props: {
    option: {
      type: Array,
      default: () => []
    },

    multiple: {
      type: Boolean,
      default: false
    },

    optRoot: {
      type: Object,
      default: () => {
        return {}
      }
    },

    valName: {
      type: String,
      default: 'value'
    },

    txtName: {
      type: String,
      default: 'text'
    }
  },

  data() {
    return {
      selectedAllCheckOpt: [{ // 多选的 check 的 option
        value: -1,
        text: ''
      }],
      focusIndex: 0, // 方向键选择 option 值的当前游标
      pressing: false,
      optionEleH: 0 // 选项值的高度
    }
  },

  computed: {
    cPrefix() { // 组件类名的前缀
      return `${this.compPrefix}-select-opt`
    },
    optionLength() {
      return this.option.length
    }
  },

  methods: {
    _binder() {
      this.$refs.list.$on('change', () => {
        this.$emit('changeScroller', {
          emitter: this
        })
      })
    },

    /**
     * 父组件的 keydown 事件触发调用该函数
     */
    keydown(direction) {
      this.optionEleH = this.$refs.option1.offsetHeight

      switch (direction) {
        case 'up':
          this.focusIndex = this.focusIndex === 0 ? 0 : this.focusIndex - 1
          this.$refs.list.scrollTop(this.optionEleH * (this.focusIndex))

          break
        case 'down':
          this.focusIndex = this.focusIndex === this.optionLength - 1 ? this.optionLength - 1 : this.focusIndex + 1
          this.$refs.list.scrollTop(this.optionEleH * (this.focusIndex))

          break
        case 'left':
          break
        case 'right':
          break
        default:
          break
      }
    },

    // 组件的 li 的 class 名字
    liClass(classify, value) {
      return [
        `${this.cPrefix}-li`,
        this.optRoot.defaultValClassName(value),
        {
          [`${this.cPrefix}-classify-title`]: classify
        }
      ]
    },

    /**
     * @param {Object} 是否有子下拉框值
     * @return {Boolean}
     */
    hasSubOption(item) {
      return Array.isArray(item.sub) && item.sub.length > 0
    },

    /**
     * @param {Object} 子下拉框值
     * @return {Function}
     */
    selectOption(evt, index) {
      evt.stopPropagation()

      let option = this.option[parseInt(index - 1, 10)]

      if (option.classify) {
        return false
      }

      this.$refs[`rip${index}`].enter()
      this.$emit('change', {
        emitter: this,
        value: option[this.valName],
        text: option[this.txtName],
        index: index
      })
    },

    /**
     * 初始化列表的分页组件位置
     */
    initPagePosition() {
      return this.$refs.list.initPagePosition()
    },

    /**
     * 初始化分页组件的显示状态
     */
    initPageDisplay() {
      return this.$refs.list.initPageDisplay()
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.optionEleH = this.$refs.option1.offsetHeight
    })
  }
}

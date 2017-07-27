/**
 * menu-option -- 作为 menu 的 option 的局部组件
 *
 * @prop option - 下拉框option数据
 * @prop multiple - 是否为多选
 * @prop optRoot - 递归调用的父元素
 * @prop valName - 下拉框 options 的 value 值的 key name
 * @prop txtName - 下拉框 options 的 text 值的 key name
 *
 * @event change - checkbox的option值改变
 * @event changeScroller - 滚动区域的高度/宽度变化
 */

import './menu-opt.scss'
import Vue from 'vue'
import render from './menu-opt.render'
import compEvent from '../../../config/event.json'

import iconComp from '../../base/icon/icon'
import checkComp from '../../base/check/check'
import listComp from '../../common/list/list'
import rowComp from '../../common/layout/row/row'
import colComp from '../../common/layout/col/col'

import ripTransition from '../../transition/rip'
import baseMixin from '../../../mixin/base'


const menuOptionComp = {
  name: 'menu-opt',

  render,

  mixins: [baseMixin],

  components: {
    icon: iconComp,
    check: checkComp,
    list: listComp,
    row: rowComp,
    column: colComp,
    'rip-transition': ripTransition
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
      // 多选的 check 的 option
      selectedAllCheckOpt: [{
        value: -1,
        text: ''
      }],
      pressing: false
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-menu-opt`
    }
  },

  methods: {
    _binder() {
      this.$refs.list.$on('changeScroller', () => {
        this.$emit('changeScroller', {
          emitter: this
        })
      })
    },

    // 组件的 li 的 class 名字
    liClass(classify, value) {
      return [
        `${this.cPrefix}-li`,
        this.optRoot.defaultValClassName(value),
        { [`${this.cPrefix}-classify-title`]: classify }
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
    menuOption(evt) {
      evt.stopPropagation()

      let index = evt.currentTarget.getAttribute(this.xclass('data-index'))
      let option = this.option[parseInt(index - 1, 10)]

      if (option.classify) {
        return false
      }

      this.$emit('change', {
        emitter: this,
        value: option[this.valName],
        text: option[this.txtName],
        index: index
      })
    }
  }
}

export default menuOptionComp

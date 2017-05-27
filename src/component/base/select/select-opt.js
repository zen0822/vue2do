/**
 * select-option -- 作为 select 的 option 的局部组件
 *
 * @prop option - 下拉框option数据
 * @prop multiple - 是否是多选
 * @prop optRoot - 递归调用的父元素
 * @prop valName - 下拉框 options 的 value 值的 key name
 * @prop txtName - 下拉框 options 的 text 值的 key name
 *
 * @event change - checkbox的option值改变
 *
 */

import './select-opt.scss'
import Vue from 'vue'
import template from './select-opt.tpl'
import compEvent from '../../../config/event.json'

import iconComp from '../../base/icon/icon'
import checkComp from '../../base/check/check'
import listComp from '../../common/list/list'
import baseMixin from '../../../mixin/base'


const selectOptionComp = {
  name: 'select-opt',

  template,

  mixins: [baseMixin],

  components: {
    icon: iconComp,
    check: checkComp,
    list: listComp
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
      }]
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-select-opt`
    }
  },

  methods: {
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
    selectOption(item, index) {
      if (item.classify) {
        return false
      }

      this.$emit(compEvent.select.option.change, {
        emitter: this,
        value: item[this.valName],
        text: item[this.txtName],
        index: index
      })
    }
  }
}

export default selectOptionComp

/**
 * drop-menu-input 组件
 *
 * @props theme - 主题 可选（primary，default）
 * @props dropMenuItems - 菜单数据 [{value:1, text:'显示'}]
 * @props dropMenuVal - 下拉菜单的值
 * @props inputVal - 输入框的值
 * @props inputQueryName - 搜索输入框参数名
 * @props menuQueryName - 下拉框参数名
 * @props placeholder - 搜索框的placeholder
 * @props inputReadOnly - 输入框设为只读
 * @props inputEmpty - 输入框可以为空
 * @props inputErrorMessage - 输入框错误时的提示文字
 *
 */

const Vue = require('vue');

require('components/lib/core');
require('components/base/input-box/input-box');
require('components/base/drop-menu/drop-menu');

require('./drop-menu-input.scss');
const template = require('./drop-menu-input.tpl');

const baseMixin = require('components/mixin/base');

const dropMenuInput = {
	template,

  mixins: [baseMixin],

  props: {
  	theme: {
      type: String,
      default: "primary"
    },

    inputVal: [String, Number],

    dropMenuVal: [String, Number],

    dropMenuItems: {
    	type: Array,
    	require: true
    },

    placeholder: {
    	type: String,
      default: ""
    },

    menuQueryName: {
    	type: String,
    	default: ""
    },

    inputQueryName: {
    	type: String,
    	default: ""
    },

    inputReadOnly: {
      type: Boolean,
      default: false
    },

    inputEmpty: {
      type: Boolean,
      default: true
    },

    inputErrorMessage: String
  },

  methods: {
  	val() {
  		return this.value
  	}
  }
}

module.exports = Vue.component('drop-menu-input', dropMenuInput);;
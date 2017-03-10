/**
 * search-menu-input 组件
 *
 * @props theme - 主题 可选（primary，default）
 * @props menuData - 菜单数据 [{value:1, text:'显示'}]
 * @props queryName - 搜索参数名
 * @props placeholder - 搜索框的placeholder
 *
 */

const Vue = require('vue');

require('components/lib/core');
require('components/base/input-box/input-box');

const {
  dropMenu: dropMenuEvent,
  inputBox: inputBoxEvent,
  common: commonEvent } = require('components/config/event.json');

require('./search-menu-input.scss');
const template = require('./search-menu-input.tpl');

const baseMixin = require('components/mixin/base');

const SearchMenuInput = {
	template,

  mixins: [baseMixin],

  props: {
  	theme: {
      type: String,
      default: "primary"
    },

    menuData: {
    	type: Array,
    	require: true
    },

    placeholder: {
    	type: String,
      default: ""
    },

    queryName: {
    	type: String,
    	default: ""
    }

  },

  methods: {
  	getVal() {
  		return {
  			key: this.$refs.sourcemenukey.val(),
  			value: this.$refs.sourcemenuval.val()
  		};
  	}
  }

}

module.exports = Vue.component('search-menu-input', SearchMenuInput);;
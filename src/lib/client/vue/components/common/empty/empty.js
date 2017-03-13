/**
 * empty 数据为空提示消息组件
 *
 * @param msg 消息内容
 * @param theme 主题
 */


const Vue = require('vue');
const template = require('./empty.tpl');
require('./empty.scss');

const Empty = {
	name: "empty",
	template,
	props: {
		theme: {
			type: String,
			default: "primary"
		},
		msg: {
			type: String,
			default: "暂无数据"
		}
	},

	data() {
		return {
			themeClass: this.theme ? `theme-${this.theme}` : ''
		}
	}
}

module.exports = Vue.component('empty', Empty);
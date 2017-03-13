/**
 * scroller 组件 滚动条
 *
 * @props theme - 主题
 * @props maxHeight - 滚动内容最大高度
 *
 * @events scroll - 滚动条事件
 */

const Vue = require('vue');

const baseMixin = require('components/mixin/base');
const { scroller: scrollerEvent } = require('components/config/event.json');

const template = require('./scroller.tpl');
require('./scroller.scss');

const Scroller = {
  name: "Scroller",

  mixins: [baseMixin],

  template,

  data() {
    return {
      barHeight: 0,
      boxHeight: 0
    }
  },

  props: {
    theme: {
      type: String,
      default: 'primary'
    },

    maxHeight: {
      type: Number,
      default: 150
    }
  },

  methods: {
    _init(){
      this.boxHeight = $(this.$els.scrollerBox).outerHeight() === 0 ? 150 : $(this.$els.scrollerBox).outerHeight() === 0;
      //console.log($(this.$els.scrollerBox), this.boxHeight)
      //debugger
    }
  }
}

module.exports = Vue.component('scroller', Scroller);
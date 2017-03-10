/**
 * icon 组件
 *
 * @props theme - 主题
 * @props size - 大小
 * @props type - 字符图标类型
 * @props name - 图标的名字（ex：fa-circle -> name="circle")
 *
 */

const Vue = require('vue');

require('./icon.scss');
const template = require('./icon.tpl');

const baseMixin = require('components/mixin/base');

const SIZE_S = "S";
const SIZE_M = "M";
const SIZE_L = "L";

const TYPE_FA = "fa";

const Icon = {
  template,

  mixins: [baseMixin],

  props: {
    theme: {
      type: String,
      default: "primary"
    },

    size: {
      type: String,
      default: SIZE_S
    },

    type: {
      type: String,
      default: TYPE_FA
    },

    name: {
      type: String,
      require: true
    }
  },

  computed: {
    sizeClass() {
      return this.size.toLowerCase();
    },
    typeClass() {
      return this.type;
    },
    nameClass() {
      return `fa-${this.name}`;
    }
  }
}

module.exports = Vue.component('icon', Icon);
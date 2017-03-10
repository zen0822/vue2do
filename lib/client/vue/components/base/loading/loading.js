/**
 * loading 组件
 * 使用自定义的loading 需要将父元素设置成 position: relative;
 *
 * @props theme - 主题
 * @props type - 类型
 * @props bgDisplay - 是否显示 loading 的背景
 * @props loadingText - 等待文字
 *
 */

const Vue = require('vue');

require('components/base/icon/icon');

const baseMixin = require('components/mixin/base');

const template = require('./loading.tpl');
require('./loading.scss');

const TYPE_ROTATE = 'rotate';
const TYPE_ROTATE_2 = 'rotate2';
const TYPE_SPOT = 'spot';

const Loading = {
  name: "Loading",

  mixins: [baseMixin],

  template,

  data() {
    return {
      dispaly: false
    }
  },

  props: {
    theme: {
      type: String,
      default: "primary"
    },

    type: {
      type: String,
      default: TYPE_ROTATE
    },

    bgDisplay: {
      type: Boolean,
      default: true
    },

    loadingText: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      dispaly: false,
      themeClass: `theme-${this.theme}`
    }
  },

  methods: {
    /**
     * 显示
     * @return {Object} this - 组件
     */
    show(cb) {
      this.dispaly = true;
      //this.createTimeout(cb);

      return this;
    },

    /**
     * 隐藏
     * @return {Object} this - 组件
     */
    hide() {
      this.dispaly = false;
      //this.clearTimeout();

      return this;
    },

    createTimeout(cb) {
      this.clearTimeout();

      this.timeout = setTimeout(() => {
        this.timeout = null;
        this.hide();

        return cb && cb();
      }, this.time);
    },

    clearTimeout() {
      let timeout = this.timeout;
      if(timeout) {
        window.clearTimeout(timeout);
        this.timeout = null;
      }
    }
  },

  computed: {
    isRotate() {
      return this.type === TYPE_ROTATE;
    },

    isRotate2() {
      return this.type === TYPE_ROTATE_2;
    },

    isSpot() {
      return this.type === TYPE_SPOT;
    }
  }
}

module.exports = Vue.component('loading', Loading);

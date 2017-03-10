/**
 * bubble 组件
 *
 * @props theme - 主题
 * @props poptype - 弹窗类型
 * @props headername - 弹窗头部名字
 * @props message - alert信息
 * @props bubbleDisplay - 是否立即显示bubble
 *
 * @slot body - confirm弹窗的主体内容
 *
 */
const Vue = require('vue');

const baseMixin = require('components/mixin/base');
const { bubble: bubbleHub } = require('components/config/componentHub.json');

require('components/base/icon/icon')

require('./bubble.scss');
var template = require('./bubble.tpl');

const DISPLAY_INTERVAL = 800;
const ARROW_HEIGHT = 20;

var Bubble = Vue.extend({
  name: "Bubble",

  template,

  mixins: [baseMixin],

  props: {
    theme: {
      type: String,
      default: "primary"
    },
    message: {
      type: String,
      default: ""
    },

    bubbleDisplay: {
      type: Boolean,
      default: false
    }
  },

  data: () => {
    return {
      popDisplay: false,
      mouseOnBubble: false,
      bubbleDisplayCounter: {}
    }
  },

  methods: {
    /**
     * 初始化bubble位置
     * @return {Object} - 组件本身
     */
    _initPosition(target) {
      var $target = $(target);
      var position = $target.offset();
      var width = $target.innerWidth();
      var height = $target.innerHeight();

      var $el = $(this.$el);
      var bubbleWidth = $el.innerWidth();
      var bubbleHeight = $el.innerHeight();

      $el.css({
        top: position.top + height + ARROW_HEIGHT/2,
        left: position.left - bubbleWidth / 2 + width / 2
      });

      return this;
    },

    /**
     * 显示bubble
     * @return {Functio} - 初始化bubble位置
     */
    show(target) {
      clearTimeout(this.bubbleDisplayCounter);
      this.bubbleDisplay = true;

      return this._initPosition(target);
    },

    /**
     * 隐藏bubble
     * @return {Object} - 组件本身
     */
    hide() {
      clearTimeout(this.bubbleDisplayCounter);
      this.setTimeoutBubbleDisplay();

      return this;
    },

    /**
     * 获取bubble的信息
     * @return {Object, String}
     **/
    info(text) {
      if (text) {
        this.message = text;
        return this;
      }
      return this.message;
    },

    /**
     * 鼠标在bubble上面触发的函数
     **/
    mouseOver() {
      this.mouseOnBubble = true;
      clearTimeout(this.bubbleDisplayCounter);
    },

    /**
     * 鼠标离开bubble触发的函数
     **/
    mouseLeave() {
      this.mouseOnBubble = false;
      this.setTimeoutBubbleDisplay();
    },

    /**
     * 设置bubble显示的定时器
     **/
    setTimeoutBubbleDisplay() {
      this.bubbleDisplayCounter = setTimeout(() => {
        this.bubbleDisplay = false;
      }, DISPLAY_INTERVAL);
    }
  },

  ready() {
    COMMON.componentHub[bubbleHub].push(this);
  }
});

module.exports = Vue.component('bubble', Bubble);
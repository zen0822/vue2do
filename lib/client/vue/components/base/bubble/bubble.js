/**
 * bubble 组件
 *
 * 注意要用自定义的 bubble 的时候，bubble的所有祖父元素都不能为相对定位
 * 如果bubble有祖父元素有相对定位的，请启用 props 的
 *
 * @props theme - 主题
 * @props poptype - 弹窗类型
 * @props width - bubble最大宽度
 * @props headername - 弹窗头部名字
 * @props message - alert信息
 * @props bubbleDisplay - 是否立即显示bubble
 * @props relative - 是否启用相对位置的 bubble
 * @props hideRightNow - 马上显示和隐藏 bubble，就是纯显示的 bubble 要启用
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
    },

    relative: {
      type: Boolean,
      default: false
    },

    hideRightNow: {
      type: Boolean,
      default: false
    },

    width: {
      type: Number,
      default: 0
    }
  },

  data: () => {
    return {
      popDisplay: false,
      mouseOnBubble: false,
      bubbleDisplayCounter: {},
      displayInterval: 800
    }
  },

  methods: {
    _init() {
      if (this.hideRightNow) {
        this.displayInterval = 0;
      }
    },
    /**
     * 初始化bubble位置
     * @return {Object} - 组件本身
     */
    _initPosition(target) {
      var $target = $(target);
      var position = this.relative ? $target.position() : $target.offset();

      var width = $target.outerWidth();
      var height = $target.outerHeight();

      var $el = $(this.$el);
      var bubbleWidth = $el.outerWidth();
      var bubbleHeight = $el.outerHeight();

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

      this.$nextTick(() => {
        this._initPosition(target);
      });

      return this;
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
      if (typeof text !== undefined) {
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
      }, this.displayInterval);
    }
  },

  ready() {
    COMMON.componentHub[bubbleHub].push(this);
  }
});

module.exports = Vue.component('bubble', Bubble);
/**
 * pop 组件
 *
 * @props theme - 主题
 * @props type - 弹窗类型
 * @props headername - 弹窗头部名字
 * @props message - alert信息
 * @props okbtnname - 确定按钮名字
 * @props nobtnname - 取消按钮名字
 * @props okcb - 确定按钮回调函数
 * @props nocb - 取消按钮回调函数
 * @props noBtnDisplay - 取消按钮是否显示
 * @props headerNoBtnDisplay - 弹窗头部X是否显示
 * @props headerDisplay - 是否显示弹窗头部
 * @props footerDisplay - 是否显示弹窗底部
 *
 * @slot body - confirm弹窗的主体内容
 *
 */
const Vue = require('vue');
require('components/base/btn/btn')

const TYPE_ALERT = 'alert';
const TYPE_CONFIRM = 'confirm';
const TYPE_TIP = 'tip';

const baseMixin = require('components/mixin/base');

var tipShowTime = 1500;

require('./pop.scss');
require('./m.pop.scss');
var template = require('./pop.tpl');

var Pop = Vue.extend({
  name: "Pop",

  template,

  mixins: [baseMixin],

  props: {
    theme: {
      type: String,
      default: "primary"
    },
    type: {
      type: String,
      default: TYPE_CONFIRM
    },
    headername: {
      type: String,
      default: ""
    },
    okbtnname: {
      type: String,
      default: '确定'
    },
    nobtnname: {
      type: String,
      default: '取消'
    },
    message: {
      type: String,
      default: ""
    },
    headerDisplay: {
      type: Boolean,
      default: true
    },
    headerNoBtnDisplay: {
      type: Boolean,
      default: true
    },
    noBtnDisplay: {
      type: Boolean,
      default: true
    },
    footerDisplay: {
      type: Boolean,
      default: true
    },
    okcb: Function,
    nocb: Function
  },

  data: () => {
    return {
      pointStart: {
        x: 0,
        y: 0
      },
      isMousedown: false,
      popDisplay: false
    }
  },

  methods: {
    /**
     * 显示pop
     *
     * @param {Number} - 当前页码
     * @return {Object}
     */
    show() {
      if (this.isTip) {
        this.popDisplay = true;
        setTimeout(() => {
          this.popDisplay = false;

          if (this.okcb) {
            this.okcb.call(null, this);

            return this;
          }
        }, tipShowTime);
      } else {
        this.popDisplay = true;
      }
      return this;
    },

    /**
     * 隐藏pop
     *
     * @return {Object}
     */
    hide() {
      if (this.isTip) {
        return this;
      }
      this.popDisplay = false;
      this.isMousedown = false;
      return this;
    },

    /**
     * 鼠标mouseDown 弹窗头部触发的事件
     *
     * @return {Object}
     */
    mouseDown(event) {
      this.isMousedown = true;
      this.pointStart = {
        x: event.clientX,
        y: event.clientY
      };

      return this;
    },

    /**
     * 鼠标mouseMove 弹窗头部触发的事件
     *
     * @return {Object, Boolean}
     */
    mouseMove(event) {
      var $this = $(this.$el).find(".pop");
      if (!this.isMousedown) {
        return false;
      }
      var top = parseInt($this.css('top'), 10);
      var left = parseInt($this.css('left'), 10);

      $this.css({
        'top': top + event.clientY - this.pointStart.y,
        'left': left + event.clientX - this.pointStart.x
      });
      this.pointStart = {
        x: event.clientX,
        y: event.clientY
      };

      return this;
    },

    /**
     * 鼠标mouseUp 弹窗头部触发的事件
     *
     * @return {Object, Boolean}
     */
    mouseUp() {
      if (!this.isMousedown) {
        return false;
      }
      this.isMousedown = false;

      return this;
    },

    /**
     * 弹窗点击确定触发的函数
     *
     * @return {Object}
     */
    ok() {
      if (this.okcb) {
        this.okcb.call(null, this);

        return this;
      }

      this.hide()
    },

    /**
     * 弹窗点击取消触发的函数
     *
     * @return {Object}
     */
    cancel() {
      if (this.nocb) {
        this.nocb.call(null, this);

        return this;
      }

      this.hide()
    },

    /**
     * 返回弹窗的title名
     *
     * @return {Object, Boolean}
     */
    title(text) {
      if (text === '' || text) {
        this.headername = text;
        return this;
      }

      return this.headername;
    },

    /**
     * alert, confirm 弹窗的文字信息
     *
     * @param {String} - 需要设置的值
     * @return {Object, String}
     */
    info(text) {
      if (text === '' || text) {
        this.message = text;
        return this;
      }
      return this.message;
    },

    /**
     * alert, confirm 设置弹窗的确定按钮的回调函数
     * 显示完 tip 的回调函数
     *
     * @param {Function}
     * @return {Object}
     */
    setOkCb(cb) {
      if (cb) {
        this.okcb = cb;
      }

      return this;
    },

    /**
     * alert, confirm 设置弹窗的确定按钮的回调函数
     *
     * @param {Function}
     * @return {Object}
     */
    setNoCb(cb) {
      if (cb) {
        this.nocb = cb;
      }

      return this;
    }
  },

  computed: {
    isAlert() {
      return this.type === TYPE_ALERT;
    },
    isTip() {
      return this.type === TYPE_TIP;
    }
  }
});

module.exports = Vue.component('pop', Pop);
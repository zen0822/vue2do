/**
 * switching - 切换组件（轮播之类的）
 *
 * @props theme - 主题
 * @props switchNum - 切换的个数
 * @props currentIndex - 显示当前第几个
 * @props compileVm - 动态编译的vm
 *
 */
const Vue = require('vue');

require('./switching.scss');
var template = require('./switching.tpl');

require('./switching-ele');

var Switching = Vue.extend({
  name: "Switching",

  template,

  props: {
    theme: {
      type: String,
      default: "primary"
    },

    switchNum: {
      type: Number,
      require: true
    },

    compileVm: {
      type: Object,
      default: () => {
        return {}
      }
    },

    currentIndex: {
      type: Number,
      default: 0
    }
  },

  methods: {
    /**
     * 初始化 switching
     *
     * @return {Object}
     */
    _initSwitching() {
      var slotContent = this._slotContents;
      if (!slotContent) {
        return false;
      }

      var slotContentKey = Object.keys(slotContent);
      if (slotContentKey.length === 0) {
        return false;
      }

      if(Object.keys(this.compileVm).length === 0) {
        this.compileVm = this.$parent;
      }

      $(this.$el).find('.switching-container .switching-ele').each((index, el) => {
        var $el = $(el);
        var dom = document.createElement('div');
        var $compiledHtml = $(slotContent[slotContentKey[index]]['childNodes'][0]);

        dom.innerHTML = $compiledHtml[0].outerHTML;
        this.compileVm.$compile(dom);

        var dom1 = document.createElement('div');
        dom1.innerHTML = $(dom).find('.switching-content').html();
        this.compileVm.$compile(dom);

        if (dom.children.length !== 0) {
          for (let i = 0, len = dom.children.length; i < len; i++){
            el.appendChild(dom.children[0]);
          }
        } else {
          el.appendChild(document.createElement('div'));
        }
      });

      return this;
    },

    /**
     * 切换下一个
     *
     * @return {Object}
     */
    next() {
      this.currentIndex + 1 < this.switchNum && this.currentIndex++;
      return this;
    },

    /**
     * 切换上一个
     *
     * @return {Object}
     */
    pre() {
      this.currentIndex - 1 >= 0 && this.currentIndex--;
      return this;
    },

    /**
     * 轮流切换
     *
     * @return {Object}
     */
    rotation() {

    }
  },

  compiled() {
    this._initSwitching();
  }
});

module.exports = Vue.component('switching', Switching);
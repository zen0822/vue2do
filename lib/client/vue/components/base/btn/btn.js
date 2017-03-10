/**
 * btn 组件
 *
 * @props theme - 主题
 * @props kind - 按钮种类
 * @props type - 按钮类型 (input | button | link)
 * @props size - 按钮大小
 * @props value - 按钮名字
 * @props submit - 提交按钮
 * @props flag - 按钮标识
 * @props link - 链接地址
 * @props textDisplay - 是否显示按钮文字
 * @props ban - 禁止点击
 *
 * @events click - 点击btn事件
 */

require('components/base/loading/loading')

const Vue = require('vue');
const store = require('src/common/vuex/store');

const baseMixin = require('components/mixin/base');
const formMixin = require('components/mixin/form');
const { btn: btnEvent } = require('components/config/event.json');
const { btn: btnHub } = require('components/config/componentHub.json');
const { addPageBtn } = require('src/common/vuex/action/common');

const template = require('./btn.tpl');
require('./btn.scss');

const BTN_TYPE_LINK = 'link';
const BTN_TYPE_BUTTON = 'button';
const BTN_TYPE_INPUT = 'input';

const SIZE_S = "S";
const SIZE_M = "M";
const SIZE_L = "L";

const Btn = {
  name: "Btn",

  mixins: [baseMixin, formMixin],

  template,

  props: {
    theme: {
      type: String,
      default: "primary"
    },

    kind: {
      type: String,
      default: "primary"
    },

    type: {
      type: String,
      default: BTN_TYPE_BUTTON
    },

    value: {
      type: String,
      require: true
    },

    size: {
      type: String,
      default: SIZE_S
    },

    submit: {
      type: Boolean,
      require: false
    },

    flag: {
      type: String,
      require: false
    },

    textDisplay: {
      type: Boolean,
      default: false
    },

    link: Object,

    ban: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      show: true,
      btnValueDisplay: false,
    }
  },

  methods: {
    /**
     * 点击按钮
     * @return {Object} this - 组件
     */
    click() {
      this.$dispatch(btnEvent.click, {
        dispatcher: this
      });

      return this;
    },

    /**
     * 将按钮变为只读操作
     */
    setBanState(state) {
      this.ban = state === 'ban' ? true : false
    },

    /**
     * 开启按钮等待功能
     */
    switchBtnLoading(state) {
      if (state === 'show') {
        this.setBanState('ban')
        this.$refs.loading.show()
      } else {
        this.setBanState('allow')
        this.$refs.loading.hide()
      }
    }
  },

  computed: {
    btnClass() {
      if (this.kind === null || typeof this.kind === 'undefined') {
        return false
      }

      return `btn-${this.kind}`;
    },

    sizeClass() {
      return this.size.toLowerCase();
    },

    isLink() {
      return !this.btnValueDisplay && this.type === BTN_TYPE_LINK;
    },

    isButton() {
      return !this.btnValueDisplay && this.type === BTN_TYPE_BUTTON;
    },

    isInput() {
      return !this.btnValueDisplay && this.type === BTN_TYPE_INPUT;
    }
  },

  store,

  vuex: {
    actions: {
      addPageBtn
    }
  },

  ready() {
    COMMON.componentHub[btnHub].push(this);
    this.addPageBtn(this);
  }
}

module.exports = Vue.component('btn', Btn);
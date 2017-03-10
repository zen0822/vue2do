/**
 * list 组件
 *
 * @props theme - 主题 可选（primary，default, fill）
 * @props pageItems - 分页数据
 * @props url - api地址 不为空就启用远程数据
 * @props queryOpt - 查询参数
 * @props success - 成功获取到列表数据后的回调
 * @props processTableData - 处理远程数据的钩子函数
 *
 */

const Vue = require('vue');

require('components/base/pagination/pagination');
require('components/base/loading/loading');
const { ajaxRtn } = require('src/common/utils/utils');
const tip = require('components/base/pop/tip');

require('./list.scss');
const template = require('./list.tpl');

const baseMixin = require('components/mixin/base');

const List = {
  name: "List",

  template,

  mixins: [baseMixin],

  props: {
    theme: {
      type: String,
      default: "primary"
    },

    pageItems: {
      type: Object,
      default: () => {
        return {};
      }
    },

    displayItems: {
      type: Array,
      default: () => []
    },

    url: {
      type: String,
      default: ""
    },

    queryOpt: {
      type: Object,
      default: () => {
        return {};
      }
    },

    success: Function,

    processTableData: Function
  },

  data() {
    return {
      resultData: {}
    }
  },

  methods: {
    /**
     * 获取数据
     */
    fetch() {
      this.$refs.loading.show();

      $.get(this.url, this.queryOpt, (result) => {
        if (result.code === 0) {
          this.resultData = result.data;
          this.processTableData && this.processTableData.call(null, this);
          this._addTableData();
          this.success && this.success();
        }

        this.$refs.loading.hide();
      })
    },

    /**
     * 获取分页数据的参数
     *
     * @param { Object } - 参数选项
     *
     * @return { Object }
     */
    query(opt = {}) {
      this.queryOpt = opt;

      return this;
    }
  },

  events: {
    switchPage(currentPage) {
      if(!this.url){
        var queryOpt = Object.assign(this.queryOpt, {
          _index: currentPage
        });
        this.fetch();

        return false;
      }

      return true;
    }
  },

  ready() {
    if (this.url && this.fetchRightNow) {
      this.fetch();
    }
  }
}

module.exports = Vue.component('list', List);

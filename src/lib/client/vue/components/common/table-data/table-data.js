/**
 * table-data 组件
 *
 * @props theme - 主题 可选（primary，default, fill）
 * @props method - 获取数据方法 post | get
 * @props thItems - 表头组的名称
 * @props trItems - 列表的数据
 * @props pageItems - 分页数据
 * @props displayItems - 需要展示的列表数据
 * @props url - api地址，不为空就启用远程数据
 * @props queryOpt - 查询参数
 * @props fetchRightNow - 马上渲染列表
 * @props compileVm - 表格编译使用的 viewModel
 * @props compileMyVm - 表格编译使用自己的 viewModel
 * @props thLength - HeaderGroup 的 长度
 * @props success - 成功获取到列表数据后的回调
 * @props processTableData - 处理远程数据的钩子函数
 *
 */

const Vue = require('vue');

require('components/base/pagination/pagination');
require('components/base/loading/loading');
const { ajaxRtn } = require('src/common/utils/utils');
const ajaxHttp = require('appUtil/ajaxHttp.js');
const tip = require('components/base/pop/tip');

require('./table-data.scss');
const template = require('./table-data.tpl');

const baseMixin = require('components/mixin/base');

Vue.component('table-row', {
  name: "TableRow",
  template: '<div class="table-row"><slot></slot></div>'
});
Vue.component('table-cell', {
  name: "TableCell",
  template: '<div class="table-cell"><slot></slot></div>'
});
Vue.component('row-group', {
  name: "RowGroup",
  template: '<div class="row-group"><slot></slot></div>'
});
Vue.component('header-group', {
  name: "HeaderGroup",
  template: '<div class="header-group"><slot></slot></div>'
});

const TableData = {
  name: "TableData",

  template,

  mixins: [baseMixin],

  props: {
    theme: {
      type: String,
      default: "primary"
    },

    method: {
      type: String,
      default: "get"
    },

    thItems: {
      type: Array,
      default: () => []
    },

    trItems: {
      type: Array,
      default: () => []
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

    fetchRightNow: {
      type: Boolean,
      default: true
    },

    thLength: {
      type: Number,
      default: 0
    },

    compileVm: Object,

    compileMyVm: {
      type: Boolean,
      default: false
    },

    success: Function,

    processTableData: Function,

    emptyShow: {
      type:Boolean,
      default() {
        return true;
      }
    }
  },

  data() {
    return {
      themeClass: this.theme ? `theme-${this.theme}` : '',
      resultData: {},
      emptyDataText: '暂无数据'
    }
  },

  methods: {
    /**
     * 添加数据到组件
     *
     * @param { Object } - 分页数据
     *
     * @return { Object }
     */
    _addTableData() {
      this.resultData = this.resultData ? this.resultData : [];
      this.trItems = Array.isArray(this.resultData.records) ? this.resultData.records : [];
      this.pageItems = this.resultData;

      return this;
    },

    /**
     * 获取数据
     */
    fetch(cb) {
      this.$refs.loading.show();
      this.emptyDataText = '';

      ajaxHttp(this.url, {
        type: this.method,
        data: this.queryOpt
      }).then((rtn) => {
        this.resultData = rtn.data;
        this.processTableData && this.processTableData.call(null, this);
        this._addTableData();

        this.$refs.loading.hide();
        this.emptyDataText = '暂无数据';

        this.$nextTick(() => {
          this.success && this.success();
        })
      }).catch((rtn) => {
        rtn.message ? tip(rtn.message) : tip(rtn.error);

        cb && cb();
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
    },

    /**
     * 改变url
     *
     * @param { String } - 参数选项
     *
     * @return { Object }
     */
    setUrl(str = '') {
      this.url = str;

      return this;
    },

    /**
     * loading 隐藏
     *
     */
    hideLoading() {
      this.$refs.loading.hide();

      return this;
    },

    /**
     * loading 显示
     *
     */
    showLoading() {
      this.$refs.loading.show();

      return this;
    },

    /**
     * 初始化表格的 tr 和 th
     *
     * @param { String } - 初始化的表格组（tr | th）
     *
     * @return { Object }
     */
    _initTableGroup(type) {
      var slotContent = this._slotContents;
      var $host = this.$el;
      var $tableWrap = $host.querySelector('.js-table-wrap')

      var dom = document.createElement('div');
      dom.setAttribute('class', `${type}-group`);
      dom.innerHTML = slotContent[`${type}Group`]['childNodes'][0].innerHTML;

      if (this.compileMyVm) {
        this.$compile(dom);
      } else {
        this.compileVm.$compile(dom);
      }

      $tableWrap.replaceChild(dom, $host.querySelector(`.js-${type}-group-slot`));
    },

    /**
     * 重置queryOpt
     * @param { Object } - 参数选项
     * @return { Object }
     */
    resetQueryOpt(opt = {}) {
      this.queryOpt = opt;

      return this;
    },
  },

  events: {
    switchPage(currentPage) {

      if (this.url) {
        this.queryOpt = Object.assign(this.queryOpt, {
          _index: currentPage
        });
        this.fetch();

        return false;
      }

      return true;
    }
  },

  created() {
    this.compileVm = this.compileVm || this.$parent;

    this.thLength = this.thItems.length !== 0 ?
      this.thItems.length :
      this.thLength;
  },

  compiled() {
    this.displayItems.length === 0 && this._initTableGroup('row');
    this.thItems.length === 0 && this._initTableGroup('header');
  },

  ready() {
    if (this.url && this.fetchRightNow) {
      this.fetch();
    }
  }
}

module.exports = Vue.component('table-data', TableData);

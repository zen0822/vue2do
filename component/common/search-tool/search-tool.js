/**
 * search-tool 组件
 *
 * @props theme - 主题 可选（primary，default）
 * @props fetchQuery - 获取完搜索条件的回调函数
 * @props queryName - 搜索参数名
 * @props inputDisplay - 隐藏搜索框
 * @props placeholder - 搜索框的placeholder
 * @props autoFetchQuery - 自动获取搜索条件的变化值
 * @props searchBtnDisplay - 搜索按钮的显示状态
 *
 * @slot searcher - 作为搜索条件的下拉框或者输入框
 *
 */

import Vue from 'vue'

require('components/lib/core');
require('components/base/input-box/input-box');
require('components/base/icon/icon');

const {
  dropMenu: dropMenuEvent,
  inputBox: inputBoxEvent,
  dateTime: dateTimeEvent,
  common: commonEvent } = require('components/config/event.json');

const INIT_SEARCH_CONTROL = ['DropMenu', 'InputBox', 'Checkbox', 'DateTime'];

require('./search-tool.scss');
const template = require('./search-tool.tpl');

import baseMixin from 'vue2/mixin/base';

const SearchTool = {
  template,

  mixins: [baseMixin],

  props: {
    theme: {
      type: String,
      default: "primary"
    },

    fetchQuery: Function,

    queryName: {
      type: String,
      default: ""
    },

    inputDisplay: {
      type: Boolean,
      default: true
    },

    searchBtnDisplay: {
      type: Boolean,
      default: true
    },

    placeholder: {
      type: String,
      default: ""
    },

    autoFetchQuery: {
      type: Boolean,
      default: false
    }
  },

  data: () => {
    return {
      queryOpt: {},
      queryValue: {}
    }
  },

  methods: {
    /**
     * 初始化搜索数据
     * @return {Object}
     */
    _initSearchData() {
      var _self = this;

      var deepInit = function (comp) {
        comp.$children.forEach((comp, index) => {

          INIT_SEARCH_CONTROL.forEach((controlName) => {
            if (comp.constructor.name === controlName) {
              if (!comp.queryName || (typeof comp.value === 'undefined')) {
                return false;
              }

              _self._storeQueryByComp(comp)
            }
          });

          if (comp.$children.length > 0) {
            return deepInit(comp);
          }

        });
      }

      deepInit(this)
    },

    _storeQueryByComp(comp) {
      switch (comp.constructor.name) {
        case 'InputBox':
          if (comp.autoCompletion) {
            var completionItem = comp.dispatcher.getCompletionItem();

            if (completionItem === 'undefined' || !completionItem || completionItem.length === 0) {
              return this;
            }

            this.addQuery({
              queryOpt: completionItem,
              queryValue: completionItem.value,
              queryName: comp.queryName
            });
          } else {
            this.addQuery({
              queryOpt: comp.value,
              queryValue: comp.value,
              queryName: comp.queryName
            });
          }

          break;
        case 'DropMenu':
          this.addQuery({
            queryOpt: {
              value: comp.value,
              text: comp.text
            },
            queryValue: comp.value,
            queryName: comp.queryName
          });

          break;
        case 'Checkbox':
          this.addQuery({
            queryOpt: {
              value: comp.value,
              text: comp.text
            },
            queryValue: comp.value,
            queryName: comp.queryName
          });
          break;
        case 'DateTime':
          this.addQuery({
            queryOpt: comp.value,
            queryValue: comp.value,
            queryName: comp.queryName
          });

          break;
        default: break;
      }
    },

    search() {
      this._initSearchData()

      this.fetchQuery && this.fetchQuery.call(null, {
        queryOpt: this.queryOpt,
        queryValue: this.queryValue,
        dispatcher: this
      });

      return {
        queryOpt: this.queryOpt,
        queryValue: this.queryValue,
        dispatcher: this
      }
    },

    addQuery({ queryOpt, queryValue, queryName }) {
      this.queryOpt = Object.assign({}, this.queryOpt, {
        [queryName]: queryOpt
      });
      this.queryValue = Object.assign({}, this.queryValue, {
        [queryName]: queryValue
      });
    },

    /**
     * 操作 queryOpt 的值
     */
    query(opt) {
      if (typeof opt === 'undefined') {
        return {
          queryOpt: this.queryOpt,
          queryValue: this.queryValue,
          dispatcher: this
        }
      }

      this.queryOpt = opt

      return this
    }
  },

  events: {
    [dropMenuEvent.menu.change](opt) {
      if (!this.autoFetchQuery) {
        return false
      }

      this.addQuery({
        queryOpt: {
          value: opt.value,
          text: opt.text
        },
        queryValue: opt.value,
        queryName: opt.queryName
      });

      return true;
    },
    [inputBoxEvent.change](opt) {
      if (!this.autoFetchQuery) {
        return false
      }

      this.addQuery({
        queryOpt: opt.value,
        queryValue: opt.value,
        queryName: opt.queryName
      });

      return true;
    }
  },

  watch: {
    "queryOpt"(val, oldVal) {
      if (Object.is(val, oldVal) || val === oldVal) {
        return false;
      }

      this.$dispatch(commonEvent.searchTool.change, {
        queryOpt: this.queryOpt,
        queryValue: this.queryValue,
        dispatcher: this
      })
    }
  },

  ready() {
    this._initSearchData()
  }
};

module.exports = Vue.component('search-tool', SearchTool);

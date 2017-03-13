/**
 * pagination 组件
 *
 * @props theme - 主题
 * @props display - 显示分页控件
 * @props pageData - 分页数据
 * @props onePageDisplay - 分页总页数为1时是否显示
 *
 */

const Vue = require('vue');
require('components/base/btn/btn');
require('components/base/input-box/input-box');
require('components/base/icon/icon');

require('./pagination.scss');
const template = require('./pagination.tpl');

const Pagination = {
  template,
  data(){
    return{
      jump:null
    }
  },
  props: {
    pageData: {
      type: Object,
      required: true
    },
    theme: {
      type: String,
      default: "primary"
    },
    display: {
      type: Boolean,
      default: true
    },
    onePageDisplay: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    indexs: function () {
      var left = 1
      var right = this.pageData.pages
      var ar = []

      if (this.pageData.pages >= 11) {
        if (parseInt(this.pageData.current) > 5 && parseInt(this.pageData.current) < this.pageData.pages - 4) {
          left = parseInt(this.pageData.current) - 5
          right = parseInt(this.pageData.current) +4
        } else {
          if (parseInt(this.pageData.current) <= 5) {
            left = 1
            right = 10
          } else {
            right = this.pageData.pages
            left = this.pageData.pages - 9
          }
        }
      }

      while (left <= right) {
        ar.push(left)
        left++
      }

      return ar
    },

    hideNextPage: function () {
      if (parseInt(this.pageData.current) === this.pageData.pages) {
        return true;
      }
      return false;
    },

    hidePretPage: function () {
      if (parseInt(this.pageData.current) === 1) {
        return true;
      }
      return false;
    }
  },

  methods: {
    /**
     * @param {Number} - 当前页码
     * @return {Function}
     */
    clickPage(currentPage) {
      if (currentPage != parseInt(this.pageData.current)) {
        this.pageData.current = currentPage;
        return this.$dispatch('switchPage', currentPage);
      }
    },
    jumpCurrent(jump){
      if (!jump || !(/^\d+$/.test(jump)) || (jump > this.pageData.pages)) {
        this.jump = null;
        return false;
      }
      this.clickPage(jump);
    }
  }
}

module.exports = Vue.component('pagination', Pagination);
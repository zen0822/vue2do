/**
 * pop 组件
 *
 * @props theme - 主题
 * @props items - tab的值
 * @props currentIndex - tab的当前值
 * @props compileVm - 动态编译的vm
 *
 */

const Vue = require('vue');

const baseMixin = require('components/mixin/base');
const arrayUtil = require('src/common/utils/array');
const { tab: tabEvent } = require('components/config/event.json');

require('./tab-ele');

const template = require('./tab.tpl');
require('./tab.scss');

const Tab = {
  name: "Tab",

  mixins: [baseMixin],

  template,

  props: {
    theme: {
      type: String,
      default: "primary"
    },

    items: {
      type: Array,
      default: () => []
    },

    currentIndex: {
      type: Number,
      default: 0
    },

    compileVm: Object
  },

  data: function () {
    return {
      currentItem: this.items[0],
      nextItem: this.items[1],
      nextIndex: 1,
      itemCount: this.items.length,
      themeClass: this.theme ? `theme-${this.theme}` : '',
      slotItems: []
    }
  },

  methods: {
    _init() {
      if (this.itemCount === 1) {
        this.nextItem = this.items[0]
        this.nextIndex = 0;
      } else {
        this.nextItem = this.items[1];
        this.nextIndex = 1;
      }
    },

    /**
     * 点击tab触发的事件
     * @param { Number } - 点击tab按钮
     * @return { Object }
     */
    select(index) {
      this.currentIndex = index;
      this.$dispatch(tabEvent.change, {
        dispatcher: this,
        item: this.items[index],
        index: index
      });

      return this;
    },

    /**
     * 是否被选中
     * @param { Number } - tabItems 的 index
     * @return { Boolean }
     */
    isActive(index) {
      return index === this.currentIndex;
    },

    /**
     * 初始化tabItems值
     *
     * @return {Function, Object}
     **/
    _initTabItems () {
      if (!this._slotContents && !(!!this.$options._content && this.$options._content.innerHTML)) {
        return false
      }

      var $tabSlot = {};
      var optionContent = this.$options._content ? this.$options._content.innerHTML : '';
      let $tabItemsSlot = $(this.$el).find('.tab-items-slot')

      if (optionContent) {
        $tabSlot = $tabItemsSlot.html(optionContent);
      } else {
        console.warn('vm.$options._content 取不到值 需要 修复，没值情况下的问题')
        $tabSlot = $tabItemsSlot.html(this._slotContents.default);
      }

      var $tabEles = $tabSlot.find('tab-ele');

      if ($tabEles.length === 0) {
        return this;
      }

      var items = [];
      var tabItemsEmpty = arrayUtil.isEmpty(this.items);

      $tabEles.each((index, el) => {
        var $el = $(el);
        var val = $el.attr('value');
        var txt = '';

        val = isNaN(val) ? val : Number(val);

        if ($el[0].hasAttribute('text')) {
          txt = $el.attr('text').trim();

          // 不让生成 html 有 text 节点
          this.slotItems.push($el.html().trim())
        } else {
          txt = $el.text().trim();
        }

        if (tabItemsEmpty) {
          items.push({
            value: val,
            text: txt
          });
        }
      });

      tabItemsEmpty && this.$set('items', items);

      this.$nextTick(() => {
        this._initTabSlot();
      })

      $tabItemsSlot.html('')

      return this;
    },

    /**
     * 初始化 tabItems 里面的 slot
     */
    _initTabSlot () {
      if (this.slotItems.length === 0) {
        return false;
      }

      if (typeof this.compileVm === 'undefined') {
        this.compileVm = this.$parent;
      }

      $(this.$el).find('.tab-item-ul .item').each((index, el) => {
        if (this.slotItems[index]) {
          var $el = $(el);
          var dom = document.createElement('div');

          dom.innerHTML = this.slotItems[index];
          this.compileVm.$compile(dom);
          el.innerHTML = ''
          el.appendChild(dom.firstChild);
        }
      });
    }
  },

  beforeCompile() {
    this._initTabItems();
  }
}

module.exports = Vue.component('tab', Tab);
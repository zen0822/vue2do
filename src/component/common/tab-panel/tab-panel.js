import Vue from 'vue'

import '../../base/tab/tab'
import '../../base/shift/shift'
import './panel-ele'

import baseMixin from '../../../mixin/base'

import template from './tab-panel.tpl'
import './tab-panel.scss'

const tabPanelComp = {
  name: 'tab-panel',

  mixins: [baseMixin],

  template,

  props: {
    theme: {
      type: String,
      default: 'primary'
    },

    tabItems: {
      type: Array,
      required: true
    }
  },

  data: function () {
    return {
      themeClass: this.theme ? `theme-${this.theme}` : '',
      panelItems: {},
      currentIndex: 0,
      currentItem: '',
      compileVm: this.$parent,
      switchingIndex: 0
    }
  },

  methods: {

    _initPanel() {
      var optionContent = this.$options._content
      var switchinghtml = ''

      for (let i = 0; i < this.tabItems.length; i++) {
        var slotEle = optionContent['children'][i].innerHTML

        switchinghtml += `
          <div slot='ele-${i}'>
            <div class='switching-content'>${slotEle}</div>
          </div>
        `
      }
      this.$tpl = $(this.$options.template)
      this.$tpl.find('.panel-wrap').html(switchinghtml)
    },

    /**
     * @param { String } - tab 的 name 值
     */
    _findIndex(name) {
      var currentIndex = 0

      this.tabItems.every((item, index) => {
        if (item.name === name) {
          currentIndex = index

          return false
        }
        return true
      })

      return currentIndex
    },

    /**
     * @param { Number }
     */
    switchPanel(index) {
      this.switchingIndex = index

      return this
    }
  },

  mounted() {
    var dom = this.$tpl[0]
    this.$compile(dom)
    this.$el = dom

    // 自动根据网址的 query 的 tab 值来转换 tab 状态
    this.switchPanel(this._findIndex(this.$route.query.tab))
  },

  created() {
    this._initPanel()
  }
}

export default tabPanelComp

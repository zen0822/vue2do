/**
 * date-time 组件
 *
 * @props theme - 主题
 * @props config - bootstrap-datetimepicker 的 config，
 *                 http://www.bootcss.com/p/bootstrap-datetimepicker/
 * @props placeholder - 输入框占位符
 * @props queryName - 参数名字
 * @props empty - 是否可以为空
 * @props errorMessage - 没填时间的错误提示
 *
 * @evetns change - 时间值改变
 */
const Vue = require('vue');

require('components/base/input-box/input-box');
require('components/base/icon/icon');
require('./date-time.scss');

const { dateTime: dateTimeEvent } = require('components/config/event.json');

const DateTime = {
  name: 'date-time',

  template: require('./date-time.tpl'),

  props: {
    theme: {
      type: String,
      default: 'primary'
    },

    value: String,

    queryName: {
      type: String,
      default: ''
    },

    config: {
      type: Object,
      default: () => {
        return {}
      }
    },

    placeholder: {
      type: String,
      default: ''
    },

    empty: {
      type: Boolean,
      default: true
    },

    errorMessage: String
  },

  data() {
    return {
      themeClass: this.theme ? `theme-${this.theme}` : '',
      dangerTip: `请选择${this.errorMessage}时间！`
    }
  },

  watch: {
    value (val) {
      this.$dispatch(dateTimeEvent.change, {
        dispatcher: this,
        value: val,
        queryName: this.queryName
      })
    }
  },

  methods: {
    /**
     * 验证时间控件的值是否达到标准
     */
    verify () {
      return !!this.value
    }
  }
}

module.exports = Vue.component('date-time', DateTime);

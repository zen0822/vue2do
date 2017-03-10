/**
 * data-picker 组件
 *
 * @props theme - 主题
 * @props value - 当前输入框的值
 * @props type - 时间空间类型
 * @props begin - 最小可选时间
 * @props end - 最大可选时间
 */
const Vue = require('vue');
const Calendar = require('../data-calendar/data-calendar.vue');
require('components/base/icon/icon');
require('./data-picker.scss');
const { dataPicker: dataPickerHub } = require('components/config/componentHub.json');

const DataPicker = {
  name: 'data-picker',

  template: require('./data-picker.tpl'),

  components: {
    Calendar
  },

  props: {
    theme: {
      type: String,
      default: 'primary'
    },

    value: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: 'date'
    },

    begin: {
      type: String,
      default: ''
    },

    end: {
      type: String,
      default: ''
    },

    placeholder: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      themeClass: this.theme ? `theme-${this.theme}` : '',
      calendar:{
        show: false,
        x: 0,
        y: 0,
        picker: "",
        type: "date",
        value: "",
        sep: "-",
        range: false,
        end: '',
        begin: ''
      }
    }
  },

  methods: {
    open(e) {
      this.calendar.show = true;
      this.calendar.type = this.type;
      this.calendar.x = e.currentTarget.offsetLeft;
      this.calendar.y = e.currentTarget.offsetTop+e.currentTarget.offsetHeight+8;
      this.calendar.begin = this.begin;
      this.calendar.end = this.end;
      COMMON.componentHub[dataPickerHub].forEach((val, index) => {
        if (!Object.is(this, val)) {
          val.calendar.show = false;
        }
      });
    }
  },

  ready() {
    COMMON.componentHub[dataPickerHub].push(this);
  },

  watch: {
    ['calendar.value'](val) {
      this.value = val;
    }
  }
}

module.exports = Vue.component('data-picker', DataPicker);

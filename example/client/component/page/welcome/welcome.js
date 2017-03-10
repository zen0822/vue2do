import './welcome.scss'
import template from './welcome.tpl'
import tip from 'vue2/component/base/pop/tip'
import alert from 'vue2/component/base/pop/alert'

import {
  btn,
  check,
  form,
  input,
  icon,
  list,
  loading,
  pop,
  scroller,
  select,
  selectEle,
  shift,
  shiftEle,
  tab,
  tabEle,
  col,
  row,
  table,
  tableCol,
  tableRow
} from 'vue2'

export default {
  name: 'welcome',

  template,

  components: {
    'btn': btn,
    'check': check,
    'form-area': form,
    'input-box': input,
    'icon': icon,
    'list': list,
    'loading': loading,
    'pop': pop,
    'drop-menu': select,
    'drop-menu-ele': selectEle,
    'scroller': scroller,
    'shift': shift,
    'shift-ele': shiftEle,
    'tab': tab,
    'tab-ele': tabEle,
    'column': col,
    'row': row,
    'table-data': table,
    'table-row': tableRow,
    'table-col': tableCol
  },

  data() {
    return {
      testName: 'test',
      dropMenuOpt: [],
      classifyOpt: {
        recent: [{
          value: 1,
          text: 'test1'
        }],
        hot: [{
          value: 1,
          text: 'test1'
        }, {
          value: 2,
          text: 'test2'
        }, {
          value: 3,
          text: 'test3'
        }]
      },

      initVal: []
    }
  },

  methods: {
    optProcessor(option) {
      option.unshift({
        value: -1,
        text: 'optProcessor'
      })

      return option
    },

    clickIcon() {
      debugger
    },

    submit() {
      this.$refs.submit.openLoading()
      this.$refs.formArea.verify()
      console.log(this.$refs.formArea.queryOpt)
    },

    next() {
      this.$refs.shift.rotate()
    }
  },

  created() {
    for (let i = 0, len = 33; i < len; i++) {
      this.dropMenuOpt.push({
        text: 'test-' + i,
        name: 'name-' + i,
        size: 'size-' + i,
        en: 'en-' + i,
        value: i
      })
    }
  },

  mounted() {
    setTimeout(() => {
      this.dropMenuOpt = this.dropMenuOpt.concat([{
        value: 4,
        text: 'test4'
      }, {
        value: 5,
        text: 'test5'
      }, {
        value: 6,
        text: 'test6'
      }])

      this.initVal = ['2', '4']
    }, 3000)
  }
}

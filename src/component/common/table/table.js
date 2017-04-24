/**
 * table 组件
 *
 * @props auto - 根据传入的列表数据生成分页数据
 * @props border - 表格的边界线的类型
 *   （none：默认是不要边界线，all：横竖都要，row：只要行与行之间要，col：只要列与列之间要）
 * @props page - 分页数据（没传的话，默认将传的列表数据（item）作为分页数据）
 * @props pager - 启动分页功能
 * @props list - 默认是不以列表化的表格数据
 * @props thead - 表头标题数据
 * @props tbody - 列表的数据
 * @props page - 分页数据
 * @props pageSize - 将列表数据（item）分为每页多少条数据
 * @props scrollerAutoHide - 是否远程获取数据
 *
 * @events switchPage - 切换分页
 */

import './table.scss'
import render from './table.render'
import baseMixin from '../../../mixin/base'
import listMixin from '../../../mixin/list'
import tip from '../../base/pop/tip'
import { findGrandpa } from '../../../util/util'

const COL_PADDING_BORDER_LENGTH = 22

const tableRowComp = {
  name: 'table-row',
  mixins: [baseMixin],
  computed: {
    cPrefix() {
      return `${this.compPrefix}-table-row`
    }
  },
  render(h) {
    return h(
      'tr',
      {
        class: [this.cPrefix]
      },
      this.$slots.default
    )
  }
}

const tableColComp = {
  name: 'table-col',
  mixins: [baseMixin],
  props: {
    align: {
      type: String,
      default: 'left'
    },
    omit: {
      type: Boolean,
      default: false
    },
    th: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: ''
    },
    minWidth: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      colWidth: '',
      table: 0
    }
  },
  computed: {
    cPrefix() {
      return `${this.compPrefix}-table-col`
    },
    tableWidth() {
      return this.table.tableWidth
    },
    colBodyStyle() {
      return {
        width: this.widthTypeStyle(this.width),
        'max-width': this.widthTypeStyle(this.maxWidth),
        'min-width': this.widthTypeStyle(this.minWidth)
      }
    }
  },
  render(h) {
    return h(
      this.th ? 'th' : 'td',
      {
        class: [
          this.cPrefix,
          this.prefixClass('text-' + this.align)
        ]
      },
      [
        h('div', {
          class: [{
            [`${this.prefixClass('text-omit')}`]: this.omit
          }],
          style: this.colBodyStyle
        }, this.$slots.default)
      ]
    )
  },
  methods: {
    widthTypeStyle(width) {
      if (!this.colWidth || width === '') {
        return ''
      }

      // 最终的宽度
      let w = ''
      let colBodyWidth = 0
      let colContentWidth = 0
      let widthNum = parseFloat(width)

      colBodyWidth = width.indexOf('%') ? `${this.tableWidth * widthNum * 0.01 - COL_PADDING_BORDER_LENGTH}` : widthNum
      colContentWidth = this.$el.offsetWidth - COL_PADDING_BORDER_LENGTH

      // TODO: 当父元素 td 的宽度大于内容宽度时，宽度要设置成 auto
      w = colContentWidth > colBodyWidth ? colContentWidth : colBodyWidth

      return colBodyWidth + 'px'
    }
  },
  beforeMount() {
    this.table = findGrandpa(this.$parent, 'table')
  },
  mounted() {
    this.$nextTick(() => {
      this.colWidth = this.$el.offsetWidth
    })
  }
}

const tableComp = {
  name: 'table',

  render,

  mixins: [baseMixin, listMixin],

  props: {
    auto: {
      type: Boolean,
      default: false
    },

    border: {
      type: String,
      default: 'none'
    },

    list: {
      type: Boolean,
      default: false
    },

    thead: {
      type: Array,
      default: () => []
    },

    tbody: {
      type: Array,
      default: () => []
    },

    page: {
      type: Object,
      default: () => {
        return {}
      }
    },

    pager: {
      type: Boolean,
      default: false
    },

    pageSize: {
      type: Number,
      default: 5
    }
  },

  data() {
    // 组件名字
    this.compName = 'table'

    return {
      emptyDataText: this.$t('table.emptyData'),
      pageData: {},
      tbodyItem: this.tbody.slice(),
      theadItem: this.thead.slice(),
      // 组件自身的宽度
      tableWidth: 0
    }
  },

  computed: {
    cPrefix() {
      return `${this.compPrefix}-table`
    },

    pagerDisplay() {
      return this.list && this.pager &&
        this.tbody.length > 0 &&
        this.tbodyItem.length > 0
    }
  },

  watch: {
    tbody(val) {
      if (this.auto) {
        this.initPage({
          tableData: val.slice()
        })
      }

      this.initTable({
        pageNum: this.pageData.current,
        tableData: val.slice()
      })
    },

    thead(val) {
      this.theadItem = val.slice()
    },

    deviceSize() {
      this.tableWidth = this.$el.offsetWidth
    }
  },

  methods: {
    _init() {
      this.tableWidth = this.$el.offsetWidth
    },

    /**
     * 初始化分页
     */
    initPage({ tableData = {}, pageData = {} }) {
      if (!this.auto) {
        this.pageData = Object.assign({}, pageData)

        return this
      }

      this.pageData = Object.assign(pageData, {
        length: tableData.length,
        size: this.pageSize,
        current: 1,
        total: Math.ceil(tableData.length / this.pageSize)
      })

      return this
    },

    /**
     * 添加数据到组件
     *
     * @param { Object } - 分页数据
     *
     * @return { Object }
     */
    initTable({ pageNum = 1, tableData }) {
      this.tbodyItem = this.getListItemByPage({
        listItem: tableData,
        pageNum,
        pageSize: this.auto ? this.pageSize : false
      })

      return this
    },

    /**
     * loading 隐藏
     *
     */
    hideLoading() {
      this.$refs.loading.hide()

      return this
    },

    /**
     * loading 显示
     *
     */
    showLoading() {
      this.$refs.loading.show()

      return this
    },

    switchPage(currentPage) {
      this.showLoading()

      this.initTable({
        pageNum: currentPage,
        tableData: this.tbody.slice()
      })

      return this.$emit('switchPage', {
        currentPage
      })
    },

    scroll() {
      return this.$emit('scroll')
    }
  },

  created() {
    this.initPage({ tableData: this.tbody.slice() }).initTable({
      pageNum: this.pageData.current,
      tableData: this.tbody.slice()
    })
  }
}

export default tableComp

export {
  tableComp,
  tableColComp,
  tableRowComp
}

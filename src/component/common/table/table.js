/**
 * table 组件
 *
 * @props auto - 根据传入的列表数据生成分页数据
 * @props page - 分页数据（没传的话，默认将传的列表数据（item）作为分页数据）
 * @props pager - 启动分页功能
 * @props thead - 表头标题数据
 * @props tbody - 列表的数据
 * @props page - 分页数据
 * @props pageSize - 将列表数据（item）分为每页多少条数据
 * @props scrollerAutoHide - 是否远程获取数据
 */

import './table.scss'
import render from './table.render'
import baseMixin from 'src/mixin/base'
import listMixin from 'src/mixin/list'
import tip from 'src/component/base/pop/tip'

const tableRowComp = {
  name: 'table-row',
  template: `
    <tr class="table-row">
      <slot></slot>
    </tr>
  `
}

const tableColComp = {
  name: 'table-col',
  mixins: [baseMixin],
  computed: {
    cPrefix() {
      return `${this.compPrefix}-table-col`
    }
  },
  render(h) {
    return h(
      'td',
      { class: [this.cPrefix] },
      this.$slots.default
    )
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
      default: true
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
      pagerDisplay: true,
      tbodyItem: this.tbody.slice(),
      theadItem: this.thead.slice()
    }
  },

  computed: {
    cPrefix() {
      return `${this.compPrefix}-table`
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
    }
  },

  methods: {
    /**
     * 初始化分页
     */
    initPage({tableData = {}, pageData = {}}) {
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
    initTable({pageNum = 1, tableData}) {
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

    /**
     * 重置queryOpt
     * @param { Object } - 参数选项
     * @return { Object }
     */
    resetQueryOpt(opt = {}) {
      this.queryOpt = opt

      return this
    },

    switchPage(currentPage) {
      if (this.url) {
        this.queryOpt = Object.assign(this.queryOpt, {
          _index: currentPage
        })
        this.fetch()

        return false
      }

      return true
    },

    scroll() {
      return this.$emit('scroll')
    }
  },

  created() {
    this.initPage({tableData: this.tbodyItem.slice()}).initTable({
      pageNum: this.pageData.current,
      tableData: this.tbodyItem
    })
  }
}

export default tableComp

export {
  tableComp,
  tableColComp,
  tableRowComp
}

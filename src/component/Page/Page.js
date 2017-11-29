/**
 * page 组件
 *
 * @prop auto -自动计算分页数据（data 选项需要传入数据的长度 length 和每页的数据数目 size）
 * @prop display - 显示分页控件
 * @prop data - 分页数据
 *             length - 一共有几条数据
 *             total - 一共有多少页
 *             size - 每页几条数据
 *             current - 当前的页码
 * @prop onePageDisplay - 分页总页数为 1 时是否显示
 * @prop size - 分页外观尺寸大小（s | m | l）
 * @prop type - 分页类型（加载更多：more | 数字标注（默认）：num）
 * @prop loadMoreText - 加载更多的提示文字
 *
 * @event switch - 换页触发事件
 *
 * @slot loadMore - 分页类型为加载更多时的，在按钮处的内容分发
 *
 */

import './Page.scss'

import Btn from '../Btn/Btn'
import Icon from '../Icon/Icon'
import Input from '../Input/Input'
import Row from '../Row/Row'
import Column from '../Col/Col'

import baseMixin from '../../mixin/base'
import render from './Page.render'

const pageComp = {
  name: 'page',

  render,

  mixins: [baseMixin],

  components: {
    btn: Btn,
    icon: Icon,
    row: Row,
    column: Column,
    'input-box': Input
  },

  props: {
    auto: {
      type: Boolean,
      required: false
    },
    data: {
      type: Object,
      required: true
    },
    display: {
      type: Boolean,
      default: true
    },
    loadMoreText: {
      type: String,
      default: '点击加载更多'
    },
    onePageDisplay: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'm'
    },
    type: {
      type: String,
      default: 'num'
    }
  },

  data() {
    return {
      pageData: {}, // 分页数据
      pageItem: [] // 分页的数字按钮
    }
  },

  computed: {
    cPrefix() { // 组件类名的前缀
      return `${this.compPrefix}-page`
    },
    moreDisplay() {
      return this.type === 'more'
    },
    numDisplay() {
      return this.type === 'num'
    },
    nextDisplay() {
      if (this.pageData.current === this.pageData.total) {
        return true
      }

      return false
    },
    preDisplay() {
      if (this.pageData.current === 1) {
        return true
      }

      return false
    },
    pageDisplay() {
      return this.display && (this.onePageDisplay || this.pageData.total > 1)
    }
  },

  watch: {
    data(val) {
      this._initPage(Object.assign({}, val))
    }
  },

  methods: {
    /**
     * 初始化分页
     */
    _initPage(pageData) {
      if (this.auto) {
        Object.assign(pageData, {
          total: Math.ceil(pageData.length / pageData.size),
          current: 1
        })
      }

      let pageStart = 1
      let pageEnd = pageData.total
      let pageItem = []

      if (pageData.total >= 11) {
        if (pageData.current > 5 && pageData.current < pageData.total - 4) {
          pageStart = pageData.current - 5
          pageEnd = pageData.current + 4
        } else {
          if (pageData.current <= 5) {
            pageStart = 1
            pageEnd = 10
          } else {
            pageEnd = pageData.total
            pageStart = pageData.total - 9
          }
        }
      }

      while (pageStart <= pageEnd) {
        pageItem.push(pageStart)
        pageStart++
      }

      this.pageData = Object.assign(pageData, {
        item: pageItem
      })
    },

    /**
     * 加载更多
     */
    more(event = {}) {
      event.stopPropagation && event.stopPropagation()

      this.next()
    },

    /**
     * @param {Number} - 当前页码
     * @return {Function}
     */
    click(event = {}, currentPage) {
      event.stopPropagation && event.stopPropagation()

      if (currentPage === this.pageData.current) {
        return false
      }

      return this.switch(currentPage)
    },

    /**
     * 下一页
     */
    next(event = {}) {
      event.stopPropagation && event.stopPropagation()

      if (this.pageData.current + 1 > this.pageData.total) {
        return false
      }

      return this.switch(this.pageData.current + 1)
    },

    /**
     * 上一页
     */
    pre(event = {}) {
      event.stopPropagation && event.stopPropagation()

      if (this.pageData.current - 1 === 0) {
        return false
      }

      return this.switch(this.pageData.current - 1)
    },

    /**
     * 最后一页
     */
    end(event = {}) {
      event.stopPropagation && event.stopPropagation()

      return this.switch(this.pageData.total)
    },

    /**
     * 第一页
     */
    start(event = {}) {
      event.stopPropagation && event.stopPropagation()

      return this.switch(1)
    },

    /**
     * 跳转到指定页数
     */
    jump(event = {}) {
      event.stopPropagation && event.stopPropagation()

      return this.switch(this.$refs.jumpInput.val())
    },

    /**
     * 切换页码
     */
    switch (pageNum) {
      if (isNaN(pageNum)) {
        return false
      }

      this.pageData.current = pageNum

      return this.$emit('switch', {
        currentPage: pageNum,
        emitter: this
      })
    }
  },

  created() {
    this._initPage(Object.assign({}, this.data))
  }
}

export default pageComp

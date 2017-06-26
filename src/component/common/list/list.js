/**
 * list 组件
 *
 * @prop auto - 根据传入的列表数据生成分页数据
 * @prop autoHideScroller - 是否自动隐藏滚动条
 * @prop item - 列表数据
 * @prop page - 分页数据（没传的话，默认将传的列表数据（item）作为分页数据）
 * @prop pager - 启动分页功能
 * @prop pageSize - 将列表数据（item）分为每页多少条数据
 * @prop pageType - 列表分页类型（加载更多：more | 数字标注（默认）：num）
 * @prop pageTrigger - 加载更多的触发模式（滚动到底部自动触发（默认）：scroll | 点击：click）
 *
 * @event switch - 换页触发事件
 *
 */

import './list.scss'
import render from './list.render'
import baseMixin from '../../../mixin/base'
import listMixin from '../../../mixin/list'
import tip from '../../base/message/tip'

import iconComp from '../../base/icon/icon'
import loadingComp from '../../base/loading/loading'
import pageComp from '../../base/page/page'
import scrollerComp from '../../base/scroller/scroller'
import slideTransition from '../../transition/slide'

import { findGrandpa } from '../../../util/util'

const PAGE_TYPE_NUM = 'num'
const PAGE_TYPE_MORE = 'more'

const listComp = {
  name: 'list',

  render,

  mixins: [baseMixin, listMixin],

  components: {
    icon: iconComp,
    loading: loadingComp,
    page: pageComp,
    scroller: scrollerComp,
    'slide-transition': slideTransition
  },

  props: {
    auto: {
      type: Boolean,
      default: false
    },

    item: {
      type: Array,
      default: () => []
    },

    page: Object,

    pager: {
      type: Boolean,
      default: false
    },

    pageSize: {
      type: Number,
      default: 5
    },

    pageType: {
      type: String,
      default: 'num'
    },

    pageTrigger: {
      type: String,
      default: 'scroll'
    },

    autoHideScroller: {
      type: Boolean,
      default: false
    },

    scrollerHeight: {
      type: [String, Number],
      default: 'auto'
    }
  },

  data() {
    return {
      listItem: [],
      pageData: {},
      // 滚动加载更多时的图标显示状态
      arrowOfMoreDisplay: true,
      // 加载更多的显示状态
      moreDisplay: false,
      // 滚动条是否在底部
      scrollerAlmostInBottom: false,
      // 是否正在加载列表数据
      loadingListData: false,
      // 下拉框祖先元素
      selectGrandpa: {},
      // 分页的位置
      pagerPoi: {
        top: 0,
        left: 0
      }
    }
  },

  computed: {
    // 组件类名的前缀
    cPrefix() {
      return `${this.compPrefix}-list`
    },
    // 加载更多的显示文字
    loadMoreText() {
      if (this.pageType === PAGE_TYPE_MORE) {
        return `${this.pageTrigger === 'click' ? '点击' : '滚动'}加载更多`
      }
    },
    // 分页的显示状态
    pagerDisplay() {
      return (!this.selectGrandpa || this.selectGrandpa.transitionFinish) && this.pageData.current !== this.pageData.total && this.scrollerAlmostInBottom
    },
    // 是否是加载更多的触发方式
    isPageTypeMore() {
      return this.pageType === PAGE_TYPE_MORE
    },
    // 分页组件的样式
    pagerStyle() {
      return {
        top: this.pagerPoi.top + 'px',
        left: this.pagerPoi.left + 'px'
      }
    }
  },

  watch: {
    item(val) {
      if (this.auto) {
        this.initPage()
      }

      this.initList({
        pageNum: this.pageData.current,
        listItem: val
      })
    }
  },

  methods: {
    _init() {
      this.pagerPoi = {
        top: 164
      }
      this.$refs.scroller && this.$refs.scroller.$on('changeYBar', ({isBottom}) => {
        this.scrollerAlmostInBottom = isBottom
      })
    },

    /**
     * 初始化分页
     */
    initPage(pageData = {}) {
      if (!this.auto) {
        this.pageData = Object.assign({}, pageData)

        return this
      }

      this.pageData = Object.assign(pageData, {
        length: this.item.length,
        size: this.pageSize,
        current: 1,
        total: Math.ceil(this.item.length / this.pageSize)
      })

      return this
    },

    /**
     * 初始化列表数据
     */
    initList({pageNum, pageData, listItem}) {
      if (!this.auto) {
        this.listItem = listItem

        this.initPage(Object.assign(pageData, {
          current: pageNum
        }))

        return this
      }

      let startSlice = 0
      let endSlice = 0

      if (this.pageType === PAGE_TYPE_NUM) {
        startSlice = (pageNum - 1) * this.pageSize
        endSlice = startSlice + this.pageSize
      } else {
        endSlice = pageNum * this.pageSize
      }

      this.listItem = this.getListItemByPage({
        listItem: this.item.slice(),
        pageNum,
        pageSize: this.auto ? this.pageSize : false,
        pageType: this.pageType
      })

      return this
    },

    /**
     * 切换页数
     */
    switchPage(currentPage) {
      if (this.pageData.current > this.pageData.total) {
        return false
      }

      if (this.loadingListData) {
        return false
      }

      this.$emit('switchPage', {
        currentPage,
        emitter: this
      })

      if (this.auto) {
        this.showLoading()
        this.loadingListData = true
        this.pageData.current = currentPage

        setTimeout(() => {
          this.loadingListData = false

          this.initList({
            pageNum: currentPage,
            listItem: this.item
          })

          this.hideLoading()
        }, 1000)
      }
    },

    /**
     * scroller 滚动触发事件
     */
    scroll({ offset, top, isBottom }) {
      if (this.pageTrigger === 'scroll') {
        if (offset - top < 5 && this.pageData.current + 1 <= this.pageData.total) {
          return this.switchPage(this.pageData.current + 1)
        }
      }

      this.scrollerAlmostInBottom = offset - top < 30
    },

    /**
     * 显示 loading
     *
     * @return { Object }
     */
    showLoading() {
      if (this.isPageTypeMore) {
        this.$refs.loadingOfMore.show()
      } else {
        this.$refs.loading.show()
      }

      this.arrowOfMoreDisplay = false

      return this
    },

    /**
     * 隐藏 loading
     *
     * @return { Object }
     */
    hideLoading() {
      if (this.isPageTypeMore) {
        this.$refs.loadingOfMore.hide()
      } else {
        this.$refs.loading.hide()
      }

      this.arrowOfMoreDisplay = true

      return this
    }
  },

  created() {
    this.initPage().initList({
      pageNum: this.pageData.current,
      listItem: this.item
    })
  },

  beforeMount() {
    this.selectGrandpa = findGrandpa(this.$parent, 'select')
  }
}

export default listComp

/**
 * list 组件
 *
 * @prop auto - 根据传入的列表数据自动生成分页数据
 * @prop autoHideScroller - 是否自动隐藏滚动条
 * @prop autoHidePage - 是否自动隐藏分页触发器
 * @prop item - 列表数据
 * @prop page - 分页数据（没传的话，默认将传的列表数据（item）作为分页数据）
 * @prop pager - 启动分页功能
 * @prop pageSize - 将列表数据（item）分为每页多少条数据
 * @prop pageType - 列表分页类型（加载更多：more | 数字标注（默认）：num）
 * @prop pageTrigger - 加载更多的触发模式（滚动到底部自动触发（默认）：scroll | 点击：click）
 *
 * @event switchPage - 换页触发事件
 * @event scrollerChange - 滚动区域的高度/宽度变化
 */

import './List.scss'
import render from './List.render'
import tip from '../Message/tip'

import Icon from '../Icon/Icon'
import Loading from '../Loading/Loading'
import Pager from '../Page/Page'
import Scroller from '../Scroller/Scroller'
import MotionSlide from '../MotionSlide/MotionSlide'

import baseMixin from '../../mixin/base'
import apiMixin from './List.api'
import listMixin from '../../mixin/list'

import {
  findGrandpa
} from '../../util/util'

const PAGE_TYPE_NUM = 'num'
const PAGE_TYPE_MORE = 'more'

export default {
  name: 'List',

  render,

  mixins: [baseMixin, listMixin, apiMixin],

  components: {
    icon: Icon,
    loading: Loading,
    page: Pager,
    scroller: Scroller,
    'slide-transition': MotionSlide
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
      default: 'num',
      validator(val) {
        return ['num', 'more'].includes(val)
      }
    },

    pageTrigger: {
      type: String,
      default: 'scroll',
      validator(val) {
        return ['click', 'scroll'].includes(val)
      }
    },

    autoHideScroller: {
      type: Boolean,
      default: false
    },

    autoHidePage: {
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
      arrowOfMoreDisplay: true, // 滚动加载更多时的图标显示状态
      moreDisplay: false, // 加载更多的显示状态
      scrollerAlmostInBottom: false, // 滚动条是否在底部
      loadingListData: false, // 是否正在加载列表数据
      pageDetail: { // 分页的相关信息
        top: 0,
        left: 0,
        bottom: 0
      },
      pagerDisplay: false, // 分页显示状态
      transitionQueue: [], // 分页动画队列
      transitedQueueInterval: {} // 轮询分页动画定时器
    }
  },

  computed: {
    cPrefix() { // 组件类名的前缀
      return `${this.compPrefix}-list`
    },
    loadMoreText() { // 加载更多的显示文字
      if (this.pageType === PAGE_TYPE_MORE) {
        return `${this.pageTrigger === 'click' ? '点击' : '滚动'}加载更多`
      }
    },
    pagerDisplayStatus() { // 分页的显示状态
      return this.pageData.total !== 0 &&
        this.pageData.current !== this.pageData.total &&
        this.scrollerAlmostInBottom
    },
    isPageTypeMore() { // 是否是加载更多的触发方式
      return this.pageType === PAGE_TYPE_MORE
    },
    pagerStyle() { // 分页组件的样式
      return {
        top: this.pageDetail.top + 'px',
        left: this.pageDetail.left + 'px'
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
    },
    pagerDisplayStatus(val) {
      this._transitePage(val)
    }
  },

  methods: {
    _setDataOpt() {
      this.pageData = {
        ...this.page
      }
    },

    _binder() {
      const refScroller = this.$refs.scroller

      refScroller.$on('scrollY', ({
        offset,
        top,
        isBottom
      }) => {
        if (this.pageTrigger === 'scroll') {
          if (offset - top < 5 && this.pageData.current + 1 <= this.pageData.total) {
            return this.switchPage({
              currentPage: this.pageData.current + 1
            })
          }

          this.scrollerAlmostInBottom = offset - top < 30
        }
      })

      refScroller.$on('change', (opt) => {
        this.initPagePosition()

        return this.$emit('scrollerChange', {
          ...opt,
          emitter: this
        })
      })

      refScroller.$on('yBarChange', ({
        isBottom
      }) => {
        if (!this.$el.offsetHeight) {
          return false
        }

        this.initPagePosition()
        console.log(isBottom)
        this.$nextTick(() => {
          this.scrollerAlmostInBottom = isBottom
        })
      })
    },

    /**
     * 执行分页过渡动画
     */
    _transitePage(show = true) {
      this.$nextTick(() => {
        const refPageTransition = this.$refs.pageSlideTransition

        if (show) {
          return refPageTransition.enter()
        } else {
          return refPageTransition.leave()
        }
      })
    }
  },

  created() {
    this.initPage().initList({
      pageNum: this.pageData.current,
      listItem: this.item
    })
  },

  mounted() {
    this.$nextTick(() => {
      this.initPagePosition()
    })
  }
}

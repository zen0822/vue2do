/**
 * list 组件
 *
 * @prop auto - 根据传入的列表数据自动生成分页数据
 * @prop autoHideScroller - 是否自动隐藏滚动条
 * @prop item - 列表数据
 * @prop page - 分页数据（没传的话，默认将传的列表数据（item）作为分页数据）
 * @prop pager - 启动分页功能
 * @prop pageSize - 将列表数据（item）分为每页多少条数据
 * @prop pageType - 列表分页类型（加载更多：more | 数字标注（默认）：num）
 * @prop pageTrigger - 加载更多的触发模式（滚动到底部自动触发（默认）：scroll | 点击：click）
 *
 * @event switchPage - 换页触发事件
 *
 */

import './list.scss'
import render from './list.render'
import tip from '../../base/message/tip'

import iconComp from '../../base/icon/icon'
import loadingComp from '../../base/loading/loading'
import pageComp from '../../base/page/page'
import scrollerComp from '../../base/scroller/scroller'
import slideTransition from '../../transition/slide'

import baseMixin from '../../../mixin/base'
import apiMixin from './list.api'
import listMixin from '../../../mixin/list'

import { findGrandpa } from '../../../util/util'

const PAGE_TYPE_NUM = 'num'
const PAGE_TYPE_MORE = 'more'

const listComp = {
  name: 'list',

  render,

  mixins: [baseMixin, listMixin, apiMixin],

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
      // 分页的相关信息
      pageDetail: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        parentWidth: 0,
        parentHeight: 0
      },
      // 分页显示状态
      pagerDisplay: false,
      // 分页动画队列
      transitionQueue: [],
      // 轮询分页动画定时器
      transitedQueueInterval: {}
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
    pagerDisplayStatus() {
      return (!this.selectGrandpa || this.selectGrandpa.transitionFinish)
        && this.pageData.total !== 0
        && this.pageData.current !== this.pageData.total
        && this.scrollerAlmostInBottom
    },
    // 是否是加载更多的触发方式
    isPageTypeMore() {
      return this.pageType === PAGE_TYPE_MORE
    },
    // 分页组件的样式
    pagerStyle() {
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
      if (this.$refs.slideTransition && this.$refs.slideTransition.transiting) {
        return this._transitionQueueOperator().add(val)
      }

      this._transitePage(val)
    }
  },

  methods: {
    _setDataOpt() {
      this.pageData = Object.assign({}, this.page)
    },

    _init() {
      this.$refs.scroller.$on('changeScroller', ({
        scrollerHeight, emitter
      }) => {
        let ele = this.elementProp(this.$refs.page.$el)

        this.pageDetail = Object.assign({}, this.pageDetail, {
          top: this.$el.offsetHeight - ele.offsetHeight,
          left: ele.offsetLeft,
          width: ele.offsetWidth,
          height: ele.offsetHeight,
          parentWidth: this.$el.offsetWidth,
          parentHeight: this.$el.offsetHeight
        })

        this.scrollerAlmostInBottom = emitter.yComputed.isBottom
      })

      this.$refs.scroller.$on('changeYBar', ({ isBottom }) => {
        if (!this.$el.offsetHeight) {
          return false
        }

        return this.scrollerAlmostInBottom = isBottom
      })
    },

    /**
     * 执行分页过渡动画
     */
    _transitePage(show = true) {
      if (show) {
        this.$refs.slideTransition.$off('afterEnter')
        this.$refs.slideTransition.$on('afterEnter', () => {
          this.pagerDisplay = true
        })

        this.$refs.slideTransition.enter()
      } else {
        this.$refs.slideTransition.$off('afterLeave')
        this.$refs.slideTransition.$on('afterLeave', () => {
          this.pagerDisplay = false
        })

        this.$refs.slideTransition.leave()
      }
    },

    /**
     * 处理分页过渡动画的队列
     */
    _transitionQueueOperator() {
      let _self = this

      return {
        add(transition) {
          _self.transitionQueue.push(transition)
          this.handle()
        },
        handle: () => {
          _self.transitedQueueInterval = setInterval(() => {
            if (_self.transitionQueue.length === 0) {
              return clearInterval(_self.transitedQueueInterval)
            }

            if (_self.$refs.slideTransition.transiting) {
              return false
            }

            _self._transitePage(_self.transitionQueue.shift())
          }, 0)
        }
      }
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

/**
 * list.api
 */

const PAGE_TYPE_NUM = 'num'
const PAGE_TYPE_MORE = 'more'

export default {
  methods: {
    /**
     * 更新列表数据
     *
     * @param {Array} listItem - 列表数据
     */
    update(listItem) {
      if (this.auto) {
        this.initPage()
      }

      this.initList({
        pageNum: this.pageData.current,
        stateItem: listItem
      })
    },

    /**
     * 初始化分页
     */
    initPage(pageData = {}) {
      if (!this.auto) {
        this.pageData = Object.assign({}, this.pageData, pageData)

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
    initList({
      pageNum = 1,
      pageData = {},
      listItem = []
    } = {}) {
      if (!this.auto) {
        this.stateItem = listItem.slice()

        this.initPage(Object.assign(pageData, {
          current: pageNum
        }))

        return this
      }

      let startSlice = 0
      let endSlice = 0

      if (this.isPageTypeMore) {
        endSlice = pageNum * this.pageSize
      } else {
        startSlice = (pageNum - 1) * this.pageSize
        endSlice = startSlice + this.pageSize
      }

      this.stateItem = this.getListItemByPage({
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
    switchPage({
      currentPage
    }) {
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
    },

    /**
     * 列表滚动到指定高度
     *
     * @param {Number} top - 滚动内容的滚动距离
     */
    scrollTop(top) {
      return this.$refs.scroller.scrollTop(top)
    }
  }
}

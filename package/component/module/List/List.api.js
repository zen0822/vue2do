/**
 * list.api
 */

export default {
  methods: {
    /**
     * 更新列表数据
     *
     * @param {Array} listItem - 列表数据
     */
    update(listItem) {
      if (this.auto) {
        this.pageData = this.getPageData()
      }

      this.stateItem = this.getListData({
        pageNum: this.pageData.current,
        stateItem: listItem
      })
    },

    /**
     * 设置分页数据
     */
    setPageData(pageData) {
      this.pageData = {
        ...this.pageData,
        ...pageData
      }
    },

    /**
     * 初始化分页数据
     */
    initPageData(data) {
      let pageData = null

      if (this.auto) {
        pageData = {
          size: this.pageSize,
          length: this.item.length,
          total: Math.ceil(this.item.length / this.pageSize),
          current: 1,
          ...data
        }
      } else {
        pageData = this.page
      }

      this.pageData = {
        ...pageData
      }
    },

    /**
     * 获取列表数据
     */
    setListItem({
      pageNum,
      pageSize,
      listItem = []
    } = {}) {
      let listItemTemp = null

      if (this.auto) {
        let startSlice = 0
        let endSlice = 0

        if (this.isPageTypeMore) {
          endSlice = pageNum * this.pageSize
        } else {
          startSlice = (pageNum - 1) * this.pageSize
          endSlice = startSlice + this.pageSize
        }

        listItemTemp = this.getListItemByPage({
          startSlice,
          endSlice,
          listItem: this.item,
          pageNum,
          pageSize,
          pageType: this.pageType
        })
      } else {
        listItemTemp = listItem
      }

      this.stateItem = listItemTemp
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

        setTimeout(() => {
          this.loadingListData = false

          this.setListItem({
            pageSize: this.pageData.size,
            pageNum: currentPage,
            listItem: this.item
          })

          this.setPageData({
            current: currentPage
          })

          this.hideLoading()
        }, 500)
      } else {
        this.initPage({
          current: currentPage
        })
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

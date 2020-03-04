/**
 * list 混入
 */

import scrollerComp from '../module/Scroller/Scroller'
import loadingComp from '../module/Loading/Loading'
import pageComp from '../module/Page/Page'

const PAGE_TYPE_NUM = 'num'

export default {
  components: {
    loading: loadingComp,
    page: pageComp,
    scroller: scrollerComp
  },

  methods: {
    /**
     * 根据分页数据返回列表数据
     *
     * @param { Object } -
     *                    listItem - 列表的全部数据
     *                    pageNum - 分页的页数
     *                    pageSize - 每页的条数
     *                    pageType - 分页的类型
     */
    getListItemByPage({
      listItem,
      pageNum = 1,
      pageSize = 0,
      pageType = PAGE_TYPE_NUM
    }) {
      if (listItem === undefined) {
        return false
      }

      if (pageSize === 0) {
        return listItem.slice()
      }

      let startSlice = 0
      let endSlice = 0

      if (pageType === PAGE_TYPE_NUM) {
        startSlice = (pageNum - 1) * pageSize
        endSlice = startSlice + pageSize
      } else {
        endSlice = pageNum * pageSize
      }

      return listItem.slice(startSlice, endSlice)
    }
  }
}

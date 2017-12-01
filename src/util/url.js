/**
 * 解析 url 搜索参数
 *
 * @param {string} urlSearch - url 中的 search 值
 */
const search = (urlSearch) => {
  if (!urlSearch) {
    return false
  }

  if (urlSearch.indexOf('?') > -1) {
    urlSearch = urlSearch.slice(1)
  }

  const searchObj = {}

  let urlSearchArr = urlSearch.split('&')

  urlSearchArr.forEach((item) => {
    let searchItem = item.split('=')

    Object.assign(searchObj, {
      [searchItem[0]]: searchItem[1]
    })
  })

  return searchObj
}

export {
  search
}

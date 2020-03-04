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

  const urlSearchArr = urlSearch.split('&')

  urlSearchArr.forEach((item) => {
    const searchItem = item.split('=')

    Object.assign(searchObj, {
      [searchItem[0]]: searchItem[1]
    })
  })

  return searchObj
}

/**
 * 去掉 url 搜索参数里面多余的形参
 *
 * xxx.com?a=&b=2&c= => xxx.com?b=2
 *
 * @param {string} urlSearch - url 中的 search 值
 */
const fitSearch = (urlSearch) => {
  const urlSearchObj = search(urlSearch)
  const urlSearchObjKeys = Object.keys(urlSearchObj)
  const urlSearchObjValues = Object.values(urlSearchObj)
  let urlSearchArr = []

  urlSearchObjValues.forEach((item, index) => {
    if (item !== '') {
      urlSearchArr.push(`${urlSearchObjKeys[index]}=${item}`)
    }
  })

  return urlSearchArr.join('&')
}

export {
  search,
  fitSearch
}

/**
 * [description] 添cookie
 *
 * @param  {[type]} name         cookie名称
 * @param  {[type]} value        cookie值
 * @param  {[type]} expiresHours 有效时间小时
 * @return {[type]}              [description]
 */
const addCookie = (name, value, expiresHours) => {
  let cookieString = name + '=' + escape(value)

  if (expiresHours > 0) {
    let date = new Date()

    date.setTime(date.getTime + expiresHours * 3600 * 1000)
    cookieString = cookieString + '; expires=' + date.toGMTString()
  }

  document.cookie = cookieString
}

/**
 * [description] 获取设置cookie
 *
 * @param  {[type]} name [description] cookie名称
 * @return {[type]}      [description] cookie值
 *
 */
const getCookie = (name, cookies = document.cookie) => {
  return decodeURIComponent(
    cookies.replace(
      new RegExp(
        `(?:(?:^|.*;)\\s*${encodeURIComponent(name).replace(/[\-\.\+\*]/g, '\\$&')}\\s*\\=\\s*([^;]*).*$)|^.*$`
      ),
      '$1'
    )
  ) || null
}

/**
 * [description] 删除cookie
 *
 * @param  {[type]} name [description] cookie名称
 * @return {[type]}      [description]
 */
const delCookie = (name) => {
  let date = new Date()

  date.setTime(date.getTime() - 10000)
  document.cookie = name + '=v; expires=' + date.toGMTString()
}


module.exports = {
  addCookie,
  getCookie,
  delCookie
}

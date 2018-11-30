/**
 * 编码成 urlencode
 * @param {Object} data - 传输的数据
 */
function formatParam(data) {
  let arr = []

  for (let name in data) {
    arr.push(
      `${encodeURIComponent(name)}=${encodeURIComponent(data[name])}`
    )
  }

  // arr.push(('v=' + Math.random()).replace('.', ''))

  return arr.join('&')
}

/**
 * 转换 responseType 用于 xhr 的 overrideMimeType 方法
 */
function getResponseType(type) {
  switch (type) {
    case 'json':
      return 'application/json; charset = utf-8'
    case 'text':
      return 'text/plain; charset=utf-8'
    default:
      return 'text/plain; charset=utf-8'
  }
}

/**
 * 打开 xhr之后做的操作
 */
function afterOpenXHR({
  timeout,
  header,
  xhr
}) {
  const headerDataHub = Object.keys(header)

  if (headerDataHub.length > 0) {
    headerDataHub.forEach((item) => {
      xhr.setRequestHeader(item, header[item])
    })
  }

  xhr.timeout = timeout
}

/**
 *
 * @param {Object} opt - 选项参数（同 jquery）
 *                     contentType - 可选 false 和 各种浏览器的 contentType 类型
 *                     dataType - 支持 XMLHttpRequest level 2 浏览器的 responseType 属性，不支持则只能选择（json | text）
 *                     gettenData - GET 请求的请求数据
 *                     header - 头部 header 的数据
 */
const ajax = ({
  type = 'GET',
  dataType = '',
  contentType = 'application/x-www-form-urlencoded',
  url = '',
  data = {},
  gettenData = {},
  header = {},
  withCredentials = true,
  cache = false,
  async = true,
  timeout = 10000
} = {}) => {
  type = type.toUpperCase()

  const xhr = new XMLHttpRequest()
  let param = formatParam(data)

  let urlGettenParam = formatParam(gettenData)
  const timeStamp = cache ? '' : `t=${new Date().getTime()}${urlGettenParam ? `&${urlGettenParam}` : ''}`

  if (contentType) {
    if (contentType.includes('text/plain') || contentType.includes('application/json')) {
      param = JSON.stringify(data)
    }
  } else {
    param = data
  }

  return new Promise((resolve, reject) => {
    xhr.withCredentials = withCredentials

    // IE not support this state
    if (xhr.responseType !== undefined) {
      // IE 10/11 not support 'json', so change to string and JSON.parse
      if ('ActiveXObject' in window && dataType === 'json') {
        dataType = 'text'

        xhr.overrideMimeType && xhr.overrideMimeType(getResponseType(dataType))
      } else {
        try {
          xhr.responseType = dataType
        } catch (error) {
          console.warn(error)
        }
      }
    } else {
      dataType = 'text'

      xhr.overrideMimeType && xhr.overrideMimeType(getResponseType(dataType))
    }

    xhr.onreadystatechange = () => {
      //
    }

    xhr.onload = () => {
      const status = xhr.status

      if ((status >= 200 && status < 300) || xhr.status === 304) {
        let responseData = null

        if (dataType === 'json') {
          responseData = typeof xhr.response === 'string' ? JSON.parse(xhr.response) : xhr.response
        } else if (dataType === 'text' || dataType === '') {
          responseData = JSON.parse(xhr.responseText)
        } else {
          responseData = xhr.response
        }

        resolve({
          response: responseData,
          status
        })
      } else {
        resolve({
          statusText: xhr.statusText,
          status: xhr.status
        })
      }
    }

    xhr.onabort = () => {
      reject(new Error('abort'))
    }

    xhr.ontimeout = () => {
      reject(new Error('timeout'))
    }

    xhr.onerror = () => {
      reject(new Error('offline'))
    }

    if (type === 'GET') {
      xhr.open('GET', `${url}?${timeStamp}&${param}`, async)

      afterOpenXHR({
        header,
        timeout,
        xhr
      })

      xhr.send(null)
    } else if (type === 'POST') {
      xhr.open('POST', `${url}?${timeStamp}`, async)

      afterOpenXHR({
        header,
        timeout,
        xhr
      })

      if (contentType) {
        xhr.setRequestHeader('Content-Type', contentType)
      }

      xhr.send(param)
    }
  })
}

/**
 *
 * @param {String} url
 * @param {Object} data
 */
const get = (url, data) => {
  return ajax({
    url,
    data
  })
}

/**
 *
 * @param {String} url
 * @param {Object} data
 */
const post = (url, data, opt) => {
  return ajax({
    url,
    type: 'post',
    data,
    ...opt
  })
}

export default ajax

export {
  ajax,
  get,
  post
}

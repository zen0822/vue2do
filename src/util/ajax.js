/**
 *
 * @param {Object} data - 传输的数据
 */
function formatParam(data) {
  let arr = []

  for (let name in data) {
    arr.push(
      `${encodeURIComponent(name)}=${encodeURIComponent(data[name])}`
    )
  }

  arr.push(('v=' + Math.random()).replace('.', ''))

  return arr.join('&')
}

/**
 *
 * @param {Object} opt - 选项参数（同 jquery）
 */
const ajax = ({
  type = 'GET',
  dataType = 'json',
  url = '',
  data = {},
  async = true
} = {}) => {
  type = type.toUpperCase()

  const xhr = new XMLHttpRequest()
  let param = formatParam(data)

  return new Promise((resolve, reject) => {
    xhr.withCredentials = true
    xhr.responseType = dataType

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        const status = xhr.status

        if (status >= 200 && status < 300) {
          let responseData = null

          if (dataType === 'json') {
            responseData = xhr.response
          } else {
            responseData = JSON.parse(xhr.responseText)
          }

          resolve(responseData)
        } else {
          reject(new Error(xhr.status || 'Server is fail!'))
        }
      }
    }

    xhr.onerror = () => {
      reject(new Error(xhr.status || 'Server is fail!'))
    }

    if (type === 'GET') {
      xhr.open('GET', url + '?' + param, async)
      xhr.send(null)
    } else if (type === 'POST') {
      xhr.open('POST', url, async)
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
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
const post = (url, data) => {
  return ajax({
    url,
    type: 'post',
    data
  })
}

export default ajax

export {
  ajax,
  get,
  post
}

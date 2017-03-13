const router = require('../router.js');
const tip = require('components/base/pop/tip');

/**
 *
 * @param {String} url
 * @param {Object} opts -
 *                       {String} type - 'get' | 'post'
 *                       {String} dataType - default is json
 *
 */
const ajaxUtil = function (opts = {}) {
  let ajaxOptions = {
    type: 'GET'
  }

  Object.assign(ajaxOptions, opts, {
    success: (res) => {
      if (res.code === 0) {
        resolve(res);
      } else {
        reject(res);
      }
    },
    error: (err) => {
      tip('网络异常，请检查网络连接或重试');
    }
  });

  return new Promise((resolve, reject) => {
    $.ajax(ajaxOptions)
  })
}

export default ajaxUtil
const router = require('../router.js');
const tip = require('components/base/pop/tip');

/**
 * @param {String} url
 * @param {Object} opts
 *       {String} type - 'get' | 'post'
 *       {String} dataType - default is json
 *       {String} contentType:
 *
 */
const ajaxHttp = function (url, opts = {}) {
  let ajaxOptions = {
    url: url,
    type: 'GET',
    dataType: 'json',
  }

  let token = window.localStorage.getItem('TOKEN');

  if (token) {
    ajaxOptions.headers = { token: token };
  }

  Object.assign(ajaxOptions, opts);

  return new Promise((resolve, reject) => {
    $.ajax(Object.assign(ajaxOptions, {
      success: (res) => {
        if (res.code === 0) {
          resolve(res);
        } else if(res.code === 2) {
          tip('登录信息过期');
          window.localStorage.removeItem('TOKEN');
          SAAS.TOKEN = null;

          setTimeout(()=>{
            router.go({
              path: '/login'
            });
          }, 500);
        } else {
          reject(res);
        }
      },
      error: (err) => {
        tip('网络异常，请检查网络连接或重试');
      }
    }))
  })
}

module.exports = ajaxHttp;
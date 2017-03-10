const superagent = require('superagent');
const spinner = require('src/common/utils/spinner');
const router = require('../router.js');

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json;charset=utf-8'
};

const lockRequest = {};
const tip = require('components/base/pop/tip');

const ajax = (method, url, success, fail) => {
  let token = window.localStorage.getItem('TOKEN');

  if (token) {
    defaultHeaders.token = token;
  }

  if (lockRequest[url]) return;
  spinner.start();
  lockRequest[url] = true;


  return superagent[method](url)
    .set(defaultHeaders)

    .on('end', function (err, res) {
      spinner.end()
      lockRequest[url] = false
    })

    .on('response', function (res) {
      if (res.status >= 400) {
        tip('接口连接有问题');
      }

      let data = JSON.parse(res.text);

      if (data.code == 0) {
        (success instanceof Function)&&success(res);
      } else if(data.code == 2){
        tip('登录信息过期');
        window.localStorage.removeItem('TOKEN');
        SAAS.TOKEN = null;
        setTimeout(()=>{
          router.go({
            path: '/login'
          });
        }, 500);
      } else {
        res.body = res.body ? res.body : JSON.parse(res.text);
        (fail instanceof Function)&&fail(res);
      }
    });
}

module.exports = ajax;

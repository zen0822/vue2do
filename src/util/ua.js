/**
 * 判断 js 宿主，客户端代理的方法
 * 也就是判断浏览器和手机型号了
 */

function checkByUserAgent(userAgent) {
  return userAgent.test(navigator.userAgent.toLowerCase())
}

function isIE() {
  return !!window.ActiveXObject || 'ActiveXObject' in window
}

function isWebkit() {
  return checkByUserAgent(/webkit/)
}

function isSafari() {
  return !isChrome() && !isOpera() && checkByUserAgent(/safari/)
}

function isOpera() {
  return checkByUserAgent(/opr/)
}

function isChrome() {
  return !isOpera() && checkByUserAgent(/webkit/)
}

function isFirefox() {
  return checkByUserAgent(/firefox/)
}

export default function () {

}

export {
  isIE,
  isWebkit,
  isSafari,
  isOpera,
  isChrome,
  isFirefox
}

const { dataType } = require('./data');

/**
 * to judge whether variable is string
 *
 * @param string
 * @return {Boolean} - whether variable is Obarrayject .
 */
const isString = (str) => {
  return dataType(str) === 'string';
}

/**
 * 删除左右两端的换行
 *
 * @param {String}
 * @return {String}
 *
 */
const trimEnter = (str) => {
  return str.replace(/(^\n*)|(\n*$)/g,'');
}

module.exports = {
  isString,
  trimEnter
}
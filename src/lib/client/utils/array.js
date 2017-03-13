const { dataType } = require('./data');

/**
 * to judge whether variable is array
 *
 * @param array
 * @return {Boolean} - whether variable is Obarrayject .
 */
const isArray = (arr) => {
  return dataType(arr) === 'array';
}

/**
 * to judge whether array is empty
 *
 * @param array
 * @return {Boolean} - whether array is empty.
 */
const isEmpty = (arr) => {
  return arr.length === 0;
}

module.exports = {
  isArray,
  isEmpty,
}
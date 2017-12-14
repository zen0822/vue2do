import Vue from 'vue'

const stringUtil = require('src/common/utils/string')

/**
 * 根据组件的主题转换成主题的 class
 *
 * @param {String}
 * @return {String}
 *
 * @example 'primary' -> 'theme-primary'
 */
Vue.filter('themeClass', (value) => {
  return value ? `theme-${value}` : ''
})


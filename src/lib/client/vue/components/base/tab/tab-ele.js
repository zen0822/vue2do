/**
 * tab-ele - 切换组件的个体
 *
 */
const Vue = require('vue');

module.exports = Vue.component('tab-ele', {
  template: `
    <div>
      <slot></slot>
    </div>
  `
});
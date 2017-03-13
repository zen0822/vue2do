/**
 * switching-ele - 切换组件的个体
 *
 */
const Vue = require('vue');

module.exports = Vue.component('switching-ele', {
  template: `
    <div class="switching-content">
      <slot></slot>
    </div>
  `
});
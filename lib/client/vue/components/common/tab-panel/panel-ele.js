const Vue = require('vue');

module.exports = Vue.component('panel-ele', {
  template: `
    <div>
      <slot></slot>
    </div>
  `
});
const Vue = require('vue');

module.exports = Vue.component('drop-ele', {
  template: `
    <div class="drop-ele">
      <slot></slot>
    </div>
  `
});
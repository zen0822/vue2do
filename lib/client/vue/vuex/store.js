const Vue = require('vue');
const Vuex = require('vuex');

const common = require('./module/common');

Vue.use(Vuex);

module.exports = new Vuex.Store({
  modules: {
    common
  }
})
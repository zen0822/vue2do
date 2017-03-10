const Vue = require('vue');
const store = require('src/common/vuex/store');

require('./bread-crumb.scss');
const template = require('./bread-crumb.tpl');

const baseMixin = require('components/mixin/base');
const { setBreadCrumb } = require('src/common/vuex/action/common');

const BreadCrumb = {
  template,

  mixins: [baseMixin],

  vuex: {
    getters: {
      breadCrumbData: (state) =>{
        return state.common.breadCrumb
      }
    },
    actions: {
      setBreadCrumb
    }
  },

  data() {
  	return {
  		breadCrumbArr: []
  	}
  },

  store,

  methods: {
    /**
     * 处理前两级🍞
     *
     * @param { Array }
     */
    setPartBreadCrumb(breadCrumbArr) {
      // console.log(JSON.stringify(breadCrumbArr))
      this.setBreadCrumb(breadCrumbArr);
      this._setBreadByRouter();
    },

    /**
     * 根据路由处理 2 级之后的面包屑
     */
    _setBreadByRouter(){
      this.breadCrumbArr = this.breadCrumbData;

      if(!this.$route.matched[3] || this.$route.matched[3].handler.path == '/'){
    		return false;
    	}
 			if (COMMON.componentHub.breadCrumb.length > 0) {
 				this.breadCrumbArr = this.breadCrumbArr.concat(COMMON.componentHub.breadCrumb);
 			} else {
        if (this.$route.matched[3].handler.title) {
          this.breadCrumbArr && this.breadCrumbArr.push({
            name: this.$route.matched[3].handler.title,
            router: ''
          });
        }
      }

      this.setBreadCrumb(this.breadCrumbArr);
    }
  }
};

module.exports = Vue.component('bread-crumb', BreadCrumb);
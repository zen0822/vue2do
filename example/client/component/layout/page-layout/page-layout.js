require('./page-layout.scss');
const template = require('./page-layout.tpl');
const { apiPath } = require('appService/api');
const tip = require('components/base/pop/tip');
const ajaxHttp = require('appUtil/ajaxHttp');
const { setBreadCrumb } = require('src/common/vuex/action/common');
const store = require('appVuex/store');
require('components/common/bread-crumb/bread-crumb');
const asideLayout = require('../aside-layout/aside-layout');

module.exports = {
	name: "page-layout",
  template,
  data(){
  	return {
  		menus: []
  	}
  },
  route: {
    data(transition) {
      COMMON.componentHub.breadCrumb = [];
      this.loadMenu(transition);
      this.$broadcast('initScroll');
      transition.next();
    },
    waitForData: true
  },
  methods: {
  	loadMenu(transition) {
      ajaxHttp(apiPath.menu.api, {})
      .then((res)=>{
        this.menus = res.data;
        // debugger;
        this.$refs.breadCrumb.setPartBreadCrumb(this._initBreadCrumbData(res.data, transition.to));
      })
      .catch((res)=> {
        tip(res.message);
      });
    },

     _initBreadCrumbData(data, to){
      let breadCrumbs = [];
      let indexs = [];
      let path = to.path;

      let search = function(list, index) {
        for(let i = 0, length = list.length; i < length; i++) {
          let e = list[i];
          let link = e.url;
          let sub = e.sub;

          indexs[index] = i;
          breadCrumbs[index] = {
            name: e.description,
            router: link
          };
          
          if(link && path.includes(link)) {
            breadCrumbs[index] = {
              name: e.description,
              router: link
            }

            if (!e.sub) {
              return true;
            } else {
              if(sub && sub.length !== 0 && search(sub, index + 1)) {
                 return true;
              }
            }
            
          }

          
          if(sub && sub.length !== 0 && search(sub, index + 1)) {
            return true;
          }
        }

        return false;
      };

      if(search(data, 0)) {
       return breadCrumbs;
      }

      return false;
    }
  },
  components: {
    "aside-layout": asideLayout
  },

  vuex: {
    getters: {
      
    },
    actions: {
      setBreadCrumb
    }
  },

  store
}
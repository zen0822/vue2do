const Vue = require('vue');
const listTree = require('components/base/list-tree/list-tree');

const { selectTree: selectTreeHub } = require('components/config/componentHub.json');

require('components/base/icon/icon');

const template = require('./select-tree.tpl');
require('./select-tree.scss');

const selectTree = {
  template,
  name:'selectTree',
  props:{
    treeData:Object,
  },
  data(){
    return{
      open:false,
      txt:'请选择运营商',
    }
  },
  methods:{
    _keyup(){

    }
  },
  events:{
    listTree(val){
      if(val.text){
        this.$dispatch('selectTree',val);
        this.txt = val.text;
        this.open = false;
      }
    }
  },
  components: {
    listTree
  },
  ready(){
    COMMON.componentHub[selectTreeHub].push(this);
  }
}

module.exports = Vue.component('select-tree', selectTree);

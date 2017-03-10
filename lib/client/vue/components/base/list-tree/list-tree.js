const Vue = require('vue');

require('./list-tree.scss');
const template = require('./list-tree.tpl');

const item = require('components/base/tree-item/tree-item');

const listTree = {
  template,
  props:{
    listData: Object,
  },
  data() {
    return {
      itemId: ''
    }
  },
  events:{
    itemId(val){
      if(val){
        this.$dispatch('listTree',val);
      }
    }
  },
  components: {
    item
  }
}
module.exports = listTree;
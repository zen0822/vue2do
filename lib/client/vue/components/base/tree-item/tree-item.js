const Vue = require('vue');
const template = require('./tree-item.tpl');

const treeItem = {
  name: 'item',
  template,
  props: {
    model: Object
  },
  ready(){
  },
  data() {
    return {
      open: true
    }
  },
  computed: {
    isFolder() {
      return this.model.childs &&
        this.model.childs.length
    }
  },
  methods: {
    getModelId(item){
      let obj = {
        text:item.shortName,
        value:item.commId
      }
      this.$dispatch('itemId',obj);
    },
    toggle() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    }
  }
}
module.exports = treeItem;
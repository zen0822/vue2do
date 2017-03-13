/**
 * drop-option -- 作为 drop-menu 的 option 的局部组件
 *
 * @props optionItems - 下拉框option数据
 * @props valName - 下拉框 optionItems 的 value 值的 key name
 * @props txtName - 下拉框 optionItems 的 text 值的 key name
 *
 * @events change - checkbox的option值改变
 *
 */

const Vue = require('vue');
const { dropMenu } = require('components/config/event.json');

require('components/base/icon/icon');
var template = require('./drop-option.tpl');

const dropOption = {
  name: 'DropOption',

  template,

  props: {
    optionItems: {
      type: Array,
      default: () => []
    },
    valName: {
      type: String,
      default: 'value'
    },

    txtName: {
      type: String,
      default: 'text'
    }
  },

  methods: {
    /**
     * @param {Object} 是否有子下拉框值
     * @return {Boolean}
     */
    subOptionItem(item) {
      return item.optionItems && item.optionItems.length !== 0;
    },

    /**
     * @param {Object} 子下拉框值
     * @return {Function}
     */
    selectItem(item, index) {
      if (item.classify) {
        return false
      }

      return this.$dispatch(dropMenu.dropItem.change, item[this.valName], item[this.txtName], {
        index: index
      });
    },
  }
};

module.exports = dropOption;

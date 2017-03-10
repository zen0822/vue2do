/**
 * drop-menu 组件
 *
 * @props theme - 主题
 * @props optionItems - 下拉框的option数据
 * @props classifyOptionItems - 分类下拉框的数据
 * @props queryName - 搜索参数名
 * @props defaultText - 默认显示的文字
 * @props value - 默认第一个显示的值
 * @props grayValue - 默认加灰色的选项值
 * @props remote - 传入字符串 为空则不取远程数据 否则为取远程数据并且作为url
 * @props processDropItems - 处理下拉框数据的钩子
 * @props ajaxType - post 或 get
 * @props multiple - 是为多选
 * @props queryOpt - 搜索参数的值
 * @props store - 储存此下拉框的信息 Object 类型
 * @props max - 多选下拉框最多选择几个
 * @props min - 多选下拉框至少选择几个
 * @props required - 必须选择下拉框的值
 * @props errorMessage - 没选的时候显示的错误信息
 * @props valName - 指定读取下拉框 optionItems 的 value 值的 key 的名字
 * @props txtName - 指定读取 下拉框 optionItems 的 text 值的 key 的名字
 * @porps searchFilter - 开启搜索过滤
 * @porps classify - 有值（数组类型）就开启标题下拉框 option 分类模式
 * @props readOnly - 只读
 * @props selectAllFunction - 全选 checkbox 的选项
 * @props selectAllOptionTxt - 全选 checkbox 的选项的名字
 *
 * @events change - dropMenu的值改变
 * @events click - 点击dropMenu的已选框
 */

const Vue = require('vue');

const tip = require('components/base/pop/tip');

const { dropMenu: dropMenuEvent } = require('components/config/event.json');
const { dropMenu: dropMenuHub } = require('components/config/componentHub.json');
const arrayUtil = require('src/common/utils/array');
const dataUtil = require('src/common/utils/data');
require('./drop-option');
require('./drop-ele');
require('components/base/icon/icon');
require('components/base/checkbox/checkbox');
require('components/base/scroller/scroller');

require('./drop-menu.scss');
const dropOption = require('./drop-option');
const template = require('./drop-menu.tpl');

const baseMixin = require('components/mixin/base');
const formMixin = require('components/mixin/form');

//下拉框的border宽度
const DROP_MENU_BORDER_WIDTH = 1;
const SEARCH_KEY_UP_INTERVAL = 500

const DropMenu = {
  template,

  mixins: [baseMixin, formMixin],

  props: {
    theme: {
      type: String,
      default: "primary"
    },

    defaultText: {
      type: String,
      default: "请选择"
    },

    optionItems: {
      type: Array,
      default: () => []
    },

    queryName: {
      type: String,
      default: ""
    },

    value: [Number, Array],

    remote: {
      type: String,
      default: ""
    },

    ajaxType: {
      type: String,
      default: "get"
    },

    queryOpt: {
      type: Object
    },

    processDropItems: Function,

    multiple: {
      type: Boolean,
      default: false
    },

    store: Object,

    max: {
      type: Number,
      default: 0
    },

    min: {
      type: Number,
      default: 0
    },

    grayValue: {
      type: [Number, String],
      default: -1
    },

    required: {
      type: Boolean,
      default: false
    },

    errorMessage: {
      type: String,
      default: ''
    },

    valName: {
      type: String,
      default: 'value'
    },

    txtName: {
      type: String,
      default: 'text'
    },

    searchFilter: {
      type: Boolean,
      default: false
    },

    classify: Array,

    readOnly: {
      type: Boolean,
      default: false
    },

    classifyOptionItems: Object,

    selectAllFunction: {
      type: Boolean,
      default: false
    },

    selectAllOptionTxt: {
      type: String,
      default: '全选'
    }
  },

  data() {
    return {
      selectedItems: [],
      hideMenuItem: true,
      text: '',
      verified: true,
      dropMenuItemStyle: {},
      hasSlotOption: false,
      currentIndex: 0,
      unwatchOptionItems: {},
      searchKeyuped: false,
      // 是否显示搜索 optionItem
      searchOptionDisplay: false,
      // 搜索出来的 option
      searchOptionItems: {},
      // 暂存正真的 optionItems
      optionItemCopy: {},
      // 是否全选多选下拉框的标记
      selectAllOption: false
    }
  },

  components: {
    'drop-option': dropOption
  },

  methods: {
    //初始化下拉 optionItems
    _initOptionItem() {
      if (this.remote) {
        return this.fetch(this._initDropMenu);
      } else if (this.classifyOptionItems) {
        this._processDropItems(this.classifyOptionItems)._initDropMenu()
      } else {
        return this._ininDropMenuSlotItems()._initDropMenu();
      }
    },

    //初始化下拉菜单
    _initDropMenu() {
      return this._initValue();
    },

    //调整多选下拉框的选择值的样式
    _adjustDropMenuItemStyle(cb) {
      var dropMenuHeight = $(this.$el).outerHeight();
      var dropMenuWidth = $(this.$el).outerWidth();
      var top = dropMenuHeight - DROP_MENU_BORDER_WIDTH * 2;
      var width = dropMenuWidth;

      this.$set('dropMenuItemStyle', {
        top: `${top}px`,
        width: `${width}px`
      });

      return cb && cb()
    },

    /**
     * 初始化下拉菜单 slot 的 option
     *
     * @param {Array} - 下拉框的值
     */
    _ininDropMenuSlotItems() {

      var $el = $(this.$el);
      var optionItems = [];
      var $dropItemSlot = $el.find('.drop-menu-items-slot');

      // slot 有数据就处理
      if ($dropItemSlot.children().length !== 0) {
        this.hasSlotOption = true;

        $dropItemSlot.find('.drop-ele').each((index, el) => {
          var $el = $(el);

          optionItems.push({
            value: parseInt($el.attr('value'), 10),
            text: $el.text().trim()
          });
        });

        $dropItemSlot.remove();

        this.$set('optionItems', optionItems)
      }

      return this;
    },

    /**
     * 处理下拉框的 text 和 value
     */
    _dropMenuTxtVal({value, text, replace = false}) {
      if (!this.multiple || replace) {
        !this._isUndefined(value) && this.$set('value', value);
        !this._isUndefined(text) && this.$set('text', text);

        return this;
      }

      if (this.multiple) {
        if (this._isArray(value) || this._isArray(text)) {
          !this._isUndefined(value) && this.value.concat(value);
          !this._isUndefined(text) && this.text.concat(text);
        } else {
          !this._isUndefined(value) && this.value.push(value);
          !this._isUndefined(text) && this.text.push(text);
        }
      }
    },

    //初始化下拉菜单的值
    _initValue() {
      if (this.multiple) {
        this._initMultipleSelect();
      } else {
        this._initSingleSelect();
      }
    },

    //初始化多选下拉菜单
    _initMultipleSelect() {
      if (!this._isArray(this.optionItems)) {
        return this;
      }

      if (!Array.isArray(this.value)) {
        console.warn('多选下拉框的 "this.value" 必须为数组')
        this.value = []

        return false
      }

      this.text = [];

      this.value.forEach((ele, index) => {

        this.optionItems.every((item, itemIndex) => {
          if (item[this.valName] === ele) {
            this._dropMenuTxtVal({
              text: item[this.txtName]
            });

            return false;
          }

          return true;
        });

      })

      return this;
    },

    //初始化单选下拉菜单
    _initSingleSelect(val, txt) {
      if (!this._isArray(this.optionItems)) {
        return this;
      }

      if (this.value || this.value === 0 || this.value === '0') {
        this.optionItems.every((ele, index) => {
          if (ele[this.valName] == this.value) {
            this._dropMenuTxtVal({
              value: ele[this.valName],
              text: ele[this.txtName]
            })
            return false;
          }

          return true;
        });

        return this;
      }

      if (typeof this.optionItems[0] !== 'undefined') {
        this._dropMenuTxtVal({
          value: this.optionItems[0][this.valName],
          text: this.optionItems[0][this.txtName]
        })
      }

      return this;
    },

    // 派送下拉框的 value 的改变事件
    _dispatchChange() {
      this.$dispatch(dropMenuEvent.menu.change, {
        dispatcher: this,
        value: this.value,
        text: this.text,
        optionItem: this.optionItems[this.currentIndex],
        queryName: this.queryName
      });
    },

    /**
     * 处理下拉框值的钩子
     * @return {Object} this - 组件
     */
    _processDropItems(optionItems) {
      if (this.classify && optionItems.all === undefined) {
        return this
      }

      if (this.processDropItems) {
        this.unwatchOptionItems();
        this.optionItems = this.processDropItems.call(null, optionItems, this);
        this._watchOptionItems();

        return this;
      }

      if (this.classify) {
        var arrTemp = []

        this.classify.forEach((item) => {
          arrTemp.push(Object.assign({
            [this.valName]: item.value,
            [this.txtName]: item.text,
            classify: true
          }))

          arrTemp = arrTemp.concat(optionItems[item.value])
        })

        arrTemp.push({
          [this.valName]: 'all',
          [this.txtName]: '全部话题',
          classify: true
        })
        arrTemp = arrTemp.concat(optionItems.all)

        this.optionItems = arrTemp
        this.optionItemCopy = optionItems.all

        this.optionItems.unshift({
          text: '请选择',
          value: -1
        })
      } else {
        this.optionItems = optionItems;
      }

      return this;
    },

    _isArray(arr) {
      return arrayUtil.isArray(arr);
    },

    _isUndefined(obj) {
      return dataUtil.dataType(obj) === 'undefined';
    },

    /**
     * 多选下拉框的 value 是否已存在
     *
     * @param {String, Number} - 多选下拉框的值
     */
    _isExistedVal(val) {
      if (!this.multiple) {
        return false
      }

      var isExisted = false;
      var existItem = {};

      this.value.every((selectedVal, index) => {
        if (val === selectedVal) {
          isExisted = true;
          existItem = {
            value: selectedVal,
            index: index
          }

          return false;
        }

        return true;
      });

      if (isExisted) {
        return existItem
      } else {
        return false
      }
    },

    /**
     * 多选下拉框的复选框赋值情况
     *
     * @param {String, Number} - 多选下拉框的值
     */
    _checkboxVal(val) {
      if (this._isExistedVal(val)) {
        return [-1]
      }

      return []
    },

    /**
     * 移除 多选下拉框 已选的值
     *
     * @param {String, Number} - 多选下拉框的值
     */
    _removeMultiSelected(val) {
      var self = this;

      if (this.min !== 0 && this.value.length === this.min) {
        tip(`至少需选择 ${this.min} 项！`)

        const valTmp = this.value
        this.value = []

        return this.value = valTmp
      }

      var selectedItem = this._isExistedVal(val)

      if (!selectedItem) {
        return false
      }

      self.value.splice(selectedItem.index, 1);
      self.text.splice(selectedItem.index, 1);
    },

    // 观察 optionItems
    _watchOptionItems() {
      this.unwatchOptionItems = this.$watch('optionItems', function (val, oldVal) {
        if (!this.hasSlotOption) {
          this._initDropMenu();
          this._dispatchChange()
        }
      });
    },

    /**
     * 监控 input 输入下拉框过滤的关键字的回调函数
     */
    _searchKeyup(evt) {
      var keyWord = evt.target.value

      if (!keyWord && keyWord !== 0) {
        this.searchOptionDisplay = false

        return false;
      }

      this.searchKeyuped = true;

      setTimeout(() => {
        this.searchKeyuped = false;
      }, SEARCH_KEY_UP_INTERVAL);

      this.searchOptionDisplay = true

      var realOptionItems = this.optionItems

      if (this.classify) {
        realOptionItems = this.optionItemCopy
      }

      this.searchOptionItems = realOptionItems.filter(item => {
        return item[this.txtName].indexOf(keyWord) > -1;
      });

      if (this.searchOptionItems.length === 0) {
        this.searchOptionItems.push({
          [this.valName]: -2,
          [this.txtName]: '查无此数据',
          classify: true
        })
      }
    },

    /**
     * 验证数据格式是否正确
     * 现在只有 是否必选
     *
     * @return {Object} - this - 组件
     */
    verify() {
      this.dangerTip = `请选择${this.errorMessage}${this.errorMessage ? '的' : ''}下拉框!`;

      if (this.multiple) {
        return this.verified = this.value.length < this.min ? false : true;
      } else if (this.required) {
        return this.verified = this.value === -1 ? false : true;
      }

      return this.verified
    },

    /**
     * 点击下拉框的值
     * @return {Object} this - 组件
     */
    select() {
      COMMON.componentHub[dropMenuHub].forEach((val, index) => {
        if (!Object.is(this, val)) {
          val.hideMenuItem = true;
        }
      });

      this._adjustDropMenuItemStyle(() => {
        this.hideMenuItem = !this.hideMenuItem;
      });

      return this;
    },

    subOptionItem(item) {
      return item.optionItems && item.optionItems.length !== 0;
    },

    /**
     * 收起下拉框
     * @return {Object} this - 组件
     */
    fold() {
      this.hideMenuItem = true;
      return this;
    },

    /**
     * 展開下拉框
     * @return {Object} this - 组件
     */
    spread() {
      this.hideMenuItem = false;
      return this;
    },

    /**
     * 获取数据
     * @return {Object} this - 组件
     */
    fetch(cb) {
      var _self = this;

      $.ajax({
        data: this.queryOpt,
        type: this.ajaxType,
        url: this.remote,
        success(rtn) {
          if (rtn.code === 0) {
            _self._processDropItems(rtn.data);

            cb && cb();
          } else {
            console.warn('下拉框获取远程数据失败');
          }
        }
      });
    },

    /**
     * 全选多选下拉框
     *
     * @return {Object} - this - 组件
     */
    selectAll() {
      if (!this.selectAllVal) {
        let value = []

        this.optionItems.forEach((item) => {
          value.push(item[this.valName])
        })

        this.value = value
        this.selectAllVal = value
      }

      if (this.selectAllOption) {
        this.value = []
      } else {
        this.value = this.selectAllVal
      }

      this.selectAllOption = !this.selectAllOption
    }
  },

  events: {

    [dropMenuEvent.dropItem.change](value, text, opt) {
      this.currentIndex = opt.index;

      var selectedItem = this._isExistedVal(value)

      if (this.multiple) {
        if (!selectedItem) {
          if (this.max !== 0 && this.value.length === this.max) {
            return this;
          }

          this._dropMenuTxtVal({
            text: text,
            value: value
          })
        } else {
          this._removeMultiSelected(value)
        }
      } else {
        this._dropMenuTxtVal({
          text: text,
          value: value
        })

        this.fold()
      }

      return false;
    }
  },

  watch: {
    'value'(val, oldVal) {
      this._initValue();

      this.$nextTick(() => {
        this._adjustDropMenuItemStyle()
      })

      // 因为 watch 是在组件生命周期 ready 后才触发的
      // 但是在 ready 之前做的值改变 vue 会留在后面触发 watch
      // 所以需要做处理 第一触发变化的值 不触发值改变的变化
      if (this.multiple || (!this.multiple && typeof oldVal !== 'undefined')) {
        this._dispatchChange();
      }
    },
    'classifyOptionItems'(val) {
      this._processDropItems(val)
      this._initDropMenu()
    }
  },

  created() {
    if (this.multiple) {
      if (this.value) {
        var arrTemp = this.value;

        this._dropMenuTxtVal({
          value: arrTemp,
          text: [],
          replace: true
        });
      } else {
        this._dropMenuTxtVal({
          value: [],
          text: [],
          replace: true
        });
      }
    }
  },

  compiled() {
    this._initOptionItem();
    this._watchOptionItems();
  },

  ready() {
    COMMON.componentHub[dropMenuHub].push(this);
  }
}

module.exports = Vue.component('drop-menu', DropMenu);
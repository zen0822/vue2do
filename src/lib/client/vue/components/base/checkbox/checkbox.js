/*
 * checkbox - 多选框组件
 *
 * @props theme - 主题
 * @props value - 初始化时选中的值，默认为第一项， 是checkbox 則為數組
 * @props inputName - input 的 name
 * @props type - input 的 type(radio | checkbox)
 * @props checkboxItems - 复选框数据
 * @props readOnly - 只读
 * @props required - 是否必选
 * @props queryName - 参数名
 * @props errorMessage - checkbox 没选的时候显示的错误信息
 * @props compileVm - 动态编译的vm
 * @props beforeSelect - 选择之前的回调函数
 * @props success - 选择成功的回调函数
 * @props valName - 指定读取 checkboxItems 的 value 值的 key 的名字
 * @props txtName - 指定读取 checkboxItems 的 text 值的 key 的名字
 * @props remote - 不为空则是远程下载的 url 地址，并且数据是从远程下载
 * @props selectAllFunction - 全选 checkbox 的选项
 *
 * @events change - checkbox值改变
 */

const Vue = require('vue');
require('components/base/icon/icon');
require('./check-ele');

require('./checkbox.scss');
const template = require('./checkbox.tpl');

const { checkbox: checkboxEvent } = require('components/config/event.json');
const baseMixin = require('components/mixin/base');
const formMixin = require('components/mixin/form');
const arrayUtil = require('src/common/utils/array');

const TYPE_RADIO = 'radio';
const TYPE_CHECKBOX = 'checkbox';

var CheckboxGroup = Vue.extend({
  name: "Checkbox",
  mixins: [baseMixin, formMixin],
  template,
  props: {
    theme: {
      type: String,
      default: "primary"
    },

    checkboxItems: {
      type: Array,
      default: () => []
    },

    inputName: {
      type: String,
      default: ""
    },

    type: {
      type: String,
      default: TYPE_RADIO
    },

    readOnly: {
      type: Boolean,
      default: false
    },

    queryName: {
      type: String,
      default: ""
    },

    errorMessage: {
      type: String,
      default: ""
    },

    required: {
      type: Boolean,
      default: false
    },

    value: [Number, Array],

    compileVm: Object,

    beforeSelect: Function,

    success: Function,

    valName: {
      type: String,
      default: 'value'
    },

    txtName: {
      type: String,
      default: 'text'
    },

    remote: String,

    selectAllFunction: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentIndex: 0,
      text: "",
      verified: true,
      dangerTip: "",
      slotItems: [],
      oldValue: [],
      selectAllCheckbox: false
    }
  },
  methods: {
    /**
     * 派送checkbox的change事件
     *
     * @return {Function}
     **/
    _dispatchChange() {
      return this.$dispatch(checkboxEvent.change, {
        value: this.value,
        text: this.text,
        queryName: this.queryName,
        dispatcher: this
      });
    },

    /**
     * 初始化checkbox
     *
     * @return {Function}
     **/
    _initCheckbox() {
      if (this.isCheckbox) {
        if (!arrayUtil.isArray(this.value)) {
          this.text = [];
          this.value = [];
          this.oldValue = [];
        }

        if (this.selectAllFunction) {
          this.selectAllCheckbox = this.value.length === this.checkboxItems.length ? true : false
        }

        this.setText();
        this.verified = this.required && this.value.length === 0 ? false : true;
      } else {
        if (!this.value && this.value !== 0) {
          this.value = undefined;
          this.oldValue = undefined;
        } else {
          this.setCurrentIndex();
          this.setText();
        }

        if (this.required) {
          this.verified = typeof this.value === 'undefined' ? false : true;
        }
      }
    },

    /**
     * 初始化checkboxItems值
     *
     * @return {Function, Object}
     **/
    _initCheckboxItems() {
      if (!this._slotContents && !(!!this.$options._content && this.$options._content.innerHTML)) {
        return false
      }

      var $checkboxSlot = {};
      var optionContent = this.$options._content ? this.$options._content.innerHTML : '';
      var $checkboxItemSlot = $(this.$el).find('.checkbox-items-slot')

      if (optionContent) {
        $checkboxSlot = $checkboxItemSlot.html(optionContent);
      } else {
        console.warn('vm.$options._content 取不到值, 需要修复，没值情况下的问题')
        $checkboxSlot = $checkboxItemSlot.html(this._slotContents.default);
      }

      var $checkEles = $checkboxSlot.find('check-ele');

      if ($checkEles.length === 0) {
        return this;
      }

      var items = [];
      var checkboxItemsEmpty = arrayUtil.isEmpty(this.checkboxItems);

      $checkEles.each((index, el) => {
        var $el = $(el);
        var val = $el.attr('value');
        var txt = '';

        val = isNaN(val) ? val : Number(val);

        if ($el[0].hasAttribute('text')) {
          txt = $el.attr('text').trim();

          // 不让生成 html 有 text 节点
          this.slotItems.push($el.html().trim())
        } else {
          txt = $el.text().trim();
        }

        if (checkboxItemsEmpty) {
          items.push({
            value: val,
            text: txt
          });
        }
      });

      $checkboxItemSlot.html('')
      checkboxItemsEmpty && this.$set('checkboxItems', items);

      this.$nextTick(() => {
        this._initCheckboxSlot();
      })

      return this;
    },

    /**
     * 初始化checkboxItems 里面的 slot
     */
    _initCheckboxSlot() {
      if (this.slotItems.length === 0) {
        return false;
      }

      if (typeof this.compileVm === 'undefined') {
        this.compileVm = this.$parent;
      }

      $(this.$el).find('.checkbox-item-ul .item').each((index, el) => {
        if (this.slotItems[index]) {
          var $el = $(el);
          var dom = document.createElement('div');

          dom.innerHTML = this.slotItems[index];
          this.compileVm.$compile(dom);
          el.appendChild(dom.firstChild);
        }
      });
    },

    /**
     * 点击 checkbox
     */
    _click(evt, val) {
      if (this.beforeSelect && this.beforeSelect.call(null, this) === false) {
        return false
      }

      if (this.isCheckbox) {
        this.oldValue = []

        this.value.forEach((item) => {
          this.oldValue.push(item)
        })

        this._changeCheckbox(val)
      } else {
        this.oldValue = this.value

        this.value = val
      }

      this._dispatchChange();

      this.$nextTick(() => {
        this.success && this.success.call(null, this)
      })
    },

    /**
     * 删除或者增加复选 checkbox 的 value 值
     *
     * @param {String, Number} - checkbox 的值
     */
    _changeCheckbox(val) {
      var hasDelflag = false

      this.value.every((item, index) => {
        if (val === item) {
          hasDelflag = true
          this.value.splice(index, 1)

          return false
        }

        return true
      })

      if (hasDelflag) {
        return this
      }

      return this.value.push(val)
    },

    /**
     * checkbox的icon的样式
     *
     * @param { String } - checkbox当前值
     * @return { Function, Object }
     **/
    _iconName(val) {
      if (this.isRadio) {
        return this.value === val ? 'dot-circle-o' : 'circle-thin';
      } else if (this.isCheckbox && Array.isArray(this.value)) {
        return this.value.indexOf(val) !== -1 ? 'check-square' : 'square-o';
      }
    },

    /**
     * 获取 checkboxItems 数据
     * @return {Object} this - 组件
     */
    fetch(cb) {
      var _self = this;

      $.ajax({
        type: typeof this.ajaxType === 'undefined' ? 'get' : this.ajaxType,
        url: this.remote,
        success(rtn) {
          if (rtn.code === 0) {
            cb && cb.call(null, rtn);
          } else {
            console.warn('复 / 单选框获取远程数据失败');
          }
        }
      });
    },

    /**
     * 设置checkbox的text值
     *
     * @return {Function, String}
     **/
    setText() {
      if (this.isRadio) {
        this.text = this.checkboxItems[this.currentIndex][this.txtName];

        return this;
      } else {
        if (!arrayUtil.isArray(this.value)) {
          return false;
        }

        this.text = [];

        return this.value.forEach((item) => {
          this.checkboxItems.forEach((ele) => {
            if (item === ele[this.valName]) {
              this.text.push(item);
            }
          });
        });
      }
    },

    /**
     * 设置 currentIndex
     *
     * @return {Function, Object}
     **/
    setCurrentIndex() {
      if (this.isRadio) {
        return this.checkboxItems.forEach((item, index) => {
          if (item[this.valName] === this.value) {
            this.currentIndex = index;
          }
        });
      }

      return this;
    },

    /**
     * 验证数据格式
     *
     * @return {Object} - this - 组件
     */
    verify() {
      this.dangerTip = `请选择${this.errorMessage}${this.errorMessage ? '的' : ''}${this.isRadio ? '单选框' : '复选框'}!`;

      return this.verified;
    },

    /**
     * 验证数据格式并且弹出错误
     *
     * @return {Object} - this - 组件
     */
    validate() {
      this.verify();

      if (!this.verified) {
        tip(this.dangerTip);

        return false;
      }

      return this;
    },

    /**
     * 全选复选框
     *
     * @return {Object} - this - 组件
     */
    selectAll() {
      if (!this.selectAllVal) {
        let value = []

        this.checkboxItems.forEach((item) => {
          value.push(item[this.valName])
        })

        this.value = value
        this.selectAllVal = value
      }

      if (this.selectAllCheckbox) {
        this.value = []
      } else {
        this.value = this.selectAllVal
      }

      this.selectAllCheckbox = !this.selectAllCheckbox
    }
  },

  computed: {
    isCheckbox() {
      return this.type === TYPE_CHECKBOX;
    },

    isRadio() {
      return this.type === TYPE_RADIO;
    }
  },

  watch: {
    'value'(val, oldVal) {
      this._initCheckbox();
    },

    checkboxItems() {
      this._initCheckbox()
    }
  },

  beforeCompile() {
    if (this.remote) {
      this.fetch((rtn) => {
        this.checkboxItems = rtn.data

        this._initCheckboxItems()
        this._initCheckbox();
      })
    } else {
      this._initCheckboxItems()
      this._initCheckbox();
    }
  }
});

module.exports = Vue.component('checkbox', CheckboxGroup);
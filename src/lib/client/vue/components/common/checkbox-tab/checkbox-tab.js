const Vue = require('vue');
const template = require('./checkbox-tab.tpl');
require('./checkbox-tab.scss');
require('components/base/input-box/input-box');
require('components/common/search-tool/search-tool');
const {inputBox: inputEvent } = require('components/config/event.json');


const CheckboxTab = {
	name: 'checkbox-tab',
	template,
	props: {
		theme: {
			type: String,
			default: ''
		},
		leftTitle: String,
		rightTitle: String,
		placeholder: String,
		leftCheckData: {//左侧选择框数据
			type: [Object],
			default() {
				return {
					selected: [],
					list: []
				};
			}
		},
		initCheck: {//左侧初始选中值
			type: [Array],
			default() {
				return []
			}
		}
	},
	data() {
		return {
			rightCheckData: {
				selected: [],
				list: []
			},
			backData: null
		}
	},
	methods: {
		search(val) {
			if (!this.backData) {
        this.backData = JSON.parse(JSON.stringify(this.datas));
      }

      if (val.length == 0) {
      	this.datas.list = this.backData.list;
        return false;
      }

      let arr = [];
      let leftData = JSON.parse(JSON.stringify(this.backData));

      leftData.list.forEach((item)=>{
      	if (item.text&&item.text.indexOf(val) > -1) {
      		arr.push(item);
      	}
      })
      
      this.datas.list = arr;
		},

		_getSelected(datas) {
			let arr = [];
			let list = datas.list;
			let selected = datas.selected;

			for (let i = 0; i < list.length; i++) {
				let tmp = list[i];
				if (selected.indexOf(tmp['value']) > -1) {
					arr.push(tmp);
				}
			}

			return arr;
		},


		moveRight() {
			let arr = this._getSelected(this.datas);

			this.rightCheckData.list = arr;
		},

		moveLeft() {
			let arr = this.rightCheckData.selected;
			let list = this.rightCheckData.list;
			
			//删除已选的值
			let newListArr = list.filter((item)=>{
				return ~arr.indexOf(item.value) == 0;
			});

			let newSelectedArr = arr.filter((item)=>{
				return ~arr.indexOf(item) == 0;
			});
			
			this.rightCheckData.list = newListArr;
			this.rightCheckData.selected = newSelectedArr;
		},

		isLeftAllChecked(flag) {
			if (this.datas.selected.length === 0) {
				return false;
			}

			if (this.datas.list.length == this.datas.selected.length) {
				return true;
			} else {
				return false;
			}
		},

		isRightAllChecked() {
			if (this.rightCheckData.selected.length === 0) {
				return false;
			}
			
			if (this.rightCheckData.list.length == this.rightCheckData.selected.length) {
				return true;
			} else {
				return false;
			}
		},

		checkLeftAll(event, flag) {
			if (event.target.checked) {
				this.datas.list.forEach((item)=> {
					this.datas.selected.indexOf(item.value) == -1 && this.datas.selected.push(item.value);
				});
			} else {
				this.datas.selected = [];
			}
		},

		checkRightAll(event, flag) {
			if (event.target.checked) {
				this.rightCheckData.list.forEach((item)=> {
					this.rightCheckData.selected.indexOf(item.value) == -1 && this.rightCheckData.selected.push(item.value);
				});
			} else {
				this.rightCheckData.selected = [];
			}
		},

		initRightCheck(data) {
			let arr = this._getSelected(data);

			this.rightCheckData.list = arr;
		},

		val() {
			let arr = [];
			
			this.rightCheckData.list.forEach((item)=>{
				arr.push(item.value);
			});

			return arr;
		}
	},

	computed: {
		datas() {
			return this.leftCheckData;
		}
	},

	events: {

    [inputEvent.change](opt) {
      this.search(opt.value);
    }
  }
}

module.exports = Vue.component('checkbox-tab', CheckboxTab);
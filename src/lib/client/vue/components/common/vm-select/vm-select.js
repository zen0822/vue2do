/*
* 下拉框组件: select
* @params:
* url 下拉框动态获取数据地址
* optionData option所需数据 [{key:'',text:''}]
* selectedVal 选中值
* initSelectedName 初始化下拉框显示值
* throwSelectedName 外部接受改变显示值
* optionGroup 下拉框是否展示分类
* optionGroupKey 分组下拉列表数据遍历key
* ajax 分组关闭动态获取下拉列表
* ajaxKey 分组关闭动态获取下拉列表数据遍历key
* mutiple 是否开启多选
* searchShow 是否展示搜索框
* searchKey 搜索数据遍历所需的匹配key
* localSearch 是否开启本地数据搜索，开启后不再动态请求搜索数据
* grayValue 初始化颜色列表项匹配值
*/
const Vue = require('vue');
const ajax = require('appUtil/ajax');
require('./vm-select.scss');
const template = require('./vm-select.tpl');

const VSelect = {
	name: "VSelect",
	template,
	data(){
		return {
			optionArr: [],//存放请求的下拉列表数据
			search: '',//搜索框model
			tmpOptionArr:[],//临时存放选中项
			tmpOptionNameArr:[],//临时存放选中项的名称
			selectedName:'',//选中展示值
			backSearch: null,//备份search
			flagClick: false
		}
	},
	props: {
		url:{//下拉框动态获取数据连接
			type: String
		},
		optionData: {//option列表所需数据
			type: Array,
			twoWay: true,
			default(){
				return [{
					key: '123',
					text: '测试'
				}]
			}
		},
		selectedVal: {//选中的值
			twoWay: true,
			type: [String, Number]
		},
		initSelectedName:{//初始化select框默认值
			twoWay: true,
			type: [String, Number]
		},
		throwSelectedName: {//向外抛出改变的名称
			twoWay: true,
			type: [String, Number]
		},
		throwAjaxData: {
			twoWay: true,
			type: [Array],
			default() {
				return [];
			}
		},
		optionGroup: {//是否分组
			type: Boolean,
			default: false
		},
		ajax: {//非分组下拉框动态获取使用
			type: Boolean,
			default: false
		},
		ajaxKey: {//非分组下拉框匹配key
			type: Object
		},
		optionGroupKey: {//option 列表数据对象所需key
			type: Object
		},
		mutiple:{//是否多选
			type: Boolean,
			default: false
		},
		searchShow: {//是否展示搜索
			type: Boolean,
			default: true
		},
		searchKey: {//搜索关键字
			type: String
		},
		localSearch: {//本地数据搜索
			type: Boolean,
			default: false
		},
		grayValue: {
			type: [String, Number],
			default: ''
		}
	},
	ready() {
		window.SELECT = [];
		this.init();
		$(window).on('click', (e)=> {
			let parents = $(e.target).parents('.vm-select');
			if (parents.length === 0) {
				$('.select-box').removeClass('open');
			}
		});
	},

	methods: {
		init() {
			if (!this.url) {
				this.$set('optionArr', this.optionData)
			} else {
				this.fetchData();
			}

			//首次存储本地搜索数据
			this.backSearch = !this.url ? this.optionData : this.optionArr;

			if (this.initSelectedName) {
				this.selectedName = '' + this.initSelectedName;
				this.selectedVal = '' + this.selectedVal;
				this.tmpOptionArr = this.selectedVal.split(',');
				this.tmpOptionNameArr = this.selectedName.split(',');
			}
		},

		fetchData(params) {
			let url = this.url;

			if (!url) {
				return false;
			}

			params = params ? params : {};
			ajax('get', url).query(params).end((err, res) => {
        if (res.body.code === 0) {
          this.$set('optionArr', res.body.data);
          this.throwAjaxData = res.body.data;
        } else {

        }
      });
		},

		searchLocal(val) {
			let arr = this.optionData.filter((o)=>{
				return (o.text&&o.text.indexOf(val) > -1) && this.findEleIndex(this.tmpOptionArr, o.key);
			});

			//搜索值为空展示全部
			if (val.toString().length == 0) {
				arr = this.optionData;
			}

			this.backSearch = arr;
		},

		isOpen(e) {
			if (!e) {
				return false;
			}

			let dom = $(e.target).parents('.select-box');
			

			$('.select-box').not(dom).removeClass('open');

			dom.toggleClass('open');
			let children= dom.find('.dropdown-menu').children('.v-select');
			
			if (children.children('div').length > 6) {
				 children.css('overflow-y', 'scroll');
			}
		},

		findEleIndex(val, arr) {
			let index = -1;

			for (let i = 0; i < arr.length; i++) {
				if (val == arr[i]) {
					index = i;
					break;
				}
			}

			return index;
		},

		initSelect(val) {
			let str =  '' + this.selectedVal;
			let arr = str.split(',');
			let boolRes = false;
			let valStr = '' + val;

			for (let i = 0; i < arr.length; i++) {
				//val为''且arr[i]为'0'或者0
				if ( valStr == arr[i] && valStr.length == arr[i].length) {
					boolRes =  true;
					break;
				}
			}

			return boolRes;
		},

		addVal(e, val, name) {
			let index = this.findEleIndex(val, this.tmpOptionArr);
			let $tmpEle = $(e.target);
			let $span = $tmpEle.find('.check-mark');
			$span = $span.length == 0 ? $tmpEle.siblings('.check-mark') : $span;
			let $p = $span.parents('p');
			this.flagClick = true;
			if (index === -1) {
				//打钩
				let dom = $p.addClass('selected');

				//如果是多选
				if (this.mutiple) {
					this.tmpOptionArr.push(val);
					this.tmpOptionNameArr.push(name);
				} else {

				
					// 解决带分组无法单选
					let divArr = $p.parents('div.flag').siblings('div');
					$p.siblings('p').removeClass('selected');
					
					for (let i = 0; i < divArr.length; i++) {
						let div = divArr[i];
						let pArr = $(div).children('p');
						for (let j = 0; j < pArr.length; j++) {

							let p = pArr[j];

							$(p).removeClass('selected');
							
						}
					}

					this.tmpOptionArr[0] = val;
					this.tmpOptionNameArr[0] = name
				}

			} else {
				$p.removeClass('selected');

				if (!this.mutiple) {
					$p.siblings('p')
					.removeClass('selected');
				}

				this.tmpOptionArr.splice(index, 1);
				this.tmpOptionNameArr.splice(index, 1);
			}

			//处理模拟select name
			this.selectedVal = this.tmpOptionArr.join(',');
			this.selectedName = this.tmpOptionNameArr.join(',');
			
			//修改内部选中显示值，同时修改外部接受显示值得变量
			this.throwSelectedName = this.selectedName;

			//关闭下拉面板
			this.isOpen(e);

			this.flagClick = false;
		},

		clearVal(e) {
			this.throwSelectedName = '';
			this.initSelectedName = '';
			this.selectedVal = '';
			this.selectedName = '';
			this.isOpen(e);
		}
	},

	watch:{
		search(val, oldVal) {
			if (!this.localSearch) {
				let params = `{"${ this.searchKey }": "${val}"}`;
				params = JSON.parse(params);
				this.fetchData(params);
			} else {
				this.searchLocal(val);
			}
		},

		selectedVal(val, oldVal) {
			//当值为空时，展示请选择
			if (val.length == 0) {
				this.selectedName = '';

				//add 非点击清空下拉框的值，清除内存对应的值
				if (!this.flagClick) {
						let index = this.findEleIndex(oldVal, this.tmpOptionArr);
						this.tmpOptionArr.splice(index, 1);
						this.tmpOptionNameArr.splice(index, 1);
						this.selectedVal = this.tmpOptionArr.join(',');
						this.selectedName = this.tmpOptionNameArr.join(',');
						
						//自动清除已打钩的选项
						$(this.$el).find('.flag').find('p').removeClass('selected');
				}
			
			}
		},

		selectedName(val, oldVal) {
			//提供名称变化
			if (val) {
				this.throwSelectedName = val;
			}
		},

		optionData: function(val, oldVal) {
			if (val) {
				this.backSearch = !this.url ? this.optionData : this.optionArr;
			}
		}
	}
}

module.exports = Vue.component('vm-select', VSelect);
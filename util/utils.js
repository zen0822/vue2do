const tip = require('components/base/pop/tip')

export const isSet = (value) => {
	if( value == '' || typeof value === "undefined" ) return false;
	return true
}

export const setPageTitle = ( title ) => {
	if (title) document.title = title
}

/**
 * 处理从服务器返回的数据，主动处理 code 的情况
 *
 * @param {String} - respone 的 body 数据
 * @return {Promise}
 *
 */
export const ajaxRtn = (res) => {
	return new Promise((resolve, reject) => {
		if (res.code === 0) {
			resolve(res);
		} else {
			tip('获取失败');
		}
	});
}

/**
 * [description] 获取vue-router页面路径 
 * eg: /page/marketing/charging-template/version/1191 
 * 调用后 /page/marketing/charging-template/version
 * 
 * @param  {[type]} transtion [description] 路由对象
 * @return {String} 
 */
export const getPageUrl = (transition) => {
	if (!transition) {
		return false;
	}

	let path = transition.to.path.split('?')[0];

	//校验路由是否为/:id传参模式	
	if (transition.to.matched[transition.to.matched.length - 1]['handler']['fullPath'].indexOf('/:') > -1) {
		let arr = path.split('/');
		let tmp = arr.splice(0, arr.length - 1);

		path = tmp.join('/');
	}

	return path;
}

module.exports = {
	isSet,
	setPageTitle,
	ajaxRtn,
	getPageUrl
}
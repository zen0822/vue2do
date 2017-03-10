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

module.exports = {
	isSet,
	setPageTitle,
	ajaxRtn
}
/**
 * [description] 添cookie
 * 
 * @param  {[type]} name         cookie名称
 * @param  {[type]} value        cookie值
 * @param  {[type]} expiresHours 有效时间小时
 * @return {[type]}              [description]
 */
const addCookie = (name, value, expiresHours)=> { 
	let cookieString=name+"="+escape(value); 
	//判断是否设置过期时间 
	if(expiresHours>0){ 
	let date=new Date(); 

	date.setTime(date.getTime+expiresHours*3600*1000); 
	cookieString=cookieString+"; expires="+date.toGMTString(); 
	} 

	document.cookie=cookieString; 
} 

/**
 * [description] 获取设置cookie
 * 
 * @param  {[type]} name [description] cookie名称
 * @return {[type]}      [description] cookie值
 * 
 */
const getCookie = (name)=> { 
	let strCookie=document.cookie; 
	let arrCookie=strCookie.split("; "); 

	for(let i=0;i<arrCookie.length;i++){ 

		let arr=arrCookie[i].split("="); 

		if(arr[0]==name)return arr[1]; 

	} 

	return ""; 
} 

/**
 * [description] 删除cookie
 * 
 * @param  {[type]} name [description] cookie名称
 * @return {[type]}      [description]
 */
const delCookie = (name)=> { 
	let date=new Date(); 
	date.setTime(date.getTime()-10000); 
	document.cookie=name+"=v; expires="+date.toGMTString(); 
} 


module.exports = {
	addCookie,
	getCookie,
	delCookie
};
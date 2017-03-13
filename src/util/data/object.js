const { dataType } = require('./data');

/**
 * to judge whether variable is Object
 *
 * @param obj
 * @return {Boolean} - whether variable is Object .
 */
const isObject = (obj) => {
  return dataType(obj) === 'object';
}

/**
 * 判断object是否为空
 *
 * @param obj
 * @return {Boolean} - whether Object is empty .
 */
const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
}

/**
 * deep map object without inherit
 *
 * @param obj
 * @return {Array}
 */
const deepReplaceVal = (opt = {}) => {
  var obj = opt.obj;
  var cb = opt.cb;
  var replacedObj = {};
  var valArr = Object.values(obj);
  var keyArr = Object.keys(obj);

  valArr.forEach((val, index) => {
    if (isObject(val)) {
      replacedObj[keyArr[index]] = deepReplaceVal({
        obj: val,
        cb
      });
    } else {
      replacedObj[keyArr[index]] = cb.call(null, val);
    }
  });

  return replacedObj;
}

const deepClone = (obj = {}) => {
  let str, newobj = obj.constructor === Array ? [] : {};

  if(typeof obj !== 'object'){
      return;
  } else if(window.JSON){
      str = JSON.stringify(obj), //系列化对象
      newobj = JSON.parse(str); //还原
  } else {
      for(let i in obj){
          newobj[i] = typeof obj[i] === 'object' ? 
          cloneObj(obj[i]) : obj[i]; 
      }
  }
  return newobj;
}

module.exports = {
  isObject,
  deepReplaceVal,
  isEmpty,
  deepClone
}

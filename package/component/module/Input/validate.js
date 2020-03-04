export default (verifedType) => {
  if (!verifedType) {
    return false
  }

  let regexStr = ''
  let dataTypeNameStr = ''

  switch (verifedType) {
    case 'number': {
      regexStr = /^[0-9]*$/
      dataTypeNameStr = '数字'
      break
    }

    case 'url': {
      regexStr = /^((http:|https:|)\/\/)(www.)?\w+.\w+/
      dataTypeNameStr = '超链接'
      break
    }

    case 'mobile': {
      regexStr = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      dataTypeNameStr = '手机'
      break
    }

    case 'tel': {
      regexStr = /^(0[1-9]{2})-\d{8}$|^(0[1-9]{3}-(\d{7,8}))$/
      dataTypeNameStr = '电话'
      break
    }

    case 'email': {
      regexStr = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      dataTypeNameStr = '邮箱地址'
      break
    }

    case 'password': {
      regexStr = /^[\@A-Za-z0-9\_]{6,18}$/
      dataTypeNameStr = '密码'
      break
    }

    default: {
      regexStr = new RegExp(regexStr)
      dataTypeNameStr = '格式不對'
      break
    }
  }

  return {
    regex: regexStr,
    dataTypeName: dataTypeNameStr
  }
}

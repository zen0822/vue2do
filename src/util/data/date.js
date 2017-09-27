/**
 * @param {string | number} value - 需要转换的值，数字类型则认为是时间戳，字符串能转换为数字也认为时间戳
 * @param {string} format - 需要格式化的值
 */
const format = (value, format = 'yyyy-MM-dd') => {
  if (!value) {
      return '--'
  }

  if (!isNaN(value)) {
      value = parseInt(value)

      if (value.toString().length === 10) {
          value = value * 1000
      }
  }

  let time = new Date(value)
  let str = format
  let Week = ['日', '一', '二', '三', '四', '五', '六']

  str = str.replace(/yyyy|YYYY/, time.getFullYear())
  str = str.replace(/yy|YY/, (time.getYear() % 100) > 9 ? (time.getYear() % 100) : `0${time.getYear() % 100}`)

  str = str.replace(/MM/, time.getMonth() + 1 > 9 ? (time.getMonth() + 1) : `0${time.getMonth() + 1}`)
  str = str.replace(/M/g, time.getMonth() + 1)

  str = str.replace(/w|W/g, Week[time.getDay()])

  str = str.replace(/dd|DD/, time.getDate() > 9 ? time.getDate() : '0' + time.getDate())
  str = str.replace(/d|D/g, time.getDate())

  str = str.replace(/hh|HH/, time.getHours() > 9 ? time.getHours() : '0' + time.getHours())
  str = str.replace(/h|H/g, time.getHours())

  str = str.replace(/mm/, time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes())
  str = str.replace(/m/g, time.getMinutes())

  str = str.replace(/ss|SS/, time.getSeconds() > 9 ? time.getSeconds() : '0' + time.getSeconds())
  str = str.replace(/s|S/g, time.getSeconds())

  return str
}

export {
  format
}

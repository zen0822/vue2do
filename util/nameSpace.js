module.exports = function (globalName, globalStr) {
  var parseArr = globalStr.split ('.')
  var globalObj = {}

  if (globalName in window) {
    globalObj = window[globalName]
  } else {
    globalObj = window[globalName] = {}
  }

  parseArr.forEach ((item) => {
    if (!(item in globalObj)) {
      globalObj[item] = {}
    } else {
      globalObj = globalObj[item]
    }
  })

  return globalObj
}
const addClass = (el, classStr) => {
  let newClassList = classStr.trim() + ' ' + el.className
  let classSet = new Set(newClassList.split(' '))

  el.className = [...classSet].join(' ')
}

const delClass = (el, classStr) => {
  let classSet = new Set(el.className.split(' '))
  let classList = classStr.split(' ')

  classList.forEach((item, index) => {
    classSet.delete(item)
  })

  el.className = [...classSet].join(' ')
}

export {
  addClass,
  delClass
}

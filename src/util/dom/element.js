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

const childrenHeight = (el) => {
  let children = el.children
  let totalHeight = 0

  for (let i = 0, len = children.length; i < len; i++) {
    totalHeight += children[i].offsetHeight
  }

  return totalHeight
}

export {
  addClass,
  delClass,
  childrenHeight
}

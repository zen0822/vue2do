const addClass = (el, classHub) => {
  if (!(Array.isArray(classHub) && classHub.length > 0
      || typeof classHub === 'string')) {
    return false
  }

  let localClass = el.className.split(' ')
  let classSet

  if (Array.isArray(classHub)) {
    classSet = new Set(localClass.concat(classHub))
  } else if (typeof classHub === 'string') {
    classSet = new Set(localClass.concat(classHub.trim().split(' ')))
  }

  el.className = [...classSet].join(' ')
}

const delClass = (el, classHub) => {
  if (!(Array.isArray(classHub) && classHub.length > 0
      || typeof classHub === 'string')) {
    return false
  }

  let localClass = new Set(el.className.split(' '))
  let classSet

  if (Array.isArray(classHub)) {
    classSet = new Set(classHub)
  } else if (typeof classHub === 'string') {
    classSet = new Set(
      classHub.trim().split(' ')
    )
  }

  classSet.forEach((item) => {
    localClass.delete(item)
  })

  el.className = [...localClass].join(' ')
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

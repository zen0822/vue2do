const addClass = (el: HTMLElement, classHub: string | string[]): boolean => {
  if (!((Array.isArray(classHub) && classHub.length > 0) ||
    typeof classHub === 'string')) {
    return false
  }

  const localClass = el.className.split(' ')
  let classSet

  if (Array.isArray(classHub)) {
    classSet = new Set(localClass.concat(classHub))
  } else if (typeof classHub === 'string') {
    classSet = new Set(localClass.concat(classHub.trim().split(' ')))
  }

  el.className = Array.from(classSet ?? []).join(' ')

  return true
}

const delClass = (el: HTMLElement, classHub: string | string[]): boolean => {
  if (!((Array.isArray(classHub) && classHub.length > 0) ||
    typeof classHub === 'string')) {
    return false
  }

  const localClass = new Set(el.className.split(' '))
  let classSet

  if (Array.isArray(classHub)) {
    classSet = new Set(classHub)
  } else if (typeof classHub === 'string') {
    classSet = new Set(
      classHub.trim().split(' ')
    )
  }

  classSet?.forEach((item) => {
    localClass.delete(item)
  })

  el.className = Array.from(localClass).join(' ')

  return true
}

const childrenHeight = (el: any): number => {
  const children = el.children
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

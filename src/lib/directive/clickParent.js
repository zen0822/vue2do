let nodeList = []
const storeName = 'VUE_2_DO_DIRECTIVE_CLICK_PARENT_STORE_NAME'

document.body.addEventListener('click', function () {
  nodeList.forEach((el) => {
    el[storeName].expression()
  })
})

export default {
  bind(el, binding, vnode) {
    const id = nodeList.push(el) - 1
    const context = vnode.context
    let expression = binding.expression

    if (typeof expression === 'string') {
      expression = vnode.context[expression]
    }

    el[storeName] = {
      id,
      expression,
      value: binding.value,
      vm: vnode.context
    }
  },

  update(el, binding, vnode) {
    let expression = binding.expression

    if (typeof expression === 'string') {
      expression = vnode.context[expression]
    }

    el[storeName].expression = expression
    el[storeName].value = binding.value
  },

  unbind(el) {
    let len = nodeList.length

    nodeList.every((el, index) => {
      if (el[storeName].id === el[storeName].id) {
        nodeList.splice(index, 1)

        return false
      }

      return true
    })
  }
}
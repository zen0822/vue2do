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
    const context = el.context

    el[storeName] = {
      id,
      expression: binding.expression,
      value: binding.value
    }
  },

  update(el, binding) {
    el[storeName].expression = binding.expression
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
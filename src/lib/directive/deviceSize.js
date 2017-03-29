import compConfig from '../../config/index.json'

let deviceSizeEle = document.createElement('div')
deviceSizeEle.className = `${compConfig.prefix}-device-size`

document.body.append(deviceSizeEle)

window.addEventListener("resize", () => {

})

export default {
  bind(el, binding, vnode) {
    let content = window.getComputedStyle(deviceSizeEle, ":after").getPropertyValue("content")
  },

  update(el, binding) {

  }
}
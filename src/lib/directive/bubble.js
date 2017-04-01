export default {
  update(el, binding, opt = {}) {
    var bubbleTip = {}

    var bubbleText = opt.text

    if (!bubbleText && bubbleText !== 0) {
      return false
    }

    if (opt.bubble) {
      var vmParent = binding.vm

      for (let i = 0, len = opt.parent; i < len; i++) {
        vmParent = vmParent['$parent']
      }

      bubbleTip = vmParent.$refs[opt.bubble]
    } else {
      // bubbleTip = COMMON.router.app.$refs.commonComponent.$refs.bubbleTip
    }

    el.addEventListener('mouseover', (event) => {
      if (bubbleText) {
        bubbleTip.info(bubbleText).show(event.target)
        return false
      }
      bubbleTip.show(el)

      event.stopPropagation()
    })

    el.addEventListener('mouseout', (event) => {
      bubbleTip.hide()

      event.stopPropagation()
    })
  }
}
import pug from './Img.pug'
import {
  onMounted,
  createComponent
} from 'vue-function-api'

import {
  mounted,
  anchorLink,
  goAnchor,
  testOpt,
  typeTheme,
  typeUI
} from '../../mixin'

import exImg from './static/exImg.jpg'

export default createComponent({
  name: 'PageCompImg',
  template: pug(),
  setup(_props) {
    onMounted(function () {
      mounted()
    })

    return {
      anchorLink,
      exImg,
      goAnchor,
      testOpt,
      typeTheme,
      typeUI
    }
  }
})

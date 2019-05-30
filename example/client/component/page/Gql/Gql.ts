import './Gql.scss'
import 'vue-router'

import pug from './Gql.pug'
import MixinPageComponent from '../Component/MixinPageComponent'
import Component, { mixins } from 'vue-class-component'

@Component({
  template: pug()
})

export default class PageGql extends mixins(MixinPageComponent) {
  articleId: string

  constructor() {
    super()

    this.articleId = this.$route.params.id
  }

  onClick(): void {
    // todo
  }
}

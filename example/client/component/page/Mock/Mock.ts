import './Mock.scss'
import 'vue-router'

import gql from 'graphql-tag'
import Component, { mixins } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import pug from './Mock.pug'
import MixinPageComponent from '../Component/MixinPageComponent'

@Component({
  apollo: {
    links: {
      query: gql`{
        links {
          id,
          url
        }
      }`
      // prefetch: ({ route }) => ({ id: route.params.id }),
      // variables (): Car.Variables {
      //   return { id: this.$route.params.id }
      // }
    }
  },
  template: pug()
})

class PageMock extends mixins(MixinPageComponent) {
  // articleId: string
  links: Array<object> = []

  @Watch('links')
  onLinksChanged() {
    // val.length
  }

  constructor() {
    super()

    // this.articleId = this.$route.params.id
  }

  fetchSWMock(): void {
    fetch(new Request('/api/ex', {
      headers: new Headers({
        'Accept': 'application/json'
      })
    })).then((response) => {
      return response.json()
    }).then((data) => {
      console.log(data)
    })
  }

  mounted() {
    // TODO
  }
}

export default PageMock

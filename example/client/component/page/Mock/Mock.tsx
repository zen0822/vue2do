import './Mock.scss'
import 'vue-router'

import { CreateElement, VNode } from 'vue'
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

  queryLinks() {
    return this.$apollo.queries.links.start()
  }

  async addLink() {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation ($msg: String!, $description: String!) {
            postLink(
              url: $msg,
              description: $description
            ) {
              id,
              url
            }
          }
        `,
        variables: {
          msg: 'vue2do.com',
          description: 'vue2do'
        }
      })

    this.queryLinks()
  }

  mounted() {
    this.addLink()
  }

  render(h: CreateElement): VNode {
    return (
      <div class='p-mock-p'>
        <ol>
          {this.links.map((item: any) => (
            <li>{item.id} {item.url}</li>
          ))}
        </ol>
      </div>
    )
  }
}

export default PageMock

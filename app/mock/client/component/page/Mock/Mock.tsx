import './Mock.scss'
import 'vue-router'

import { CreateElement, VNode } from 'vue'
import gql from 'graphql-tag'
import Component, { mixins } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import MixinPageComponent from '../../MixinPageComponent'

@Component({
  // apollo: {
  //   links: {
  //     query: gql`{
  //       links {
  //         id,
  //         url
  //       }
  //     }`,
  //     prefetch: ({ route }) => ({ id: route.params.id }),
  //     variables() {
  //       return {
  //         id: this.$route.params.id
  //       }
  //     }
  //   }
  // }
})

/**
 * 声明业务组件 PageMock 并且继承（混入）MixinPageComponent 类
 */
class PageMock extends mixins(MixinPageComponent) {
  articleId = ''
  testData = ''
  links: Array<object> = []
  $apollo: any
  $route: any

  /**
   * 监听 links 状态变量
   *
   * @param val
   */
  @Watch('links')
  onLinksChanged(val: Array<object>): any {
    console.log(val)
  }

  text(): any {
    return this.testData
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

  /**
   * 获取所有 Link
   */
  queryLinks(): any {
    return this.$apollo.queries.links.refetch()
  }

  /**
   * 添加 link
   */
  async addLink(): Promise<any> {
    this.$apollo.mutate({
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
        msg: 'zen0822.github.io',
        description: 'vue2do doc'
      }
    })
  }

  /**
   * 组件安装完成之后执行的函数
   */
  mounted(): any {
    this.articleId = this.$route.params.id
  }

  /**
   * dom 渲染
   *
   * @param h
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(h: CreateElement): VNode {
    return (
      <div class='p-mock-p'>
        <z-btn
          class='z-css-m-r'
          onClick={(): any => this.addLink()}
        >增加 link</z-btn>

        <z-btn
          theme='success'
          onClick={(): any => this.queryLinks()}
        >获取 link</z-btn>

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

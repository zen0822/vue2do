import './Mock.scss'
import {
  onMounted,
  defineComponent,
  watch,
  ref
} from '@vue/composition-api'
import { CreateElement, VNode } from 'vue'
import gql from 'graphql-tag'

import {
  useRouter
} from '../../../app'

const router: any = useRouter()

export default defineComponent({
  name: 'PageMock',
  // apollo: {
  //   links: {
  //     query: gql`{
  //       links {
  //         id,
  //         url
  //       }
  //     }`,
  //     prefetch: ({ route }: { route: any }): any => ({ id: route.params.id }),
  //     variables(): any {
  //       return {
  //         id: 1
  //       }
  //     }
  //   }
  // },
  setup(_props, { root }) {
    const links = ref([])
    const articleId = ref(root.$route.params.id)

    const fetchSWMock = (): void => {
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
    const queryLinks = async (): Promise<any> => {
      try {
        const { data } = await root.$apollo.query({
          query: gql`{
            links {
              id,
              url
            }
          }`
        })

        links.value = data.links
      } catch (error) {
        console.warn(error)
      }
    }

    /**
     * 添加 link
     */
    const addLink = async (): Promise<any> => {
      root.$apollo.mutate({
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

    onMounted(function () {
      console.log('onMounted')
    })
    watch(links, (links, prevLinks) => { console.log('Watch links', links, prevLinks) })

    return {
      addLink,
      articleId,
      links,
      fetchSWMock,
      queryLinks
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(this: any, h: CreateElement): VNode {
    const {
      links,
      addLink,
      queryLinks
    } = this

    return (
      <div class='p-mock-p'>
        <div
          onClick={(): any => router.push('/404')}
        >跳转到 404</div>

        <z-btn
          class='z-css-m-r'
          onClick={(): any => addLink()}
        >增加 link</z-btn>

        <z-btn
          theme='success'
          onClick={(): any => queryLinks()}
        >获取 link</z-btn>

        <ol>
          {links.map((item: any) => (
            <li>{item.id} {item.url}</li>
          ))}
        </ol>
      </div>
    )
  }
})

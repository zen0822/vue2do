import './LayoutHeader.scss'
import { VNode } from 'vue'
import {
  defineComponent,
  ref
} from '@vue/composition-api'
import { typeUI, typeTheme } from '../mixin'

import Row from '@vue2do/component/module/Row'
import Col from '@vue2do/component/module/Col'
import Icon from '@vue2do/component/module/Icon'
import Input from '@vue2do/component/module/Input'
import Nav from '@vue2do/component/module/Nav'
import logoUrl from '../../../asset/img/favicon.png'

export default defineComponent({
  name: 'LayoutHeader',
  setup() {
    const mobileMenuRef = ref<any>(null)
    const sortIconDisplay = ref(false)
    const menuOpt = ref([{
      'name': '组件',
      'route': '/component/start'
    }, {
      'name': '构建',
      'route': '/build'
    }, {
      'name': '关于',
      'route': '/about'
    }])

    function showMenu(): void {
      sortIconDisplay.value = false
      mobileMenuRef?.value?.show()
    }

    function hideMenu(): void {
      sortIconDisplay.value = true
    }

    return (): VNode => (
      <div class='header-layout-stage'>
        <Row class='nav-box' justify='justify'>
          <Col width='calc(100% - 400px)'>
            <router-link to='/'>
              <img class='logo-box' src={logoUrl} />
            </router-link>
          </Col>
          <Col width='calc(400px)'>
            <Row class='nav-menu-box' justify='justify'>
              <Col span={3}>
                <router-link to='/component/start'>组件</router-link>
              </Col>
              <Col span={3}>
                <router-link to='/build'>构建</router-link>
              </Col>
              <Col span={3}>
                <router-link to='/about'>关于</router-link>
              </Col>
              <Col span={3}>
                <a href='//github.com/zen0822/vue2do'>
                  <Icon size='L' theme='grey' kind='github' />
                </a>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row class='nav-box nav-box-mobile'>
          <Col span={4}>
            <div onClick={(): void => showMenu()}>
              <Icon kind='sort' v-show={sortIconDisplay} />
            </div>
          </Col>
          <Col class='z-css-text-center' span={4}>
            <img class='logo-box' src={logoUrl} />
          </Col>
          <Col class='z-css-text-right' span={4}>
            <div onClick={(): void => showMenu()}>
              <Icon kind='search' />
            </div>
          </Col>
        </Row>

        <Nav
          class='mobile-menu'
          ref={mobileMenuRef}
          {...{ on: { hide: hideMenu } }}
          initOpt={menuOpt.value}
          ui={typeUI.value}
          theme={typeTheme.value}
        >
          <div class='menu-search' slot='end'>
            <Input placeholder='search in vue2do' block>
              <Icon slot='header' kind='search' size='xs' />
            </Input>
          </div>
        </Nav>
      </div>
    )
  }
})

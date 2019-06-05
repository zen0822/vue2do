import { shallowMount } from '@vue/test-utils'
import Mock from '../Mock'

describe('/EX/Page/Mock', () => {
  test('renders props.msg when passed', () => {
    const testData = 'new message'

    const wrapper = shallowMount(Mock, {
      propsData: { testData }
    })

    expect(wrapper.text()).toMatch(testData)
    expect(wrapper.element).toMatchSnapshot()
  })
})

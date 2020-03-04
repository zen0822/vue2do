import { shallowMount } from '@vue/test-utils'
import TestApp from '../App'
import { expect } from 'chai'

describe('/app/mock/App', () => {
  it('renders <LayoutHeader /> when passed', () => {
    const wrapper = shallowMount(TestApp)

    expect(!!wrapper.vm.$refs.headerRef).to.be.equal(true)
  })
})

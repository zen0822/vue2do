/* global describe, it, expect */

const Vue = require('vue')
const ComponentA =require('../../src/appBackend/components/page/configPush/app-pop-up/add-app-pop-up/add-app-pop-up')

describe('添加数据成功_应用内弹窗_addAppPopUp', () => {

  // asserting JavaScript options
  it('should have correct message', () => {
    expect(ComponentA.data().msg).to.equal('Hello from Component A!');
  })

  // // asserting rendered result by actually rendering the component
  // it('should render correct message', () => {
  //   const vm = new Vue({
  //     template: '<div><test></test></div>',
  //     components: {
  //       'test': ComponentA
  //     }
  //   }).$mount()
  //   expect(vm.$el.querySelector('h2.red').textContent).toBe('Hello from Component A!')
  // })

  // // example testing with a mock
  // it('should render with mocked message', function () {
  //   // inject-loader gives us a factory that can create instances
  //   // of the module with different injected dependencies.
  //   // make sure to use the require() syntax here.
  //   // for webpack loader string syntax, see:
  //   // - https://webpack.github.io/docs/loaders.html
  //   const inject = require('!!vue?inject!../ex/components/A.vue')
  //   // create an instance of the component module,
  //   // injecting a mocked "../services/message" dependency
  //   const ComponentAWithMock = inject({
  //     '../services/message': {
  //       getMessage () {
  //         return 'Hello from mock'
  //       }
  //     }
  //   })
  //   // now we can test it!
  //   const vm = new Vue({
  //     template: '<div><test></test></div>',
  //     components: {
  //       'test': ComponentAWithMock
  //     }
  //   }).$mount()
  //   expect(vm.$el.querySelector('h2.red').textContent).toBe('Hello from mock')
  // })
})

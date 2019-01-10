export default function wrapToHMR({
  module,
  comp: componentOption,
  cb = Function.prototype
} = {}) {
  if (module.hot) {
    const api = require('vue-hot-reload-api')
    const Vue = require('vue')

    api.install(Vue)

    if (!api.compatible) {
      throw new Error('vue-hot-reload-api is not compatible with the version of Vue you are using.')
    }

    module.hot.accept()

    cb()

    if (!module.hot.data) {
      api.createRecord('very-unique-id', componentOption)
    } else {
      api.rerender('very-unique-id', componentOption)
      api.reload('very-unique-id', componentOption)
    }
  }

  return componentOption
}

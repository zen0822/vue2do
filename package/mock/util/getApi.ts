import { deepReplaceVal } from '@vue2do/component/util/data/object'

const apiPath = function getApiPath(apiData: any, apiPrefix: string): any {
  return deepReplaceVal({
    obj: apiData,
    cb(apiUrl: string) {
      if (/^(http|https|\/\/)/.test(apiUrl)) {
        return apiUrl
      }

      return `${apiPrefix}${apiUrl}`
    }
  })
}

export default apiPath

export {
  apiPath as api
}

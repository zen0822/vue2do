import DBMock, { IMock } from './db'

importScripts('https://zen0822.github.io/lib/workbox/workbox-sw.js')

workbox.setConfig({
  modulePathPrefix: 'https://zen0822.github.io/lib/workbox',
  debug: process.env.NODE_ENV === 'development'
})

const {
  core: workboxCore,
  routing: workboxRouting,
  strategies: workboxStrategies,
  precaching: workboxPrecaching
} = workbox

const self2 = self as any
const {
  addEventListener,
  registration
} = self2

class ServiceWorkerMain implements IMock {
  id: number | undefined
  api: string
  data: string

  constructor(api: string, data: string, id?:number) {
    this.api = api
    this.data = data
    if (id) this.id = id

    workboxCore.setCacheNameDetails({
      precache: 'precache',
      prefix: 'vue2do-doc',
      suffix: 'v1'
    })
    workboxCore.skipWaiting()
    workboxCore.clientsClaim()
  }

  init() {
    const db = new DBMock()
    db.mock.put({ data: 'First name', api: '/api/ex' })

    workboxRouting.registerRoute(
      new RegExp('http://localhost:5168/#/'),
      new workboxStrategies.StaleWhileRevalidate()
    )

    type C = { url: string, event: any, params: { type: string, name: string } }
    workbox.routing.registerRoute(
      ({ url, event }: { url: { href: string }, event: any }): any => {
        if (/\/api\/ex/.test(url.href)) {
          console.log(url, event)

          return {
            type: 'test',
            name: '/api/ex'
          }
        }

        return false
      },
      ({ url, event, params }: C): object => {
        console.log(event)

        return new Response(
          `url: ${url}，param: ${params.type} on ${params.name}`
        )
      }
    )

    workboxPrecaching.precacheAndRoute(self2.__precacheManifest)

    addEventListener('push', (event: any) => {
      const title = 'Get Started With Workbox'
      const options = {
        body: event.data.text()
      }
      event.waitUntil(registration.showNotification(title, options))
    })
  }
}

const serviceWorkerMain = new ServiceWorkerMain()

serviceWorkerMain.init()

export default ServiceWorkerMain

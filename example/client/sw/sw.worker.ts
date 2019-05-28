import db from './mock.db'
import mockrc from '../../.mockrc.js'

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

class ServiceWorkerMain {
  constructor() {
    workboxCore.setCacheNameDetails({
      precache: 'precache',
      prefix: 'vue2do-doc',
      suffix: 'v1'
    })
    workboxCore.skipWaiting()
    workboxCore.clientsClaim()

    this.init()
    this.registerRoute()
  }

  private async init() {
    workboxRouting.registerRoute(
      new RegExp('http://localhost:5168/#/'),
      new workboxStrategies.StaleWhileRevalidate()
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

  private registerRoute() {
    type C = { url: string, params: { data: object, name: string } }

    mockrc.api.forEach(async (item) => {
      try {
        await db.mock.put({
          data: item.data,
          api: item.path,
          name: item.name
        })
      } catch (error) {
        console.warn(error)
      }

      workboxRouting.registerRoute(
        ({ url }: { url: { href: string } }): any => {
          if (url.href.includes(item.path)) {
            return {
              name: item.name,
              data: item.data
            }
          }

          return false
        },
        ({ url, params }: C): object => {
          return new Response(
            JSON.stringify({
              url,
              data: params.data
            }), {
              status: 200,
              headers: new Headers({
                'Accept-Charset': 'utf-8',
                'Content-Type': 'application/json',
                'Cache-Control': 'max-age=3600'
              })
            }
          )
        }
      )
    })
  }
}

export const serviceWorkerMain = new ServiceWorkerMain()

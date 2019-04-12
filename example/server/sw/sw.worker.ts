import * as workbox from 'workbox-sw'
import * as workboxCore from 'workbox-core'
import * as workboxRouting from 'workbox-routing'
import * as workboxStrategies from 'workbox-strategies'
import * as workboxPrecaching from 'workbox-precaching'

const self2 = self as any
const {
  addEventListener,
  registration
} = self2

class ServiceWorkerMain {
  init() {
    workboxCore.skipWaiting()
    workboxCore.clientsClaim()

    workboxRouting.registerRoute(
      new RegExp('http://localhost:5168/'),
      new workboxStrategies.StaleWhileRevalidate()
    )

    addEventListener('push', (event: any) => {
      const title = 'Get Started With Workbox'
      const options = {
        body: event.data.text()
      }
      event.waitUntil(registration.showNotification(title, options))
    })

    workboxPrecaching.precacheAndRoute(self2.__precacheManifest)
  }
}

const serviceWorkerMain = new ServiceWorkerMain()

serviceWorkerMain.init()

export default ServiceWorkerMain

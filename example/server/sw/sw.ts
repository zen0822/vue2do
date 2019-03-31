import workbox from 'workbox-sw'

const self2 = self as any
const {
  addEventListener,
  registration
} = self2

class ServiceWorkerMain {
  init() {
    workbox.skipWaiting()
    workbox.clientsClaim()

    workbox.routing.registerRoute(
      new RegExp('http://localhost:5168/#/'),
      workbox.strategies.staleWhileRevalidate()
    )

    addEventListener('push', (event: any) => {
      const title = 'Get Started With Workbox'
      const options = {
        body: event.data.text()
      }
      event.waitUntil(registration.showNotification(title, options))
    })

    workbox.precaching.precacheAndRoute(self2.__precacheManifest)
  }
}

const serviceWorkerMain = new ServiceWorkerMain()

serviceWorkerMain.init()

export default ServiceWorkerMain

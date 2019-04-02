// import workbox from 'workbox-sw'
// import * as precaching from 'workbox-precaching'
// importScripts('https://unpkg.com/workbox-sw@4.1.1/build/importScripts/workbox-sw.dev.v4.1.1.js')
// const workbox = new WorkboxSW()
importScripts('https://github.com/zen0822/vue2do/lib/js/workbox/workbox-v4.1.1/workbox-sw.js')
workbox.setConfig({modulePathPrefix: 'https://github.com/zen0822/vue2do/lib/js/workbox/workbox-v4.1.1'})
// const workbox = new WorkboxSW({
//   clientsClaim: true,
//   skipWaiting: true
// })

workbox.skipWaiting()
workbox.clientsClaim()

workbox.routing.registerRoute(
  new RegExp('http://localhost:5168/#/'),
  workbox.strategies.staleWhileRevalidate()
)

self.addEventListener('push', (event) => {
  const title = 'Get Started With Workbox'
  const options = {
    body: event.data.text()
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

workbox.precaching.precacheAndRoute(self.__precacheManifest)

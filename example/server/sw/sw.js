const {
  addEventListener,
  registration
} = self

workbox.skipWaiting()
workbox.clientsClaim()

workbox.routing.registerRoute(
  new RegExp('http://localhost:5168/#/'),
  workbox.strategies.staleWhileRevalidate()
)

addEventListener('push', (event) => {
  const title = 'Get Started With Workbox'
  const options = {
    body: event.data.text()
  }
  event.waitUntil(registration.showNotification(title, options))
})

workbox.precaching.precacheAndRoute(self2.__precacheManifest)
/**
 * the main file that the server of app
 */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      // console.log('SW registered: ', registration)
      // registration.pushManager.subscribe({
      //   userVisibleOnly: true
      // })
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError)
    })

    Notification.requestPermission(function(result) {
      // if (result === 'granted') {
      //   navigator.serviceWorker.ready.then(function(registration) {
      //     registration.showNotification('Notification with ServiceWorker')
      //   })
      // }
    })
  })
}

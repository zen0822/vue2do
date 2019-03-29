/**
 * the main file that the server of app
 */
class ServerMain {
  init() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        navigator.serviceWorker.register('/sw.js').then(async (registration) => {
          // console.log('SW registered: ', registration)
          // try {
          //   await registration.pushManager.subscribe({
          //     userVisibleOnly: true
          //   })
          // } catch (error) {
          //   console.warn(error)
          // }
        }).catch(registrationError => {
          console.log('SW registration failed: ', registrationError)
        })

        try {
          await Notification.requestPermission()
        } catch (error) {
          console.warn(error)
        }
      })
    }
  }
}

const serverMain = new ServerMain()

serverMain.init()

export default ServerMain

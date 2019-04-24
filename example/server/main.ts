/**
 * the main file that the server of app
 */

class ServerMain {
  async init() {
    if ('serviceWorker' in navigator) {
      const { Workbox } = await import('workbox-window')
      const wb = new Workbox('/sw.js')

      window.addEventListener('load', async () => {
        wb.register().then((registration: any) => {
          console.log('SW registered: ', registration)
          // registration.pushManager.subscribe({
          //   userVisibleOnly: true
          // }).then().catch()
        }).catch((registrationError: any) => {
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

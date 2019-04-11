/**
 * the main file that the server of app
 */
class ServerMain {
  init() {
    // this.output().then().catch()

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        navigator.serviceWorker.register('/sw.js').then((registration: any) => {
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

  async output() {
    // try {
    //   await import('file-loader?name=sw.js!ex/server/sw/sw')
    // } catch (error) { console.log(error) }
  }
}

const serverMain = new ServerMain()

serverMain.init()

export default ServerMain

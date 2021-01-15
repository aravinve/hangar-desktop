const electron = window.require('electron')
const Notification = electron.remote.Notification

const displayNotification = (title, body, silent) => {
    const myNotification = new Notification({
        title, body, silent
      })
    myNotification.show()
}

export default displayNotification;
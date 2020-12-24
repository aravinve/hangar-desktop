const electron = require('electron')
const ipcMain = electron.ipcMain
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const {autoUpdater} = require('electron-updater');
const log = require('electron-log');
const path = require('path')
const isDev = require('electron-is-dev')

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('Hangar App Starting...');

let splashScreen
let mainWindow

function createMainWindow(){

  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      enableRemoteModule: true,
    },
    show: false,
  })

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000/#/home'
      : `file://${path.join(__dirname, '../build/index.html')}#/home`
  )

  mainWindow.on('closed', () => {
    mainWindow = null
    if(splashScreen !== null){
      splashScreen.close()
    }
  })

}

function createSplashWindow() {

  splashScreen = new BrowserWindow({
    width: 500,
    height: 480,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      enableRemoteModule: true,
    },
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  })
 
  splashScreen.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  splashScreen.on('closed', () => {
    splashScreen = null
  })

}

app.on('ready', () => {
  autoUpdater.checkForUpdates()
  createSplashWindow()
  createMainWindow()
})

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow()
  }
})

ipcMain.on('login', (event, arg) => {
  splashScreen.hide()
  mainWindow.show()
  mainWindow.webContents.send('userData', arg)
})

ipcMain.on('logout', () => {
  mainWindow.hide()
  splashScreen.show()
})

ipcMain.on('quit-app', () => {
  if(splashScreen !== null){
    splashScreen.close()
  }
  if(mainWindow !== null){
    mainWindow.close()
  }
})

const sendStatusToWindow = (message) => {
  log.info(message)
  if (mainWindow) {
    mainWindow.webContents.send('message', message);
  }
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for updates...')
})

autoUpdater.on('update-available', (info) => {
  console.log(info)
  sendStatusToWindow('New update is available!')
})

autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Your app is already in updated version!')
})

autoUpdater.on('error', (err) => {
  sendStatusToWindow(`Error in auto-updater: ${err.toString()}`)
})

autoUpdater.on('download-progress', (progressObj) => {
  sendStatusToWindow(
    `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`
  )
})

autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded; will install now');
})

autoUpdater.on('update-downloaded', (info) => {
  autoUpdater.quitAndInstall()
})

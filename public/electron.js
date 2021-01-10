const electron = require('electron')
const ipcMain = electron.ipcMain
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const {autoUpdater} = require('electron-updater');
const log = require('electron-log');
const path = require('path')
const isDev = require('electron-is-dev');
const Store = require('./store');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('[HANGAR] App Starting');

let splashScreen
let mainWindow

const DEFAULT_PREFERENCES = {
  theme: 'light',
  background: 'mountains',
  finder: false,
  stickyNotes: false,
}

const preferencesStore = new Store({
  configName: 'user-preferences',
  userPreferedData: {}
})

function createMainWindow(){

  log.info('[HANGAR] Launching Main Window');

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

  log.info('[HANGAR] Launching Splash Window');

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
  if(preferencesStore.get('userPreferedData') === undefined || preferencesStore.get('userPreferedData') === null){
    preferencesStore.set('userPreferedData', DEFAULT_PREFERENCES)
  }
  createSplashWindow()
  createMainWindow()
})

app.on('window-all-closed', () => {
  log.info('[HANGAR] Exiting App');
  app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow()
  }
})

ipcMain.on('login', (event, arg) => {
  const userPreferedData = preferencesStore.get('userPreferedData')
  log.info('[HANGAR] User Preferences', userPreferedData);
  const userDataObject = {
    userArgs: arg,
    preferences: userPreferedData
  }
  splashScreen.hide()
  mainWindow.show()
  mainWindow.webContents.send('userData', userDataObject)
  log.info('[HANGAR] Login');
})

ipcMain.on('logout', (event, arg) => {
  log.info('[HANGAR] User Preferences', arg);
  preferencesStore.set('userPreferedData', arg)
  mainWindow.hide()
  splashScreen.show()
  log.info('[HANGAR] Logout');
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

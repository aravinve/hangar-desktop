const electron = require('electron')
const ipcMain = electron.ipcMain
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const isDev = require('electron-is-dev')

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

}

app.on('ready', () => {
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
  splashScreen.close()
  mainWindow.close()
})

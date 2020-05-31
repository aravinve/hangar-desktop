const electron = require('electron');
const ipcMain = electron.ipcMain;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let splashScreen;
let mainWindow;

function createWindow() {
  splashScreen = new BrowserWindow({
    width: 500,
    height: 480,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  });

  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
    show: false,
  });

  splashScreen.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000/#/home'
      : `file://${path.join(__dirname, '../build/index.html')}#/home`
  );

  mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('login', (event, arg) => {
  splashScreen.hide();
  mainWindow.show();
  mainWindow.webContents.send('userData', arg);
});

ipcMain.on('logout', () => {
  mainWindow.hide();
  splashScreen.show();
});

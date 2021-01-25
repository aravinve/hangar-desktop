const electron = require('electron')
const ipcMain = electron.ipcMain
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const dialog = electron.dialog
const {autoUpdater} = require('electron-updater');
const log = require('electron-log');
const path = require('path');
const isDev = require('electron-is-dev');
const Store = require('./store');
const fs = require('fs');
const dataUrl = require("dataurl");
const mimeTypes = require("mime-types");
const uuid = require('uuid');
const mm = require('music-metadata');


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

const readSound = (location) => {
  const pm = new Promise((resolve, reject) => {
		fs.readFile(location, (err, data) => {
      if (err) {reject(err);}
			resolve(dataUrl.convert({data, mimetype: mimeTypes.lookup(location)}));
		});
	});
  return pm;
}

ipcMain.on("readSound", (event, musicData) => {
  const {id, location} = musicData
	readSound(location)
		.then((url) => {
			event.sender.send("soundLoaded", {dataStream: url, id: id});
		});
});

async function parseFile(file, scanDir) {
	let stat = fs.lstatSync(file);
	if (stat.isDirectory()) {
		if (!scanDir)
			return;
		let files = fs.readdirSync(file);
		let output = [];
		for (let child of files) {
			let p = (await parseFile(path.join(file, child)));
			if (p)
				output.push(p[0]);
		}
		return output;
	} else {
    let ext = path.extname(file);
		if (ext !== ".mp3")
      return;
    let out = {id: uuid.v4(), songData: null, playlist:'default', date: stat.ctimeMs, extension: ext, location: file, name: path.basename(file).split('.').slice(0, -1).join('.')};
    if (ext == ".mp3") {
			out.tags = await mm.parseFile(file, {native: true});
    }
		return [out];
	}
}

ipcMain.on('get-folder', async (event, arg) => {
  const {baseMusicFolder} = arg
  let files = dialog.showOpenDialogSync({
		title: baseMusicFolder ? "Import Album":"Import Songs",
		filters: [
			{name: "Sound (.mp3)", extensions: ["mp3"]}
		],
		properties: ["multiSelections", baseMusicFolder ? "openDirectory" : "openFile"]
  });
	if (!files) {
		event.returnValue = []
		return null;
	}
	let output = [];
	for (let file of files) {
		let arr = await parseFile(file, true);
		if (arr)
			output = output.concat(arr);
  }
  output.sort((a,b) => (a.name - b.name))
	event.returnValue = output
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

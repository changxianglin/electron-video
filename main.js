const { app, BrowserWindow, ipcMain, dialog } = require('electron')

class AppWindow extends BrowserWindow {
  constructor(config, fileLocation) {
    const basicConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    }
    const finalConfig = {...basicConfig, ...config}
    super(finalConfig)
    this.loadFile(fileLocation)
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

app.on('ready', () => {
  const mainWindow = new AppWindow({}, './renderer/index.html')

  ipcMain.on('add-music-window', (event, arg) => {
    const addWindow = new AppWindow({
      width: 500,
      height: 300,
      parent: mainWindow,
    }, './renderer/add.html')
    // addWindow.webContents.openDevTools()
  })
  

  ipcMain.on('open-music-file', (event) => {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [{name: 'Music', extensions: ['mp3', 'mp4']}]
    }).then(files => {
      if(files) {
        event.sender.send('selected-file', files.filePaths)
      }
    }).catch(err => {
      console.log(err)
    })
  })
  
})
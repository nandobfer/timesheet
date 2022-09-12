const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
    },
    autoHideMenuBar: true,
  })

  window.loadFile('timer.html')
}

app.on('ready', createWindow);
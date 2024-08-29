const{app, BrowserWindow, ipcMain} = require('electron')
const path = require('node:path')

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile('src/index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit()
    }
})


ipcMain.on('open-game-detail-page', () => {
    mainWindow.loadFile('src/game-detail.html');
});
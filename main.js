const{app, BrowserWindow, ipcMain} = require('electron')
const path = require('node:path')
const { execFile } = require('child_process');



let mainWindow;

const fs = require('fs');

const data = { key: 'value' };
const dataPath = path.join(app.getPath('userData'), 'data.json');

console.log(dataPath);

fs.writeFileSync(dataPath, JSON.stringify(data));

if (fs.existsSync(dataPath)) {
    const data = JSON.parse(fs.readFileSync(dataPath));
    console.log(data);
}

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

ipcMain.on('open-main-menu', () => {
    mainWindow.loadFile('src/index.html');
});

ipcMain.on('open-setting', () => {
    mainWindow.loadFile('src/setting.html');
})

ipcMain.on('play-game', (event, arg) => {
    const executablePath = 'C:\\Users\\at317\\Downloads\\すがわら\\すがわら\\My project (9).exe';

    mainWindow.hide();

    execFile(executablePath, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing file: ${error}`);
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        mainWindow.show();
    });
});
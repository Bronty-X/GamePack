const{app, BrowserWindow, ipcMain} = require('electron')
const path = require('node:path')
const { execFile } = require('child_process');



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
    const executablePath = 'C:\\Users\\at317\\Downloads\\すがわら\\すがわら\\My project (9).exe';

    execFile(executablePath, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing file: ${error}`);
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });

});

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
const{app, BrowserWindow, ipcMain} = require('electron')
const path = require('node:path')
const { execFile } = require('child_process');

const settingManager = require('./manageSetting.js')
var mainWindow;



var editMode = false;
var editId = null;

const fs = require('fs');

/** 
//const data = { key: 'value' };
//const dataPath = path.join(app.getPath('userData'), 'setting.json');

//console.log(dataPath);

fs.writeFileSync(dataPath, JSON.stringify(data));

if (fs.existsSync(dataPath)) {
    const data = JSON.parse(fs.readFileSync(dataPath));
    console.log(data);
}
*/

settingManager.checkSettingFile();
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile('src/index.html')
    //mainWindow.loadFile('src/setting.html')
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
ipcMain.on('open-add-page',()=>{
    mainWindow.loadFile('src/edit.html');
    editMode = false;
})
ipcMain.on('open-edit-page',(event,id)=>{
    mainWindow.loadFile('src/edit.html');
    editMode = true;
    editId = id;
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

ipcMain.on('get-setting', (event, arg) => {
    event.reply('load-setting', data);
    console.log(data);
});

ipcMain.on('get-game-list', (event, arg) => {
    event.reply('load-game-list', settingManager.loadGameList());
});

ipcMain.on('add-new-game', (event, arg,thumbnail,thumbnailType) => {
    console.log("add-new-game");
    //console.log(arg);
    console.log(thumbnailType);
   console.log(settingManager.addNewGameData(arg,thumbnail,thumbnailType));
    console.log(arg);
    //event.reply('game-added', arg);
}
);
ipcMain.on('delete-game', (event, id) => {
    settingManager.removeGameData(id);
    event.reply('game-deleted', id);
});

ipcMain.on('get-page-mode', (event) => {
    event.reply('editPage-mode', editMode, editId);
});
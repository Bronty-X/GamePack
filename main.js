const{app, BrowserWindow, ipcMain,dialog} = require('electron')
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
if (require('electron-squirrel-startup')) app.quit();
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

ipcMain.on('open-file-dialog', (event,property,filter) => {
    //https://www.electronjs.org/ja/docs/latest/api/dialog
    dialog.showOpenDialog({
        properties: property,
        filters: filter
    }).then(result => {
        if (!result.canceled) {
            event.reply('file-selected', result);
        }
    }).catch(err => {
        console.error(err);

    });
});

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
    event.reply('load-game-info',settingManager.getGameInfo(id));
})
ipcMain.on('play-game', (event, id) => {
    const gameInfo = settingManager.getGameInfo(id);
    const executablePath = gameInfo.applicationPath;

    mainWindow.hide();

    try {
        execFile(executablePath, (error, stdout, stderr) => {
            

            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            mainWindow.show();
        });
    } catch (error) {
        console.error(`Error executing file: ${error}`);
        mainWindow.show();
        dialog.showErrorBox('ゲームの起動に失敗しました。', 'エラー内容\n'+error.message);
    }
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
});
ipcMain.on('add-new-game-from-package', (event, packagePath) => {
    settingManager.addNewGameFromPackage(packagePath);
    console.log(packagePath);
    event.reply('game-added', packagePath);
});
ipcMain.on('update-game-data', (event, id, data) => {
    settingManager.updateGameData(id, data);
    event.reply('game-updated', id);
});
ipcMain.on('update-thumbnail', (event, id, thumbnail, thumbnailType) => {
    settingManager.changeThumbnail(id, thumbnail, thumbnailType);
    event.reply('thumbnail-updated', id);
});
ipcMain.on('delete-game', (event, id) => {
    settingManager.removeGameData(id);
    event.reply('game-deleted', id);
});

ipcMain.on('get-page-mode', (event) => {
    event.reply('editPage-mode', editMode, editId);
});

ipcMain.on('get-game-info', (event, id) => {
    event.reply('load-game-info', settingManager.getGameInfo(id));
});
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openDetail: () => ipcRenderer.send('open-game-detail-page'),
  openMenu: () => ipcRenderer.send('open-main-menu'),
  openSetting: () => ipcRenderer.send('open-setting'),
  openAddPage: () => ipcRenderer.send('open-add-page'),
  playGame: () => ipcRenderer.send('play-game'),
  getSetting: () => ipcRenderer.send('get-setting'), 
  addNewGameData: (data,thumbnail,thumbnailType) => ipcRenderer.send('add-new-game', data,thumbnail,thumbnailType),
  getGameList: () => ipcRenderer.send('get-game-list'),
  //main to renderer
  onLoadSetting: (data) => ipcRenderer.on('load-setting', data),
  onLoadGameList: (data) => ipcRenderer.on('load-game-list', data),
})
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openDetail: () => ipcRenderer.send('open-game-detail-page'),
  openMenu: () => ipcRenderer.send('open-main-menu'),
  openSetting: () => ipcRenderer.send('open-setting'),
  openAddPage: () => ipcRenderer.send('open-add-page'),
  openEditPage: (id) => ipcRenderer.send('open-edit-page', id),
  playGame: () => ipcRenderer.send('play-game'),
  getSetting: () => ipcRenderer.send('get-setting'), 
  getPageMode: () => ipcRenderer.send('get-page-mode'),
  addNewGameData: (data,thumbnail,thumbnailType) => ipcRenderer.send('add-new-game', data,thumbnail,thumbnailType),
  deleteGameData: (id) => ipcRenderer.send('delete-game', id),
  getGameList: () => ipcRenderer.send('get-game-list'),
  //main to renderer
  onLoadSetting: (data) => ipcRenderer.on('load-setting', data),
  onLoadGameList: (data) => ipcRenderer.on('load-game-list', data),
  editMode: (data) => ipcRenderer.on('editPage-mode', data),
})
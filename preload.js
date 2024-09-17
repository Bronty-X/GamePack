const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openDetail: () => ipcRenderer.send('open-game-detail-page'),
  openMenu: () => ipcRenderer.send('open-main-menu'),
  openSetting: () => ipcRenderer.send('open-setting'),
  openAddPage: () => ipcRenderer.send('open-add-page'),
  openEditPage: (id) => ipcRenderer.send('open-edit-page', id),
  playGame: (id) => ipcRenderer.send('play-game',id),
  getSetting: () => ipcRenderer.send('get-setting'), 
  getPageMode: () => ipcRenderer.send('get-page-mode'),
  getGameInfo: (id) => ipcRenderer.send('get-game-info', id),
  addNewGameData: (data,thumbnail,thumbnailType) => ipcRenderer.send('add-new-game', data,thumbnail,thumbnailType),
  deleteGameData: (id) => ipcRenderer.send('delete-game', id),
  getGameList: () => ipcRenderer.send('get-game-list'),
  updateGameData: (id, data) => ipcRenderer.send('update-game-data', id, data),
  updateThumbnail: (id, thumbnail, thumbnailType) => ipcRenderer.send('update-thumbnail', id, thumbnail, thumbnailType),
  //main to renderer
  onLoadSetting: (data) => ipcRenderer.on('load-setting', data),
  onLoadGameList: (data) => ipcRenderer.on('load-game-list', data),
  onLoadGameInfo: (data) => ipcRenderer.on('load-game-info', data),
  editMode: (data) => ipcRenderer.on('editPage-mode', data),
})
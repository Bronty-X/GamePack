const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openDetail: () => ipcRenderer.send('open-game-detail-page'),
  openMenu: () => ipcRenderer.send('open-main-menu'),
  openSetting: () => ipcRenderer.send('open-setting'),
  playGame: () => ipcRenderer.send('play-game'),
  getSetting: () => ipcRenderer.send('get-setting'), 
  addNewGameData: (data) => ipcRenderer.send('add-new-game', data),
  getGameList: () => ipcRenderer.send('get-game-list'),
  //main to renderer
  onLoadSetting: (data) => ipcRenderer.on('load-setting', data),
  onLoadGameList: (data) => ipcRenderer.on('load-game-list', data),
})
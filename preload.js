const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  openDetail: () => ipcRenderer.send('open-game-detail-page'),
  openMenu: () => ipcRenderer.send('open-main-menu'),
  openSetting: () => ipcRenderer.send('open-setting'),
  playGame: () => ipcRenderer.send('play-game'),
  getSetting: () => ipcRenderer.send('get-setting'), 
  //main to renderer
  onLoadSetting: (data) => ipcRenderer.on('load-setting', data),
})
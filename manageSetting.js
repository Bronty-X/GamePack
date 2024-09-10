const fs = require('fs');
const path = require('node:path')
const{app} = require('electron')

const filePath = path.join(app.getPath('userData'), 'setting.json');

const defaultSetting = {
  version: 1,
  gameList: []
}

function checkSettingFile(){
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync (filePath, JSON.stringify(defaultSetting));
  }
  console.log(filePath)
}
function uploadImage(file) {
  //return axios.post('/upload', file);
}

function addNewGameData(data) {
  if(!fs.existsSync(data.applicationPath)){
    return {status: 'error', message: 'Application file not found'};
  }

  checkSettingFile();
  const setting = JSON.parse(fs.readFileSync(filePath));
  const uuid = require('uuid').v4();
  setting.gameList.push({...data, id: uuid});
  fs.writeFileSync(filePath, JSON.stringify(setting));
  return {status: 'success', message: 'Game data successfully added'};
}
function loadGameList(){
  checkSettingFile();
  return JSON.parse(fs.readFileSync(filePath)).gameList;
}
function removeGameData(id){
  checkSettingFile();
  const setting = JSON.parse(fs.readFileSync(filePath));
  setting.gameList = setting.gameList.filter((game) => game.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(setting));
}

module.exports = { addNewGameData, loadGameList, removeGameData };
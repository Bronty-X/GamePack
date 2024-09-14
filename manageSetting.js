const fs = require('fs');
const path = require('node:path')
const{app} = require('electron')

const filePath = path.join(app.getPath('userData'), 'setting.json');

const thumbnailDir = path.join(app.getPath('userData'), 'thumbnail');

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

function addNewGameData(data, thumbnailData, thumbnailType) {
  console.log(data)
  if(!fs.existsSync(data.applicationPath)){
    console.log('Application file not found')
    return {status: 'error', message: 'Application file not found'};
  }

  if(!fs.existsSync(thumbnailDir)){
    fs.mkdirSync(thumbnailDir);
  }
  const setting = JSON.parse(fs.readFileSync(filePath));
  const uuid = require('uuid').v4();
  const thumbnailPath = path.join(thumbnailDir, `${uuid}.${thumbnailType}`);

  fs.writeFileSync(thumbnailPath, Buffer.from(new Uint8Array(thumbnailData)),(err) => {
    if(err){
      console.log(err);
      return {status: 'error', message: 'Failed to save thumbnail'};
    }
  });
  data.thumbnailPath = thumbnailPath;
  
  checkSettingFile();
  
  
  console.log( setting.gameList)

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

module.exports = { addNewGameData, loadGameList, removeGameData ,checkSettingFile};
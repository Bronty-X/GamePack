const fs = require('fs');
const path = require('node:path')
const{app} = require('electron');


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
  /** 
  if(!fs.existsSync(data.applicationPath)){
    console.log('Application file not found')
    return {status: 'error', message: 'Application file not found'};
  }
  */
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
function addNewGameFromPackage(packagePath){
  console.log(packagePath)
  const setting = JSON.parse(fs.readFileSync(filePath));
  const packageData = JSON.parse(fs.readFileSync(`${packagePath}/game-pack.json`));
  const uuid = require('uuid').v4();

  console.log(packageData)
  
  try{
    packageData.gameList.forEach((game) => {
      const thumbnailPath = path.join(thumbnailDir, `${uuid}.${game.thumbnailType}`);
      fs.writeFileSync(thumbnailPath, fs.readFileSync(`${packagePath}/${game.thumbnailPath}`));
      const applicationPath = path.join(packagePath, game.applicationPath);
      setting.gameList.push({...game, id: uuid, thumbnailPath, applicationPath});
    });
  }catch(err){
    console.log(err);
    return {status: 'error', message: 'Failed to add game data'};
  }
  fs.writeFileSync(filePath, JSON.stringify(setting));
}

function changeThumbnail(id, thumbnailData, thumbnailType){
  checkSettingFile();
  const setting = JSON.parse(fs.readFileSync(filePath));
  const thumbnailPath = path.join(thumbnailDir, `${id}.${thumbnailType}`);
  fs.writeFileSync(thumbnailPath, Buffer.from(new Uint8Array(thumbnailData)),(err) => {
    if(err){
      console.log(err);
      return {status: 'error', message: 'Failed to save thumbnail'};
    }
  });
  const game = setting.gameList.find((game) => game.id === id);
  if(game === undefined){
    return {status: 'error', message: 'Game data not found'};
  }
  game.thumbnailPath = thumbnailPath;
  fs.writeFileSync(filePath, JSON.stringify(setting));
  return {status: 'success', message: 'Thumbnail successfully changed'};

}

function updateGameData(id, data){
  checkSettingFile();
  const setting = JSON.parse(fs.readFileSync(filePath));
  const game = setting.gameList.find((game) => game.id === id);
  if(game === undefined){
    return {status: 'error', message: 'Game data not found'};
  }
  Object.assign(game, data);

  setting.gameList = setting.gameList.map((game) => {
    if (game.id === id) {
      return { ...game, ...data, thumbnailPath: game.thumbnailPath };
    } else {
      return game;
    }
  });

  fs.writeFileSync
  (filePath, JSON.stringify(setting)); 
  return {status: 'success', message: 'Game data successfully updated'};

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

function getGameInfo(id){
  checkSettingFile();
  const setting = JSON.parse(fs.readFileSync(filePath));
  return setting.gameList.find((game) => game.id === id);
}

module.exports = { addNewGameData,changeThumbnail ,updateGameData, loadGameList, removeGameData ,checkSettingFile,getGameInfo,addNewGameFromPackage};
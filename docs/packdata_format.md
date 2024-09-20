# セーブデータフォーマット

## 概要
複数のゲームデータをパッケージ化し、読み込ませることを目的とする、GamePackの設定保存用です。


## データ形式
データ名は``game-pack.json``という名前で保存します。  
また、セーブデータは以下のような形式で保存されることが望まれます。
```json
{
    "version":1,
    "type":"gamepack",
    "gameList":[
        {
            "title":"NumHunt",
            "description":"NumHuntは数字を「作る」オンライン対戦型テーブルゲーム! ",
            "developper":"プログラマ:Bronty",
            "targetPlatform":"",
            "technology":"",
            "genre":"",
            "applicationPath":"\\game1\\game.jpg",
            "thumbnailPath":"\\game1\\game.exe",
            "id":"4977605b-10d8-4e91-8108-ab646a3285d1"
        }
    ]
}
```

## フィールド定義
### トップ
|フィールド名|型|用途|
|---|---|---|
|version|文字列|将来的なバージョン管理|
|gameList|配列|登録されたゲームの配列|
|type|文字列|セーブデータと区別するため、データのタイプを指定します|

### gameList内
|フィールド名|型|用途|
|---|---|---|
|title|文字列|ゲーム名|
|description|文字列|ゲーム説明|
|developper|文字列|ゲームの開発者（個人もしくは団体）|
|targetPlatform|文字列|対応している環境、端末|
|technology|文字列|開発に用いたエンジン、アプリなど|
|genre|文字列|ゲームジャンル|
|applicationPath|文字列|ゲームのアプリケーションファイルへのパス（相対パス）|
|thumbnailPath|文字列|サムネイルのパス（相対パス）|
|id|文字列|一意のゲームuuid|



# セーブデータフォーマット

## 概要
このドキュメントはセーブデータに関する仕様をまとめたものです。
JSONで作成され、ゲームのパス、説明などを記録します。

## データ形式
セーブデータは以下のような形式で保存されることが望まれます。
```json
{
    "version":1,
    "gameList":[
        {
            "title":"NumHunt",
            "description":"NumHuntは数字を「作る」オンライン対戦型テーブルゲーム! ",
            "developper":"プログラマ:Bronty",
            "targetPlatform":"",
            "technology":"",
            "genre":"","applicationPath":"C:\\Users\\user\\Downloads\\game.jpg",
            "thumbnailPath":"C:\\Users\\user\\game.exe",
            "id":"4977605b-10d8-4e91-8108-ab646a3285d1"
        }
    ],
    "gamepackList":[
        "C:\\Users\\user\\Downloads\\gamePack1",
    ]
}
```

## フィールド定義
### トップ
|フィールド名|型|用途|
|---|---|---|
|version|文字列|将来的なバージョン管理|
|gameList|配列|登録されたゲームの配列|
|gamepackList|文字列|ゲームパックのディレクトリ|

### gameList内
|フィールド名|型|用途|
|---|---|---|
|title|文字列|ゲーム名|
|description|文字列|ゲーム説明|
|developper|文字列|ゲームの開発者（個人もしくは団体）|
|targetPlatform|文字列|対応している環境、端末|
|technology|文字列|開発に用いたエンジン、アプリなど|
|genre|文字列|ゲームジャンル|
|applicationPath|文字列|ゲームのアプリケーションファイルへのパス|
|thumbnailPath|文字列|サムネイルのパス|
|id|文字列|一意のゲームuuid|



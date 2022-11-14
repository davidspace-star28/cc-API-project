# cc-API-project

## API 概要

ディズニー映画一覧に対して CRUD できる API

## TBL 定義

TBL 名: disney_movie
| **物理名** | **データ型** | **主キー** | **Not null** |
| ------------ | ------------ | ---------- | ------------ |
| id | int | ○ | ○ |
| movie_title | string(128) | | ○ |
| release_date | date(16) | | ○ |
| hero | string(64) | | |
| villan | string(64) | | |
| song | string(128) | | |

[スキーマ情報](https://github.com/davidspace-star28/cc-API-project/blob/main/docs/schema.md)や[migration 情報](https://github.com/davidspace-star28/cc-API-project/blob/main/db/migrations/20221111051532_create_disney_movie.js)参照

## データセット

[こちら](https://data.world/kgarrett/disney-character-success-00-16)からデータ取得し一部利用。
下記は初期状態で TBL に insert しているデータ(2022/11/14 時点)

```json
[
  {
    "id": 1,
    "movie_title": "Aladdin",
    "release_date": "1992-11-25",
    "hero": "Aladdin",
    "villan": "Jafar",
    "song": "A Whole New World"
  },
  {
    "id": 2,
    "movie_title": "Peter Pan",
    "release_date": "1953-02-05",
    "hero": "Peter Pan",
    "villan": "Captain Hook",
    "song": "You Can Fly!"
  }
]
```

## API 機能

各 HTTP メソッドとエンドポイント、機能説明は下記。

| **メソッド名** | **エンドポイント** | **説明**                                     |
| -------------- | ------------------ | -------------------------------------------- |
| GET            | /movies            | TBL 内の映画一覧を取得する                   |
| POST           | /movies            | リクエストボディ内の情報を新規で登録する。   |
| DELETE         | /movies/:id        | ある id のレコードを削除する                 |
| PATCH          | /movies/:id        | ある id のレコード内の特定の項目を更新する。 |

knockout flux es6
==================

knockoutjs Flux Architecture for ECMAScript6 

### Directory Tree

```sh

.
├── app.js              <- アプリケーション本体
├── action
│   ├── actionMinus.js  <- 加算用 ActionClass
│   └── actionPlus.js   <- 減算用 ActionClass
├── dispacher
│   ├── dispacher.js    <- 俺俺ディスパッチャー
│   └── singleList.js   <- ディスパッチャーを実現する為のSingletonなリスト
└── store
    ├── iCalcStore.js   <- Storeのインタフェース
    └── impl
        └── calcStore.js <- Storeの実装

```

### Class Method's

#### Class

##### Dispacher, SingleList

ActionからStoreに処理を渡す、シングルトンな処理を持たないクラス

##### CalcStore, iCalcStore

データの管理と操作を行うクラス。

##### ActionPlus, ActionMinus

データ変更の為のトリガー処理をラッパーするクラス
（別に無くてもよい）

#### Application

##### ClickCounterViewModel

処理本体、ActionをCallし、結果をStoreModelより受け取る。

### Architecture

 * View: SotreデータとActionのトリガーを実装する
 * Action: Viewに実装するトリガーを実装する
 * Dispatcher: ActionのトリガーイベントをStoreに連携する
 * Store: ロジックと状態を保持するクラス

ViewからActionにトリガーを仕込みます。

Dispatcher(singleton)はActionを受け取って、その振る舞いをキューに入れて、Actoinが発火された際にStoreに通知されるようになります。

StoreはActionの内容に基づいてその状態を更新し、変更イベントをブロードキャスト(全体に通知)します。

Viewは更新されたStoreからの内容を常に監視し、描画します。


## Future

### Test consideration with respect to the Flux

#### unit testing

#### functional testing

#### Acceptance testing

### ES6 Covrage Tools

#### [istanbul-traceur](https://github.com/meoguru/istanbul-traceur)

https://www.npmjs.org/package/istanbul-traceur
 
 * カバレッジを出そうとするとsingletonlist内で以下が発tracerの非同期が原因？
 * 関連ありそうなissuesは[これ](https://github.com/taichi/grunt-istanbul/issues/22)

 ```
Fatal error: An error occurred in an async call.
cause stack is ...
  undefined
async call history is ...
 [ { function: 'instrument',
    location: '/Users/msakamaki/project/ECMA/knockout-flux-es6/node_modules/grunt-istanbul/tasks/helpers.js:72:56',
    mapping: { name: 'app/scripts/dispacher/singleList.js', code: [Object] } } ]
 ```


#### [ismailia](https://github.com/Spote/ismailia)

 * 動くけどバージョンが0.0.58
 * traceur version 0.0.58 only support
 * branch is coverage/istanbule testing


### ES6 plato ?

ES.Next Option true

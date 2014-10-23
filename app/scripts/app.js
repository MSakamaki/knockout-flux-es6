
/*****************************/
// Dispacherはロジックを持たない
// 実際はFacebookの Dispatcher libraryか RxJS を使うのが実用的
class Dispacher{
  constructor() {
    this.listeners = [];
  }

  emit(event) {
    this.listeners.forEach((listener) => {
      listener(event);
    });
  }

  addListener(listener) {
    this.listeners.push(listener);
    return this.listeners.length - 1;
  }
}
// singleton dispacher
var _disp = new Dispacher();

/*****************************/
// データの管理と操作はここでする
class Store extends Dispacher{
  constructor() {
    super();
    this.countor = 0;
  }
  countup(num) {
    this.countor += num;
  }
  countdown(num) {
    this.countor -= num;
  }
  emitChange() {
    this.emit("change");
  }
}


/*****************************/
// 処理のためのルーターとインタフェース
var StoreModel = function(){
  var store = new Store();
  _disp.addListener(function (action) {
    switch(action.action){
      case 'ADD':
        store.countup(action.count);
        break;
      case 'MINUS':
        store.countdown(action.count);
        break;
    }
    store.emitChange();
  });

  //expose only the public interface
  return {
    addListener: (l) => store.addListener(l),
    countor: () => store.countor
  };
}


/*****************************/
// 処理呼び出しをより具体的な形にするためのメソッド
// 値を増やす Action Class
class _ActionPlus {
  constructor(){}
  countup(num){
    _disp.emit({
      action: "ADD", 
      count: num
    });
  }
}
// 値を減らす Action Class
class _ActionMinus {
  constructor(){}
  countdown(num){
    _disp.emit({
      action: "MINUS", 
      count: num
    });
  }
}


/**************************** main app */
// 処理の本体
var _storeModel = new StoreModel();
class ClickCounterViewModel{
  constructor(){
    this.numberOfClicks = ko.observable(0);
    // sub view
    this.subClick1 = ko.observable(0);
    this.subClick2 = ko.observable(0);
    this.subClick3 = ko.observable(0);

    // StoreにListnerを登録()    
    _storeModel.addListener(() => this.resetView());
    _storeModel.addListener(() => this.subView1());
    _storeModel.addListener(() => this.subView2());
    _storeModel.addListener(() => this.subView3());
  
  }
  // 加算ボタン
  registerClick() {
    new _ActionPlus().countup(1);
  } 
  // 減算ボタン
  minusClick(){
    new _ActionMinus().countdown(1);
  }

  // 描画処理 (連携)
  resetView(hoge){
    this.numberOfClicks(_storeModel.countor());
  }
  subView1(){
    this.subClick1(_storeModel.countor());    
  }
  subView2(){
    this.subClick2(_storeModel.countor());    
  }
  subView3(){
    this.subClick3(_storeModel.countor());    
  }
}

ko.applyBindings(new ClickCounterViewModel());


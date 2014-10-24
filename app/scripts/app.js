import Dispacher   from './dispacher';
import Store       from './store';
import ActionPlus  from './action/actionPlus';
import ActionMinus from './action/actionMinus';

// singleton dispacher
//var _disp = Dispacher.instance;


/*****************************/
// 処理のためのルーターとインタフェース
var StoreModel =()=>{
  var store = new Store();
  new Dispacher().addListener((action) => {

    switch(action.action){
      case 'ADD':
        store.countup(action.count);
        store.emitChange();
        break;
      case 'MINUS':
        store.countdown(action.count);
        store.emitChange();
        break;
    }
  });

  //expose only the public interface
  return {
    addListener: (l) => store.addListener(l),
    countor: () => store.countor
  };
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
    new ActionPlus().countup(1);
  } 
  // 減算ボタン
  minusClick(){
    new ActionMinus().countdown(1);
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



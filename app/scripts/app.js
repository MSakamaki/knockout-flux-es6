import iCalcStore   from './store/iCalcStore';
import ActionPlus  from './action/actionPlus';
import ActionMinus from './action/actionMinus';

/**************************** main app */
// 処理の本体
class ClickCounterViewModel{
  constructor(){
    this.calcStore = new iCalcStore();
    this.numberOfClicks = ko.observable(0);
    // sub view
    this.subClick1 = ko.observable(0);
    this.subClick2 = ko.observable(0);
    this.subClick3 = ko.observable(0);

    // StoreにListnerを登録()
    this.calcStore.addListener(() => this.resetView());
    this.calcStore.addListener(() => this.subView1());
    this.calcStore.addListener(() => this.subView2());
    this.calcStore.addListener(() => this.subView3());
  
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
    this.numberOfClicks(this.calcStore.countor());
  }
  subView1(){
    this.subClick1(this.calcStore.countor());    
  }
  subView2(){
    this.subClick2(this.calcStore.countor());    
  }
  subView3(){
    this.subClick3(this.calcStore.countor());    
  }
}

ko.applyBindings(new ClickCounterViewModel());



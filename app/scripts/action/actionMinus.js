import Dispacher from '../dispacher';

/*****************************/
// 処理呼び出しをより具体的な形にするためのメソッド
// 外部APIとの連携はここで行う
var _disp = new Dispacher();
// 値を減らす Action Class
export default class ActionMinus {
  constructor(){}
  countdown(num){
    _disp.emit({
      action: "MINUS", 
      count: num
    });
  }
}

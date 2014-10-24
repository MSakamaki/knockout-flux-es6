import Dispacher from '../dispacher';

/*****************************/
// 処理呼び出しをより具体的な形にするためのメソッド
// 外部APIとの連携はここで行う
var _disp = new Dispacher();
// 値を増やす Action Class
export default class ActionPlus {
  constructor(){}
  countup(num){
    _disp.emit({
      action: "ADD", 
      count: num
    });
  }
}
import CalcStore from './impl/calcStore';
import Dispacher from '../dispacher';

/*****************************/
// 処理のためのルーターとインタフェース
// 複数のStoreがある場合はここに書いていく
export default class iCalcStore{
  constructor(){
    this.calcStore = new CalcStore();
    new Dispacher().addListener((action) => {

      switch(action.action){
        case 'ADD':
          this.calcStore.countup(action.count);
          this.calcStore.emitChange();
          break;
        case 'MINUS':
          this.calcStore.countdown(action.count);
          this.calcStore.emitChange();
          break;
      }
    });
  }
  addListener(l){
    this.calcStore.addListener(l)
  }
  countor(){
    return this.calcStore.countor
  }
}

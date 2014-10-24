import Dispacher from '../../dispacher/dispacher';

/*****************************/
// データの管理と操作はここでする
// ロジックはここに置く
export default class CalcStore extends Dispacher{
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
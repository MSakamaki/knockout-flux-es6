/* global describe, it */
import Dispacher from '../../app/scripts/dispacher/dispacher'
import SingleList from '../../app/scripts/dispacher/singlelist'

//var _disp = new Dispacher();


class TestCase {
  constructor() {}
  // ES6テストコードの書き方が判らないのでべた書き
  // Module別に分けてImportする単体テストのほうが、効率が良いもする。
  // とりあえずは、モジュール単位のテストしやすさを検証
  UnitGo() {
    describe('Dispache`s', () => {
      describe('Dispacher', () => {
        let dispacher = new Dispacher();
        before(()=>{
          dispacher.listeners = []; // そのまま使うとシングルトンが他のテストに影響与えるので置き換え
          dispacher.isCall = false;
          dispacher.addListener((flg)=> {
            dispacher.isCall = true;
          });
        });
        it ('call emit method', () => {
          dispacher.emit('ghange!');
          expect(dispacher.isCall).to.be.true;
        });
        it ('check listeners length after addListner method call', () => {
          expect(dispacher.listeners.length).to.equal(1);
        });
      });
      describe('singleList', () => {
        it ('singlelist to be Array ', () => {
          expect(SingleList.instance.listeners instanceof Array).to.be.true;
        });
        it ('throw error Cannot construct singleton', () => {
          expect(1).to.equal(1);
        });
      });
    });
    describe('Store', () => {
      describe('Store', () => {
        it ('skip testing');
      });
      describe('StoreModel', () => {
        it ('skip testing');
      });
    });
    describe('Action', () => {
      describe('_ActionPlus',() => {
        it ('skip testing');
      });
      describe('_ActionMinus', () => {
        it ('skip testing');
      });
    });
    describe('ClickCounterViewModel', () => {
      it ('skip testing');
    });
  }
};

new TestCase().UnitGo();


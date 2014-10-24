/* global describe, it */

//import Dispacher from '../../app/scripts/dispacher'
//var _disp = new Dispacher();


class TestCase {
  constructor() {}
  // ES6テストコードの書き方が判らないのでべた書き
  // Module別に分けてImportする単体テストのほうが、効率が良いもする。
  // とりあえずは、モジュール単位のテストしやすさを検証
  UnitGo() {
    describe('Dispacher', () => {
      it ('constractor', () => {
        expect(1).to.equal(1);
      });
      it ('emit method', () => {
        expect(1).to.equal(1);
      });
      it ('addListner method', () => {
        expect(1).to.equal(1);
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


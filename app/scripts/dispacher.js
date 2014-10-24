import SingleLists from './single';

/*****************************/
// Dispacherはロジックを持たない
// 実際はFacebookの Dispatcher libraryか RxJS を使うのが実用的
export default class Dispacher{
  constructor() {
    this.listeners = SingleLists.instance.listeners;
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

/*
let singleton = Symbol();
let singletonEnforcer = Symbol()

class SingletonTest {

  constructor(enforcer) {
    if(enforcer != singletonEnforcer) throw "Cannot construct singleton";
  }

  static get instance() {
    if(!this[singleton]) {
      this[singleton] = new SingletonTest(singletonEnforcer);
    }
    return this[singleton];
  }
}

export default SingletonTest
----use
import SingletonTest from 'singleton-test';
let instance = SingletonTest.instance;

*/


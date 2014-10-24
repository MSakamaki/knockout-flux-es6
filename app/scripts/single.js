/* Singleton List */
let singleton = Symbol();
let singletonEnforcer = Symbol()

export default class SingleLists {
  constructor(enforcer) {
    if(enforcer != singletonEnforcer) throw "Cannot construct singleton";
    this.listeners = [];
  }

  static get instance() {
    if(!this[singleton]) {
      this[singleton] = new SingleLists(singletonEnforcer);
    }
    return this[singleton];
  }
}
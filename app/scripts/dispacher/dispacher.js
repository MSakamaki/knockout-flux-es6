import SingleLists from './singleList';

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
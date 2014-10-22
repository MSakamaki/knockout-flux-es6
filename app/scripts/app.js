
/*****************************/
class Dispacher{
  constructor() {
    this.listeners = [];
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
// singleton dispacher
var _disp = new Dispacher();

/*****************************/
class Store extends Dispacher{
  constructor() {
    super();
    this.countor = 0;
  }
  countup(num) {
    this.countor += num;
  }
  emitChange() {
    this.emit("change");
  }
}


/*****************************/
var StoreModel = function(){
  var store = new Store();
  _disp.addListener(function (action) {
    switch(action.action){
      case 'ADD':
        store.countup(action.count);
        break;
    }
    store.emitChange();
  });

  //expose only the public interface
  return {
    addListener: (l) => store.addListener(l),
    countor: () => store.countor
  };
}


/*****************************/
class _Action {
  constructor(){}
  countup(num){
    _disp.emit({
      action: "ADD", 
      count: num
    });
  }
}


/**************************** main app */
var _storeModel = new StoreModel();
class ClickCounterViewModel{
  constructor(){
    this.numberOfClicks = ko.observable(0);

    // StoreにListnerを登録()    
    _storeModel.addListener(() => this.resetView());
  
  }
  
  registerClick() {
    new _Action().countup(1);
  }

  resetView(){
    console.log('knockup!', _storeModel.countor());    
    this.numberOfClicks(_storeModel.countor());
  }
}

ko.applyBindings(new ClickCounterViewModel());


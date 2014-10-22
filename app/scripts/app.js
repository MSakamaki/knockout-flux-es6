
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
    // sub view
    this.subClick1 = ko.observable(0);
    this.subClick2 = ko.observable(0);
    this.subClick3 = ko.observable(0);

    // StoreにListnerを登録()    
    _storeModel.addListener(() => this.resetView());
    _storeModel.addListener(() => this.subView1());
    _storeModel.addListener(() => this.subView2());
    _storeModel.addListener(() => this.subView3());
  
  }
  
  registerClick() {
    new _Action().countup(1);
  }

  resetView(){
    this.numberOfClicks(_storeModel.countor());
  }

  subView1(){
    this.subClick1(_storeModel.countor());    
  }
  subView2(){
    this.subClick2(_storeModel.countor());    
  }
  subView3(){
    this.subClick3(_storeModel.countor());    
  }
}

ko.applyBindings(new ClickCounterViewModel());


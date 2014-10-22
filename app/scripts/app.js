
var $l = function(msg){
  console.log(msg);
}

/*****************************/
class Dispacher{
  constructor() {
    this.listeners = [];
  }

  emit(event) {
    $l('dispacher.emmit');
    this.listeners.forEach((listener) => {
      $l('store.emit.loop');
      $l(listener);
      listener(event);
    });
  }

  addListener(listener) {
    $l('dispacher.countup');
    this.listeners.push(listener);
    return this.listeners.length - 1;
  }
}
// singleton dispacher
var _disp = new Dispacher();

/*****************************/
class Store extends Dispacher{
  constructor() {
    $l('store.constructor');
    super();
    this.countor = 0;
  }
  countup(num) {
    $l('store.countup');
    this.countor += num;
  }
  emitChange() {
    $l('store.emitChange');
    this.emit("change");
  }
}


/*****************************/
var StoreModel = function(){
  var store = new Store();
  $l('storemodel');

  _disp.addListener(function (action) {
    $l('Dispacher ---> storemodel.addlistner');
    $l(action.action);
    switch(action.action){
      case 'ADD':
        $l('Dispacher ---> storemodel.addlistner.swich -> call store.countup');
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
  constructor(){
    $l('_Action');
  }
  countup(num){
    $l('action.countup');
    _disp.emit({
      action: "ADD", 
      count: num
    });
  }
}


/**************************** main app */

var _storeModel = new StoreModel();
$l('ClickCounterViewModel.addListener');

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
    $l('knockup!');
    $l(_storeModel.countor());    
    this.numberOfClicks(_storeModel.countor());
  }
}

ko.applyBindings(new ClickCounterViewModel());


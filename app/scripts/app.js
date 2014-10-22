
class AppViewModel {
  constructor() {
    this.users = {
        personName: 'ボブ',
        personAge: 123
    };
  }
}

var appVM = new AppViewModel();
ko.applyBindings(appVM.users);

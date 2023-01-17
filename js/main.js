// var viewModel; viewModel = JSON.parse(localStorage.getItem("vM"));
//
// if(viewModel !== undefined || viewModel !== null) {
//     viewModel = new vM();
//     ko.applyBindings(viewModel);
// }
// ko.mapping.fromJS(JSON.parse(localStorage.getItem("vM")), self);
// console.log(JSON.parse(localStorage.getItem("vM")))
// view = ko.mapping.fromJS(localStorage.getItem("vM"));
// console.log(localStorage.getItem("vM"))
// ko.applyBindings(view);

var ViewModel = function() {
    var self = this;
    var todoItems = [
        // new ToDoItem("Exercise one hour", false, true),
        // new ToDoItem("Supermarket", false, false)
    ];

    function ToDoItem(name, state, inputDisable) {
        var self = this;
        self.name = ko.observable(name);
        self.state = ko.observable(false);
        self.inputDisable = ko.observable(true);
    }

    self.checkAll = ko.observable(false);
    self.items = ko.observableArray(todoItems);
    self.itemToAdd = ko.observable("");
    self.todoState = ko.observable(0);
    self.totalItemsActive = 0;

    // ko.mapping.fromJS(localStorage.getItem('todolist'), self.items());

    self.addItem = function(data, event) {
        if (event.keyCode === 13 && self.itemToAdd() !== "") {
            self.items.push(new ToDoItem(self.itemToAdd()));
            self.itemToAdd("");
            var unmapped = ko.mapping.toJS(self);
            sessionStorage.setItem("vM", unmapped);
            // localStorage.setItem('todolist', self.items());
            console.log(unmapped)
            console.log(sessionStorage.getItem("vM"));
        }
    };


    self.removeItem = function() {
        self.items.remove(this);
    };

    self.checkAll.subscribe(function(value){
        if(self.todoState() === 0){
            if (value){
                ko.utils.arrayFirst(self.items(), function (item) {
                    item.state(true);
                });
            } else {
                ko.utils.arrayFirst(self.items(), function (item) {
                    item.state(false);
                });
            }
        }

        if(self.todoState() === 1){
            if (self.totalItemsCompleted() === self.items().length){
                if (value){
                    ko.utils.arrayFirst(self.items(), function (item) {
                        item.state(true);
                    });
                } else {
                    ko.utils.arrayFirst(self.items(), function (item) {
                        item.state(false);
                    });
                }
            }else{
                if(value){
                    ko.utils.arrayFirst(self.items(), function (item) {
                        item.state(true);
                    });
                }
            }
        }

        if(self.todoState() === 2){
            if (self.totalItemsCompleted() === self.items().length){
                if (value){
                    ko.utils.arrayFirst(self.items(), function (item) {
                        item.state(true);
                    });
                } else {
                    ko.utils.arrayFirst(self.items(), function (item) {
                        item.state(false);
                    });
                }
            }else{
                if(value){
                    ko.utils.arrayFirst(self.items(), function (item) {
                        item.state(true);
                    });
                }
            }
        }
    }, self);

    self.totalItemsActive = ko.pureComputed(function () {
        var count = 0;
        ko.utils.arrayFirst(self.items(), function(item) {
            if(!item.state()){
                count++;
            }
        });
        return count;
    });

    self.totalItemsCompleted = ko.pureComputed(function () {
        var count = 0;
        ko.utils.arrayFirst(self.items(), function(item) {
            if(item.state()){
                count++;
            }
        });
        return count;
    });

    self.clearItemCompleted = function () {
        self.items.remove(function(item) {
            return item.state() === true
        });
        if(!self.items().length){
            self.checkAll(false);
        }
    }

    self.onEnter = function(data, event){
        if(event.keyCode === 13){
            if(event.target.value.length === 0) {
                self.items.remove(data);
            }else{
                data.inputDisable(true);
            }
        }
    }

    self.disableEditInput = function(data, event) {
        if(event.target.value.length === 0){
            self.items.remove(data);
        }else{
            if(data.state()){
                event.target.style.textDecoration = 'line-through';
            }
            data.inputDisable(true);
        }
    }

    self.editItemInput = function(data, event){
        data.inputDisable(false);
        event.target.focus();
        event.target.style.textDecoration = 'unset';
        data.name(event.target.value + ' ');
        data.name(event.target.value.trim());
    }

    self.activeState = function(){
        self.todoState(1);
        self.checkAll(false);
    }

    self.completedState = function(){
        self.todoState(2);
        if(self.totalItemsCompleted() !== self.items().length){
            self.checkAll(false);
        }
    }

    self.allState = function(){
        self.todoState(0);
        // self.checkAll(false);
    }

    var viewModel = ko.mapping.fromJS(localStorage.getItem("vM"));
    console.log();
    // self.persistedArray = ko.observableArray().extend({ persist: 'todolist'});
};


// ko.mapping.fromJS(JSON.parse(localStorage.getItem("vM")), new ViewModel);
// console.log(JSON.parse(localStorage.getItem("vM")))
//
console.log(new ViewModel())
// ko.mapping.fromJS(localStorage.getItem("vM"), self);
ko.mapping.fromJS(localStorage.getItem("vM"), null, ViewModel);
ko.applyBindings(new ViewModel());

// var viewModel = ko.mapping.fromJS(localStorage.getItem("vM"));
// console.log(viewModel)


// ko.mapping.fromJS(data, viewModel);
// var unmapped = ko.mapping.toJS(ViewModel);
// localStorage.setItem('todolist', unmapped);
// ko.mapping.fromJS(localStorage.getItem('todolist'), ViewModel);
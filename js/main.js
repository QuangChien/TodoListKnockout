function ToDoItem(name, state, inputDisable) {
    var self = this;
    self.name = ko.observable(name);
    self.state = ko.observable(false);
    self.inputDisable = ko.observable(true);
}

var ViewModel = function() {
    var self = this;
    var todoItems = [
        new ToDoItem("Exercise one hour", false, true),
        new ToDoItem("Supermarket", false, false)
    ];


    self.checkAll = ko.observable(false);
    self.items = ko.observableArray(todoItems);
    self.itemToAdd = ko.observable("");
    self.todoState = ko.observable(0);
    self.totalItemsActive = 0;

    self.addItem = function(data, event) {
        if (event.keyCode === 13 && self.itemToAdd() !== "") {
            self.items.push(new ToDoItem(self.itemToAdd()));
            self.itemToAdd("");
        }
    };


    self.removeItem = function() {
        self.items.remove(this);
    };

    self.checkAll.subscribe(function(value){
        if(self.todoState() === 0 || self.todoState() === 1){
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

        if(self.todoState() === 2){
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
    }

    self.completedState = function(){
        self.todoState(2);
        // if(self.totalItemsCompleted() !== self.items().length){
        //     self.checkAll(false);
        // }
    }

    self.allState = function(){
        self.todoState(0);
        // self.checkAll(false);
    }
};

ko.applyBindings(new ViewModel());


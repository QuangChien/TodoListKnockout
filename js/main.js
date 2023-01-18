function ToDoItem(name, state = false, inputDisable = true) {
    var self = this;
    self.name = ko.observable(name);
    self.state = ko.observable(state);
    self.inputDisable = ko.observable(inputDisable);
}

var ViewModel = function(todos) {
    var self = this;
    self.items = ko.observableArray(todos.map(function (todo) {
        return new ToDoItem(todo.name, todo.state, todo.inputDisable);
    }));
    self.checkAll = ko.observable(false);
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
        if(self.todoState() === 0){
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
                if (value){
                    ko.utils.arrayFirst(self.items(), function (item) {
                        item.state(true);
                    });
                }
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
        if(self.totalItemsCompleted() === self.items().length){
            self.checkAll(true);
        }else{
            self.checkAll(false);
        }
    }

    self.checkedItem = function(){
        if(self.todoState() === 0){
            if(self.totalItemsActive() > 0){
                self.checkAll(false);
            }
            if(self.totalItemsCompleted() === self.items().length){
                self.checkAll(true);
            }
        }
        if(self.todoState() === 1){
            if(self.totalItemsActive() === 0){
                self.checkAll(true);
            }
        }
        if(self.todoState() === 2){
            if(self.totalItemsCompleted() === self.items().length){
                self.checkAll(true);
            }else{
                self.checkAll(false);
            }
        }
        return true;
    }

    ko.computed(function () {
        localStorage.setItem('todos', ko.toJSON(self.items));
    }.bind(this)).extend({
        rateLimit: { timeout: 100, method: 'notifyWhenChangesStop' }
    });
};

var todos = ko.utils.parseJson(localStorage.getItem('todos'));

ko.applyBindings(new ViewModel(todos || []));

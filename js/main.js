function ToDoItem(name, state) {
    var self = this;
    self.name = ko.observable(name);
    self.state = ko.observable(state);
}

var ViewModel = function() {
    var self = this;
    var todoItems = [
        new ToDoItem("Exercise one hour", false),
        new ToDoItem("Supermarket", false)
    ];

    self.items = ko.observableArray(todoItems);
    self.itemToAdd = ko.observable("");

    self.addItem = function(data, event) {
        if (event.keyCode === 13 && self.itemToAdd() != "") {
            self.items.push(new ToDoItem(self.itemToAdd()));
            self.itemToAdd("");
        }
    };

    self.removeItem = function() {
        self.items.remove(this);
    };

    self.editItem = function() {
        this.isEditMode(true);
    };

    self.saveItem = function() {
        this.isEditMode(false);
    };

    self.checkAll = ko.observable(false);

    self.checkAll.subscribe(function(value){
        if (value){
            ko.utils.arrayFirst(self.items(), function (item) {
                item.state(true)
            });
        } else {
            ko.utils.arrayFirst(self.items(), function (item) {
                item.state(false)
            });
        }
    }, self);

    self.editTodoItem = function() {
        alert("dkkdf")
    }
};

ko.applyBindings(new ViewModel());


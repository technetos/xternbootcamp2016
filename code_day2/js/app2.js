$(document).foundation();

var RosterObject = {
    buildListItem: function(studentName) {
        var item = document.createElement('li');
        //var text = document.createTextNode(studentName);
        item.innerText = studentName;
        return item;
    },

    // handleSumbit
    addStudent: function(event) {
        event.preventDefault();
    },
    
    // Sets up event listeners.
    setupEventListeners: function() {
        // this sets up addStudent to be the event that happens on `onsubmit`
        // addStudent is now an event listener.
        document.querySelector('#studentForm').onsubmit = this.addStudent;
    },

    // Get the ball rolling.
    init: function() {
        this.setupEventListeners();
    },
};

RosterObject.init();

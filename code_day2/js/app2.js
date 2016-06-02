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
        // currentTarget is the thing the event fired on (i.e the studentForm).
        var f = event.currentTarget;
        var studentName = f.name.value;
        var item = this.buildListItem(studentName);
        // Now get the list element to append item to.
        var list = document.querySelector('#studentList');
        list.appendChild(item);
    },
    
    // Sets up event listeners.
    setupEventListeners: function() {
        // this sets up addStudent to be the event that happens on `onsubmit`
        document.querySelector('#studentForm').onsubmit = 
            // we use bind here to retain the this member in addStudent
            this.addStudent.bind(this);
    },

    // Get the ball rolling.
    init: function() {
        this.setupEventListeners();
    },
};

RosterObject.init();
